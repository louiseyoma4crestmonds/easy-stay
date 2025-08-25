import { useRouter } from "next/router";
import Image from "next/image";
import CustomerTabs from "@/atoms/CustomerTabs";
import Button from "@/atoms/Button";
import CustomDropdown from "../CustomDropdown";
import styles from "./CustomerNavArea.module.css";
import CustomerNavLeft from "../CustomerNavLeft";
import logoText from "public/images/Text.png";
import { CustomerNavAreaProps } from "./CustomerNavArea.types";
import { useState } from "react";
import Modal from "../Modal";

function CustomerNavArea(props: CustomerNavAreaProps) {
  const {
    isOnImage,
    leftIcon,
    defaultTextColor,
    isLoggedIn,
    firstName,
    lastName,
    points,
  } = props;
  const router = useRouter();

  const menuOptions = [
    {
      label: "Register Your Apartment",
      link: "/guest/register-your-apartment",
    },
    { label: "How it Works", link: "/guest/how-it-works" },
    { label: "Report an Issue", onClick: () => setReportAnIssue(true) },
    { label: "About Us", link: "/guest/about-us" },
    { label: "FAQs", link: "/guest/faqs" },
  ];

  const handleSignupClick = () => router.push("/guest/signup");
  const goToHomepage = () => router.push("/");

  const [reportAnIssue, setReportAnIssue] = useState(false);

  return (
    <div
      className={`flex justify-between items-center px-12 ${
        isOnImage
          ? "bg-transparent absolute z-20 left-0 right-0 top-8 "
          : "bg-white py-6 border-b border-gray-200  "
      }`}
    >
      <div
        onClick={goToHomepage}
        className=" flex items-center cursor-pointer  "
      >
        {" "}
        <Image
          src={logoText}
          alt="Easy Stay Logo"
          width={115}
          height={48}
        />{" "}
      </div>

      {isLoggedIn && <CustomerTabs defaultTextColor={defaultTextColor} />}

      {isLoggedIn && (
        <CustomerNavLeft
          isOnImage={isOnImage}
          firstName={firstName}
          lastName={lastName}
          points={points}
        />
      )}

      {!isLoggedIn && (
        <div className="flex justify-between items-center gap-2">
          <CustomDropdown
            options={menuOptions}
            buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
            dropdownClassName={
              isOnImage ? styles.dropdowndiv : styles.dropdowndivBanner
            }
            ImgClass="w-6 h-6 "
            leftIcon={leftIcon}
          />
          <Button variant="primary" onClick={handleSignupClick}>
            Login or Sign Up
          </Button>
        </div>
      )}

      {reportAnIssue && (
        <Modal isOpen onClose={() => setReportAnIssue(false)}>
          <div>hello an issue</div>
        </Modal>
      )}
    </div>
  );
}

export default CustomerNavArea;
