import { useState } from "react";
import Router from "next/router";
// import { useSwipeable } from "react-swipeable";
import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "../Modal";
import Button from "@/atoms/Button";

function PropertyCard(props: PropertyCardProps) {
  const {
    id,
    photo,
    name,
    neighbourhood,
    rate,
    rating,
    rooms,
    onSave,
    className,
    isLoggedIn,
    isSaved: initialSaved = false,
    isWishlist = false,
  } = props;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(initialSaved);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  let arr: string[] = [];
  try {
    arr = JSON.parse(photo ?? "[]");
  } catch (e) {
    console.error("Invalid JSON in photo", e);
    arr = [];
  }

  const nextImage = () =>
    setCurrentIndex((p) => (arr.length > 0 ? (p + 1) % arr.length : 0));

  const prevImage = () =>
    setCurrentIndex((p) =>
      arr.length > 0 ? (p === 0 ? arr.length - 1 : p - 1) : 0
    );

  // const handlers = useSwipeable({
  //   onSwipedLeft: nextImage,
  //   onSwipedRight: prevImage,
  //   // preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  // });

  const toggleSave = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true); // Show modal if not logged in
      return;
    }

    setIsSaved((s) => {
      const next = !s;
      if (onSave) onSave(id, next);
      return next;
    });
  };

  //  pick icon depending on where we are
  const heartIcon = isSaved
    ? isWishlist
      ? "/images/heart-white.png" // wishlist saved → white
      : "/images/filled-heart.png" // normal saved → red
    : "/images/heart-outline.png"; // not saved → outline

  // {...handlers}

  return (
    <div
      className={`w-full  rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white ${
        className || ""
      }`}
    >
      {/* Image / carousel area */}
      <div
        className="relative cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          Router.push({
            pathname: "/guest/property-details",
            query: { propertyId: id },
          });
        }}
        onClick={() => {
          Router.push({
            pathname: "/guest/property-details",
            query: { propertyId: id },
          });
        }}
      >
        <img
          src={arr[currentIndex]}
          alt={`${name} - ${currentIndex + 1}`}
          className="w-full h-56 object-cover"
        />

        {/* left arrow*/}
        <button
          aria-label="previous image"
          onClick={prevImage}
          className={styles.leftarrow}
        >
          <Image
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
          <Image
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
          // className={styles.heartbtn}
          className={
            !isSaved
              ? styles.heartbtn
              : isWishlist
                ? styles.heartbtn
                : styles.heartbtn2
          }
        >
          <Image
            src={heartIcon}
            alt={isSaved ? "Unsave listing" : "Save listing"}
            width={12}
            height={12}
          />
        </button>

        {/* pagination dots */}
        <div className={styles.dotsdiv}>
          {arr.map((_, idx) => (
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
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          Router.push({
            pathname: "/guest/property-details",
            query: { propertyId: id },
          });
        }}
        onClick={() => {
          Router.push({
            pathname: "/guest/property-details",
            query: { propertyId: id },
          });
        }}
        className="px-4 py-3 space-y-2"
      >
        <p className="text-sm font-medium text-gray-800 leading-tight">
          {name}
        </p>
        <div className="flex justify-between items-start">
          <p className="font-bold text-xs text-primary-600">{rate}</p>
          <div className="flex items-center gap-1 ">
            <Image
              src="/images/little-star.png"
              alt="rating"
              width={12}
              height={12}
            />
            <span className="font-normal text-xs text-gray-800 ">{rating}</span>
            {/* <span className="text-gray-500">({reviewsCount})</span> */}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="px-2 bg-gray-100 rounded-md">
            <p className="text-xs font-normal text-gray-900">{rooms}</p>
          </div>
          <p className="text-gray-500 text-xs font-normal truncate">
            {neighbourhood}
          </p>
        </div>
      </div>

      {showAuthModal && (
        <Modal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          imageUrl="/images/hello-world.png"
          width={96}
          height={96}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-500 text-sm py-7 ">
              Loving what you see? Sign in or sign up below to save this to your
              wishlist and keep track of your favorites!
            </p>
            <div className="flex justify-center items-center gap-5 ">
              <Button variant="profile" onClick={() => setShowAuthModal(false)}>
                Sign In
              </Button>
              <Button variant="primary">Sign Up</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PropertyCard;
