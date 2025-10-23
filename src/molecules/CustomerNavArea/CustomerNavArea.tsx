import { useRouter } from "next/router";
import Image from "next/image";
import CustomerTabs from "@/atoms/CustomerTabs";
import Button from "@/atoms/Button";
import styles from "./CustomerNavArea.module.css";
import CustomerNavLeft from "../CustomerNavLeft";
import logoText from "public/images/Text.png";
import { CustomerNavAreaProps } from "./CustomerNavArea.types";
import { useState } from "react";
import Modal from "../Modal";
import MenuModal from "../MenuModal";
import ReportanIssue from "../ReportanIssue";

// guest dropdown
const guestMenuOptions = [
  { label: "Register Your Apartment", link: "/register-your-apartment" },
  { label: "How it Works", link: "/how-it-works" },
  { label: "Report an Issue", isReport: true },
  { label: "About Us", link: "/about-us" },
  { label: "FAQs", link: "/faqs" },
];

// logged in dropdown
const loggedInMenuOptions = [
  { label: "Explore", link: "/", icon: "/images/explore-default.png" },
  {
    label: "My Bookings",
    link: "/guest/my-bookings",
    icon: "/images/bookings-default.png",
  },
  {
    label: "Saved",
    link: "/guest/my-wishlist",
    icon: "/images/save-default.png",
  },
];

function CustomerNavArea(props: CustomerNavAreaProps) {
  const {
    isOnImage,
    leftIcon,
    defaultTextColor,
    isLoggedIn,
    firstName,
    lastName,
    points,
    isMobile,
    isOtherPages = true,
  } = props;
  const router = useRouter();
  const [reportAnIssue, setReportAnIssue] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSignupClick = () => router.push("/signin");
  const goToHomepage = () => router.push("/");

  const registerApartment = () => {
    router.push("/register-your-apartment");
  };

  return (
    <div
      className="flex flex-col "
      // className={`flex flex-col  ${
      //   isOnImage
      //     ? "bg-transparent absolute z-20 left-0 right-0 top-8 "
      //     : "bg-white py-6 border-b border-gray-200  "
      // }`}
    >
      <div
        className={`flex flex-row md:justify-between gap-x-12 md:gap-x-0 items-center px-5 md:px-12 ${
          isOnImage
            ? "bg-transparent absolute z-20 left-0 right-0 top-8 "
            : "bg-white py-6 border-b border-gray-200  "
        }`}
      >
        {isMobile && (
          <MenuModal
            buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
            dropdownClassName={
              isOnImage ? styles.dropdowndiv : styles.dropdowndivBanner
            }
            ImgClass="w-8 h-8"
            leftIcon={leftIcon}
            onReportIssue={() => setReportAnIssue(true)}
            menuOptions={isLoggedIn ? loggedInMenuOptions : guestMenuOptions}
            isLoggedIn={isLoggedIn}
          />
        )}

        <div
          onClick={goToHomepage}
          role="button"
          tabIndex={0}
          onKeyDown={goToHomepage}
          className=" flex items-center justify-center cursor-pointer   "
        >
          {" "}
          <Image
            src={logoText}
            alt="Easy Stay Logo"
            width={isMobile ? 96 : 115}
            height={isMobile ? 40 : 48}
          />{" "}
        </div>

        {isLoggedIn && <CustomerTabs defaultTextColor={defaultTextColor} />}
        {!isMobile && isLoggedIn && (
          <div className="flex justify-between items-center gap-2 ">
            <MenuModal
              buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
              dropdownClassName={
                isOnImage ? styles.dropdowndiv : styles.dropdowndivBanner
              }
              ImgClass="w-6 h-6 "
              leftIcon={leftIcon}
              onReportIssue={() => setReportAnIssue(true)}
              menuOptions={guestMenuOptions}
            />
            {!isOtherPages && (
              <button className={styles.btn1} onClick={registerApartment}>
                Register Your Apartment
              </button>
            )}
          </div>
        )}

        {isLoggedIn && (
          <CustomerNavLeft
            isOnImage={isOnImage}
            firstName={firstName}
            lastName={lastName}
            points={points}
          />
        )}

        {!isMobile && !isLoggedIn && (
          <div className="flex justify-between items-center gap-2 ">
            <MenuModal
              buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
              dropdownClassName={
                isOnImage ? styles.dropdowndiv : styles.dropdowndivBanner
              }
              ImgClass="w-6 h-6 "
              leftIcon={leftIcon}
              onReportIssue={() => setReportAnIssue(true)}
              menuOptions={guestMenuOptions}
            />
            {!isOtherPages && (
              <button className={styles.btn1} onClick={registerApartment}>
                Register Your Apartment
              </button>
            )}
            <div className="hidden md:block ">
              <Button variant="primary" onClick={handleSignupClick}>
                {isOtherPages
                  ? " Login or Create an Account"
                  : " Login or Sign Up"}
              </Button>{" "}
            </div>
          </div>
        )}
      </div>

      {!isOtherPages && (
        <div className=" overflow-x-auto flex-nowrap hide-scrollbar  mt-32 pl-16 md:pl-0 flex items-center justify-center flex-row gap-4">
          <a
            href="https://example1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outsideBtn}
          >
            <Image
              src="/images/home-outline2.png"
              alt="Example 1"
              width={20}
              height={20}
            />
            <span>Shortlets</span>
          </a>
          <a
            href="https://example2.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outsideBtn}
          >
            <Image
              src="/images/bag-outline.png"
              alt="Example 2"
              width={20}
              height={20}
            />
            <span>Food & Beverages</span>
          </a>
          <a
            href="https://example3.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outsideBtn}
          >
            <Image
              src="/images/truck-outline.png"
              alt="Example 3"
              width={20}
              height={20}
            />
            <span>Transport</span>
          </a>
        </div>
      )}

      {/* {reportAnIssue && ( */}
      {reportAnIssue && (
        <ReportanIssue
          reportAnIssue={reportAnIssue}
          setReportAnIssue={setReportAnIssue}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent4}
        >
          <p className="text-lg font-semibold text-gray-900 my-2 md:my-4 ">
            Ticket Raised Successfully{" "}
          </p>
          <p className="text-gray-500 text-sm font-normal text-center ">
            {" "}
            Your ticket has been successfully logged. You will receive a
            follow-up email from our support team.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default CustomerNavArea;
