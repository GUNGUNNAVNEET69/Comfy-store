import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("account logged successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAsGuest = async () => {
    try {
      const response = await customFetch.post ('/auth/local',{
        identifier:'test@test.com',
        password:'secret',
      })

      dispatch(loginUser(response.data))
      toast.success('welcome guest user')
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("login failed")
    }
  }
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type={"email"}
          name={"identifier"}
          label={"email"}
          defaultValue={"test@test.com"}
        />
        <FormInput
          type={"password"}
          name={"password"}
          label={"password"}
          defaultValue={"secret"}
        />

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <button type="button" className="btn btn-secondary btn-block" onClick={loginAsGuest}>
          Guest user
        </button>
        <p className="text-center">
          Not member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
