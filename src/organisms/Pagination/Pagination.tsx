import React, { useState } from "react";
import Image from "next/image";
import { PaginationProps } from "./Pagination.types";
import styles from "./Pagination.module.css";

function Pagination(props: PaginationProps): JSX.Element {
  const {
    listOfItems,
    itemsPerPage,
    setCurrentPage,
    currentPage,
    prevButton,
    nextButton,
  } = props;

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const totalPages = Math.ceil(listOfItems.length / itemsPerPage);

  const pages: any = [];
  const maxPageNumbersToShow = 4;

  if (totalPages <= maxPageNumbersToShow) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    const halfMax = Math.floor(maxPageNumbersToShow / 2);
    const leftOffset = Math.min(
      Math.max(currentPage - halfMax, 1),
      totalPages - maxPageNumbersToShow + 1
    );

    for (let i = leftOffset; i < leftOffset + maxPageNumbersToShow; i += 1) {
      pages.push(i);
    }
  }

  const mappedPages = pages.slice(0, pages.length - 1);

  const handlePage = (event: any) => {
    if (currentPage === totalPages) {
      setCurrentPage(Number(event.target.id));
    } else {
      setCurrentPage(Number(event.target.id));
    }
  };

  // function that handles next page
  const handleNextBtnPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtnPage = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // const pageLastNumber = pages.length > 0 ? pages[pages.length - 1] : null;
  const pageLastNumber = totalPages;

  // this is for the ellipses btn
  let pageIncrementBtn: any;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <div
        className={styles.paginationDiv}
        onClick={handleNextBtnPage}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {" "}
        &hellip;{" "}
      </div>
    );
  }

  /*
  const handleItemsPerPageChange = (event: any) => {
    const selectedValue = event.target.value;
    const newItemsPerPage = parseInt(event.target.value, 10);

    if (selectedValue === "all") {
      setItemsPerPage(listOfItems.length);
    } else {
      setItemsPerPage(newItemsPerPage);
    }
    setCurrentPage(1);
    setMaxPageNumberLimit(3);
    setMinPageNumberLimit(0);
  };
  */

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationFrame}>
        <button
          type="button"
          className={`${styles.paginationDivBtn} ${
            totalPages === 1 ? "opacity-25 " : ""
          }`}
          onClick={handlePrevBtnPage}
          // disabled={currentPage === mappedPages[0]}
          disabled={currentPage === 1 || totalPages === 1}
        >
          {" "}
          {prevButton}
        </button>
        {mappedPages.map((pageNumber: any) => {
          if (
            pageNumber < maxPageNumberLimit + 1 &&
            pageNumber > minPageNumberLimit
          ) {
            return (
              <div
                key={pageNumber}
                id={pageNumber}
                onClick={handlePage}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                className={`${
                  currentPage === pageNumber
                    ? `${styles.paginationDivActive}`
                    : `${styles.paginationDiv}`
                } `}
              >
                {" "}
                {pageNumber}{" "}
              </div>
            );
          }

          return null;
        })}
        {/* {totalPages > maxPageNumbersToShow && pageIncrementBtn} */}
        {totalPages > maxPageNumbersToShow && pageIncrementBtn}
        {pageLastNumber !== null && (
          <button
            type="button"
            className={`${
              currentPage === pageLastNumber
                ? `${styles.paginationDivActive}`
                : `${styles.paginationDiv}`
            } `}
            id={pageLastNumber.toString()}
            // id={pageLastNumber.toString()}
            onClick={handlePage}
          >
            {pageLastNumber}
          </button>
        )}
        <button
          type="button"
          className={`${styles.paginationDivBtn} ${
            totalPages === 1 ? "opacity-25 " : ""
          } `}
          onClick={handleNextBtnPage}
          // disabled={currentPage === pages[pages.length - 1]}
          disabled={currentPage === pageLastNumber || totalPages === 1}
          // disabled={currentPage === mappedPages[mappedPages.length - 1]}
        >
          {" "}
          {nextButton}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
