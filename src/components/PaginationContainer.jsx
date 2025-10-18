import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-12 flex justify-center">
      <div className="join shadow-sm border border-gray-200 rounded-xl bg-white p-1">
        {/* Prev Button */}
        <button
          className="join-item btn btn-sm sm:btn-md px-4 text-gray-700 hover:bg-base-200 transition-all duration-200"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          ‹ Prev
        </button>

        {/* Page Buttons */}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`join-item btn btn-sm sm:btn-md border-none font-medium transition-all duration-200 ${
              pageNumber === page
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-base-100 text-gray-700 hover:bg-base-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="join-item btn btn-sm sm:btn-md px-4 text-gray-700 hover:bg-base-200 transition-all duration-200"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) {
              nextPage = 1;
            }
            handlePageChange(nextPage);
          }}
        >
          Next ›
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
