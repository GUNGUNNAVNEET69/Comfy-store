import { FaSun } from "react-icons/fa";
import { GoMoon } from "react-icons/go";
import { FaBarsStaggered, FaCartPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const numItemsinCart = useSelector((state) => state.cartState.numItemsInCart);
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to={"/"}
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md ml-4 animate-pulse">
            made with <span className="text-yellow-300 ml-1">Cuoda</span> 💜
          </div>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />

            {/* SUN ICON */}
            <FaSun className="swap-on h-4 w-4" />
            {/* MOON ICON */}
            <GoMoon className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK */}
          <NavLink
            to={"/cart"}
            className="btn btn-ghost btn-circle btn-md ml-4"
          >
            <div className="indicator">
              <FaCartPlus className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsinCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
