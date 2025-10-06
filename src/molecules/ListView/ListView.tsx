import Image from "next/image";
import styles from "./ListView.module.css";
import { property } from "src/helpers/dataTypes";
import { useState } from "react";
import Modal from "../Modal";
import Button from "@/atoms/Button";
import { useRouter } from "next/router";

type ListViewProps = {
  properties: property[];
  isLoggedIn?: boolean;
};

function ListView({ properties, isLoggedIn }: ListViewProps) {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSigninClick = () => {
    setShowAuthModal(false);
    router.push("/guest/signin");
  };

  const handleSignupClick = () => {
    setShowAuthModal(false);
    router.push("/guest/signup");
  };

  return (
    <div className="w-full  ">
      {properties.map((property) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isSaved, setIsSaved] = useState<boolean>(false);
        let arr: string[] = [];
        try {
          arr = JSON.parse(property.photo ?? "[]");
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

        const toggleSave = () => {
          if (!isLoggedIn) {
            setShowAuthModal(true);
            return;
          }
          setIsSaved((s) => !s);
          // optionally call onSave(property.id, !isSaved)
        };

        return (
          <div
            className="flex rounded-lg  border   hover:border-primary-600 mb-6 border-gray-200 hover:bg-primary-100 flex-row"
            key={property.id}
          >
            {/* image carousel */}
            <div className="relative flex-shrink-0 cursor-pointer">
              <img
                src={arr[currentIndex]}
                alt={`${property.name} - ${currentIndex + 1}`}
                className="w-[168px] h-40 object-cover rounded-l-lg  "
              />
              <button
                aria-label="previous image"
                onClick={prevImage}
                className={styles.leftarrow}
              >
                <Image
                  src="/images/angle-right.png"
                  alt="Previous"
                  width={12}
                  height={12}
                  className="transform -rotate-180"
                />
              </button>

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

            {/* property details */}
            <div
              className="px-4 py-3 w-full space-y-2 cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: "/guest/property-details",
                  query: { propertyId: property.id },
                })
              }
            >
              <div className="flex items-center justify-between ">
                <p className="text-base font-bold text-primary-600">
                  {property.name}
                </p>
                <button
                  aria-pressed={isSaved}
                  aria-label={isSaved ? "Unsave" : "Save"}
                  onClick={toggleSave}
                  className=" rounded-full bg-[#00000033] h-5 w-5 "
                  //   className={styles.heartbtn}
                >
                  <Image
                    src={
                      isSaved
                        ? "/images/filled-heart.png"
                        : "/images/heart-outline.png"
                    }
                    alt="heart icon"
                    width={12}
                    height={12}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-500">{property.description}</p>
              <div className="flex justify-between">
                <p className="font-bold text-sm text-gray-800">
                  {property.rate}
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/little-star.png"
                    alt="rating"
                    width={12}
                    height={12}
                  />
                  <span className="text-xs text-gray-800">
                    {property.rating}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex justify-between">
                <div className="px-2 bg-gray-100 rounded-md">
                  <p className="text-xs text-gray-900">{property.rooms.name}</p>
                </div>
                <p className="text-gray-500 text-xs truncate">
                  {property.neighbourhood.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}

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
            <p className="text-gray-500 text-sm py-5 px-8 text-center ">
              Loving what you see? Sign in or sign up below to save this to your
              wishlist and keep track of your favorites!
            </p>
            <div className="flex justify-center items-center mb-4 gap-5 px-4 ">
              <Button
                variant="profile"
                width="full"
                onClick={handleSigninClick}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                width="full"
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ListView;
