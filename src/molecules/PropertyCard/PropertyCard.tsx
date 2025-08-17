import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.css";

function PropertyCard(props: PropertyCardProps) {
  const {
    id,
    images,
    title,
    location,
    price,
    rating,
    bedrooms,
    onSave,
    className,
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const nextImage = () => setCurrentIndex((p) => (p + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const toggleSave = () => {
    setIsSaved((s) => {
      const next = !s;
      if (onSave) onSave(id, next);
      return next;
    });
  };

  // Component logic here
  return (
    <div
      className={`w-full  rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white ${
        className || ""
      }`}
    >
      {/* Image / carousel area */}
      <div className="relative" {...handlers}>
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="w-full h-56 object-cover"
        />

        {/* left arrow*/}
        <button
          aria-label="previous image"
          onClick={prevImage}
          className={styles.leftarrow}
        >
          <img
            //   src="/images/angle-left.png"
            src="/images/angle-right.png"
            alt="Previous"
            width={12}
            height={12}
            className="transform -rotate-180"
          />
        </button>

        {/* right arrow */}
        <button
          aria-label="next image"
          onClick={nextImage}
          className={styles.rightarrow}
        >
          <img
            src="/images/angle-right.png"
            alt="Next"
            width={12}
            height={12}
          />
        </button>

        {/* save heart */}
        <button
          aria-pressed={isSaved}
          aria-label={isSaved ? "Unsave listing" : "Save listing"}
          onClick={toggleSave}
          className={styles.heartbtn}
        >
          <img
            src="/images/heart-outline.png"
            alt={isSaved ? "Unsave listing" : "Save listing"}
            width={12}
            height={12}
          />
        </button>

        {/* pagination dots */}
        <div className={styles.dotsdiv}>
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* Property details */}
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-gray-800 leading-tight">
          {title}
        </p>
        <div className="flex justify-between items-start">
          <p className="font-bold text-xs text-primary-600">N{price}/ Night</p>
          <div className="flex items-center gap-1 ">
            <img
              src="/images/little-star.png"
              alt="rating"
              width={12}
              height={12}
            />
            <span className="font-normal text-xs text-gray-800 ">
              {rating.toFixed(1)}
            </span>
            {/* <span className="text-gray-500">({reviewsCount})</span> */}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="px-2 bg-gray-100 rounded-md">
            <p className="text-xs font-normal text-gray-900">
              {bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}
            </p>
          </div>
          <p className="text-gray-500 text-xs font-normal truncate">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
