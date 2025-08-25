import StarIcon from "@/atoms/Icons/StarIcon";
import styles from "./ReviewList.module.css";
import { Review } from "../ApartmentDetails/ApartmentDetails.types";
import Pagination from "@/organisms/Pagination";
import { useState } from "react";

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.maindiv}>
      <p className={styles.text}>Guest Reviews ({reviews.length})</p>

      <div className=" overflow-y-auto ">
        {currentItems.map((review, idx) => (
          <div
            key={review.id}
            className={`flex flex-col gap-2 py-4 ${
              idx !== currentItems.length - 1 ? "border-b" : ""
            }`}
          >
            <p className="text-gray-800 text-sm font-normal">
              {review.comment}
            </p>
            <div className="flex flex-row items-center justify-between ">
              <div className="flex flex-row items-center gap-2">
                <img
                  src={review.user.profileImage}
                  alt={review.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col justify-start items-start">
                  <p className="font-normal text-xs text-gray-800">
                    {review.user.name}
                  </p>
                  <div className="flex items-center text-gray-800 text-xs font-normal">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "text-[#FEC84B] "
                            : "text-gray-300"
                        }`}
                      />
                    ))}{" "}
                    <span className="ml-0.5 ">
                      {" "}
                      {review.rating.toFixed(1)}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.datediv}>
                {new Date(review.date).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-8 mb-5 bottom-0 mt-2">
        <Pagination
          listOfItems={reviews}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          prevButton="Previous"
          nextButton="Next"
        />
      </div>
    </div>
  );
}

export default ReviewList;
