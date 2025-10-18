import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`join-item btn btn-sm sm:btn-md border-none font-medium transition-all duration-200 ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));

      // dots
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key={"dots-2"}>
          ...
        </button>
      );
    }



    //last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
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
        {renderPageButtons()}

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

export default ComplexPaginationContainer;
