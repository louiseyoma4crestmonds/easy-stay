import Image from "next/image";
import styles from "./ApartmentDetails.module.css";
import { ApartmentDetailsProps } from "./ApartmentDetails.types";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import ReviewList from "../ReviewList";
import RatingOverview from "../RatingOverview";
import RulesSection from "../RulesSection";
import RightsideContent from "../RightsideContent";
import Modal from "../Modal";
import {
  getPropertyAmenities,
  getPropertyReviews,
} from "src/pages/api/property";

function ApartmentDetails(props: ApartmentDetailsProps) {
  const { isLoggedIn, apartment, isMobile } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [reviews, setReviews] = useState<any>([]);
  const [amenities, setAmenities] = useState<any>([]);

  // 🔥 Ensure apartment.photo is always an array
  let photos: string[] = [];
  try {
    photos =
      typeof apartment.photo === "string"
        ? JSON.parse(apartment.photo) // handle stringified JSON
        : apartment.photo || []; // already array
  } catch (err) {
    console.error("Invalid photo format:", apartment.photo);
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  //FUNCTION TO COPY LINK
  const handleCopyLink = async () => {
    try {
      const link = `${window.location.origin}/property-details/${apartment.id}`; // or router.asPath
      await navigator.clipboard.writeText(link);
      // alert("Link copied to clipboard!"); // you can replace with toast
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Get Reviews
  useEffect(() => {
    getPropertyReviews(apartment.id).then((response: any) => {
      setReviews(response.data.data);
    });
    getPropertyAmenities(apartment.id).then((response: any) => {
      setAmenities(response.data.data);
    });
  }, [apartment.id]);

  return (
    <div className="bg-gray-50 pb-16 ">
      <div className="flex flex-row justify-between items-center px-6 md:px-28 py-8 bg-white  ">
        <p className="text-gray-800 font-medium text-sm md:text-2xl ">
          {" "}
          {apartment.name}{" "}
        </p>
        <div className="flex gap-3 items-center ">
          <button
            aria-label={"isSaved"}
            //   onClick={toggleSave}
            // className={styles.heartbtn}
            className={styles.heartborder}
          >
            {/* <Image
              src={
                apartment.isSaved
                  ? "/images/filled-heart.png"
                  : "/images/heart-outline.png"
              }
              alt={apartment.isSaved ? "Unsave listing" : "Save listing"}
              width={20}
              height={20}
            /> */}
            <Image
              src="/images/filled-heart.png"
              alt="Unsave listing"
              width={isMobile ? 13 : 20}
              height={isMobile ? 13 : 20}
            />
          </button>
          <button
            aria-label={"share"}
            onClick={() => setShowShareModal(true)}
            className={styles.heartborder}
          >
            <Image
              src="/images/share-outline.png"
              alt={"share-icon"}
              width={isMobile ? 13 : 20}
              height={isMobile ? 13 : 20}
            />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Main Image */}
        <Image
          src={photos[activeIndex]}
          alt={`Apartment image ${activeIndex + 1}`}
          layout="fill"
          className="object-cover"
        />

        {/* left arrow*/}
        <button
          aria-label="previous image"
          onClick={prevSlide}
          className={styles.leftarrow}
        >
          <Image
            src="/images/angle-right.png"
            alt="Previous"
            width={isMobile ? 14 : 36}
            height={isMobile ? 14 : 36}
            className="transform -rotate-180"
          />
        </button>
        {/* right arrow */}
        <button
          aria-label="next image"
          onClick={nextSlide}
          className={styles.rightarrow}
        >
          <Image
            src="/images/angle-right.png"
            alt="Next"
            width={isMobile ? 14 : 36}
            height={isMobile ? 14 : 36}
          />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="hidden md:block absolute bottom-4 right-4  "
        >
          <Image
            src="/images/fullscreen.png"
            alt="fullscreen"
            width={48}
            height={48}
          />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-4 bg-black/60 text-gray-50 text-base font-medium px-3 py-1 rounded-full">
          {activeIndex + 1} / {photos.length}
        </div>
      </div>
      <div className=" w-[90%] md:w-[80%] mx-auto mt-8  ">
        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 mb-8 overflow-x-auto hide-scrollbar ">
          <div className="flex gap-2 w-max md:w-auto">
            {photos.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-16 h-16 md:w-28 md:h-28 rounded-lg overflow-hidden cursor-pointer border-2 md:border-4 transition-all duration-200 ${
                  activeIndex === index
                    ? "border-primary-600"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* details */}

        <div className="flex flex-col md:flex-row gap-4 mt-6 ">
          <div className="w-full md:w-[70%] ">
            <div className="bg-white rounded-lg p-5 ">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
                <p className="font-bold text-2xl text-primary-600 ">
                  ₦{apartment.price}/Night
                </p>
                <div className="flex flex-row gap-2 font-normal text-gray-800 text-base ">
                  <div className="flex items-center gap-1 px-2 border-r   ">
                    <Image
                      src="/images/little-star.png"
                      alt="rating"
                      width={20}
                      height={20}
                    />

                    <span> {apartment.rating} </span>
                  </div>
                  <p>{reviews.length} Reviews </p>{" "}
                </div>
              </div>{" "}
              <p className="text-gray-600 font-normal text-sm py-7 border-b ">
                {" "}
                {apartment.description}{" "}
              </p>
              <div className="flex flex-row items-center justify-between py-8 border-b w-full ">
                <div className="flex flex-col justify-start md:w-[30%] ">
                  <p className="text-gray-500 font-normal text-xs md:text-sm ">
                    Apartment Type
                  </p>
                  <p className="bg-gray-100 px-3 md:w-[100px] mt-1 rounded-md text-gray-900 font-medium text-sm ">
                    {" "}
                    {/* {apartment.apartmentType} Bedrooms */}
                    {apartment.type.name}
                  </p>
                </div>
                <div className="flex flex-col justify-start md:w-[30%] ">
                  <p className="text-gray-500 font-normal text-xs md:text-sm ">
                    Rooms{" "}
                  </p>
                  <p className=" text-gray-900 font-medium text-xs md:text-sm ">
                    {apartment.rooms}{" "}
                  </p>
                </div>
                <div className="flex flex-col justify-start  md:w-[30%]  ">
                  <p className="text-gray-500 font-normal text-xs md:text-sm ">
                    No of Guests{" "}
                  </p>
                  <p className=" text-gray-900 font-medium text-sm ">
                    {apartment.number_off_allowed_infants +
                      apartment.number_off_allowed_adults +
                      apartment.number_off_allowed_children +
                      apartment.number_off_allowed_pets}{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col py-7 ">
                <div className="flex flex-col justify-start ">
                  <p className="text-gray-500 font-normal text-sm ">Address </p>
                  <p className=" text-gray-900 font-medium text-sm ">
                    {apartment.address}{" "}
                  </p>
                </div>
                <div className="mt-4  relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/images/map.png"
                    alt="Apartment location"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                  />
                  {/* <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                 
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                      apartment.address
                    )}`}
                ></iframe> */}
                </div>
              </div>
            </div>

            {/*THIS IS FOR JUST MOBILE*/}
            <div className=" block mt-6 w-full md:hidden  ">
              <RightsideContent
                apartment={apartment}
                guests={apartment.number_off_allowed_guests}
                isLoggedIn={isLoggedIn}
                price={apartment.price}
                isMobile={isMobile}
              />
            </div>

            {/*AMENITIES*/}
            <div className=" bg-white rounded-lg p-5 mt-6 ">
              <p className="text-gray-500 font-normal text-sm ">Amenities </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 mt-4 gap-x-3">
                {amenities?.map((amenity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-800 text-sm font-medium"
                  >
                    <Image
                      src="/images/check-circle.png" // you can replace with a nice checkmark
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <span className="pl-2"> {amenity.amenity.name} </span>
                  </div>
                ))}
              </div>
            </div>

            {/*RULES*/}
            <RulesSection
              rules={apartment.rules}
              checkinTime={apartment.expected_checkin_time}
              checkoutTime={apartment.expected_checkout_time}
              isMobile={isMobile}
            />

            {/**REFUND POLICY*/}
            <div className=" bg-white rounded-lg p-5 mt-6 ">
              <p className="text-gray-500 font-normal text-sm ">
                Refund Policy{" "}
              </p>

              <p className=" text-gray-800 font-normal text-sm mt-2  ">
                {apartment.refund_policy}{" "}
              </p>
            </div>

            {/*DATE AVALABILITY*/}
            <div className=" bg-white rounded-lg p-5 mt-6 ">
              <div className="flex justify-between items-center ">
                <p className="text-gray-500 font-normal text-sm ">
                  Date Available{" "}
                </p>
                <p>
                  <Moment format="DD/M/YYYY">
                    {apartment.from_date_available}
                  </Moment>{" "}
                  -{" "}
                  <Moment format="DD/M/YYYY">
                    {apartment.to_date_available}
                  </Moment>
                </p>
              </div>
            </div>

            {/*OVERALL RATING*/}
            {/* <RatingOverview
              overall={apartment.rating.overall}
              breakdown={apartment.rating.breakdown}
            /> */}

            {/*REVIEWS*/}
            {/* <ReviewList reviews={apartment.reviews} /> */}
          </div>

          {/*RIGHTSIDE CONTENT*/}
          <div className=" hidden md:block space-y-4 w-full md:w-[30%]   ">
            <RightsideContent
              apartment={apartment}
              guests={apartment.number_off_allowed_guests}
              isLoggedIn={isLoggedIn}
              price={apartment.price}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>

      {showShareModal && (
        <Modal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Share this apartment"
          modalcontent={styles.modalContent}
          titleImageUrl="/images/share-outline.png"
        >
          <div className="w-full px-6 ">
            <div className={styles.firstdiv}>
              <div className="flex items-center ">
                <Image
                  src="/images/sample-image.png"
                  alt="sample-img"
                  width={isMobile ? 363 : 88}
                  height={isMobile ? 140 : 73}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row items-center gap-2 ">
                  <p className="text-gray-900 font-medium text-base ">
                    {apartment.name}
                  </p>
                  <div>
                    <Image
                      src="/images/little-star.png"
                      width={16}
                      height={16}
                    />
                    <span className="text-gray-400 ml-0.5 font-normal text-sm ">
                      {apartment.rating}
                    </span>
                  </div>
                </div>
                <div className="text-primary-600 font-bold text-sm ">
                  ₦{apartment.price}/Night
                </div>
                <div className="flex flex-row items-center gap-2 ">
                  <p className="bg-gray-100 px-3 mt-2 md:mt-1 rounded-md text-gray-900 font-medium text-sm ">
                    {" "}
                    {apartment.type.name}
                  </p>
                  <p className="bg-gray-100 px-3 hidden md:block  mt-1 rounded-md text-gray-900 font-medium text-sm ">
                    {apartment.number_off_allowed_infants +
                      apartment.number_off_allowed_adults +
                      apartment.number_off_allowed_children +
                      apartment.number_off_allowed_pets}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center ">
              <button className={styles.btndiv}>
                {" "}
                <Image
                  src="/images/envelope-outline2.png"
                  alt="envelope"
                  width={24}
                  height={24}
                />
                Email
              </button>
              <button className={styles.btndiv} onClick={handleCopyLink}>
                {" "}
                <Image
                  src="/images/file-copy-outline.png"
                  alt="file-copy"
                  width={24}
                  height={24}
                />
                Copy Link
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ApartmentDetails;
