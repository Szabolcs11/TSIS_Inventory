import React from "react";
import style from "./../styles/ListPaginationStyle.css";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <div className="paginator-container">
      {pageNumbers.map((pgNumber) => (
        <div onClick={() => setCurrentPage(pgNumber)} key={pgNumber} className={`page-item ${currentPage == pgNumber ? "active" : ""} `}>
          <a>{pgNumber}</a>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
