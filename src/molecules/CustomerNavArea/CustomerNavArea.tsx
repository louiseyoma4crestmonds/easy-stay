import { useRouter } from "next/router";
import CustomerTabs from "@/atoms/CustomerTabs";
import Button from "@/atoms/Button";
import CustomDropdown from "../CustomDropdown";
import styles from "./CustomerNavArea.module.css";
import CustomerNavLeft from "../CustomerNavLeft";

type CustomerNavAreaProps = {
  isOnImage?: boolean;
  leftIcon?: string;
  defaultTextColor?: string;
  isLoggedIn?: boolean;
  firstName?: string;
  lastName?: string;
  points?: number;
};

function CustomerNavArea({
  isOnImage,
  leftIcon,
  defaultTextColor,
  isLoggedIn,
  firstName,
  lastName,
  points,
}: CustomerNavAreaProps) {
  const router = useRouter();

  const menuOptions = [
    {
      label: "Register Your Apartment",
      link: "/guest/register-your-apartment",
    },
    { label: "How it Works", link: "/guest/how-it-works" },
    { label: "Report an Issue", link: "/country/france" },
    { label: "About Us", link: "/guest/about-us" },
    { label: "FAQs", link: "/guest/faqs" },
  ];

  const handleSignupClick = () => router.push("/guest/signup");
  const goToHomepage = () => router.push("/guest");

  return (
    <div
      className={`flex justify-between items-center px-12 ${
        isOnImage
          ? "bg-transparent absolute z-20 left-0 right-0 top-8 "
          : "bg-white py-6 border-b border-gray-200  "
      }`}
    >
      <div onClick={goToHomepage}>
        {" "}
        <img
          src="/images/text.png"
          alt="Easy Stay Logo"
          className="h-12  w-auto cursor-pointer "
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
            //   buttonClassName={styles.btndiv}
            buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
            //   dropdownClassName={styles.dropdowndiv}
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
    </div>
  );
}

export default CustomerNavArea;
