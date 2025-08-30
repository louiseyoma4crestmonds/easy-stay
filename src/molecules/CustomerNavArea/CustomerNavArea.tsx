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
  const [reportAnIssue, setReportAnIssue] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSignupClick = () => router.push("/guest/signup");
  const goToHomepage = () => router.push("/");

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
          <MenuModal
            buttonClassName={isOnImage ? styles.btndiv : styles.btndivBanner}
            dropdownClassName={
              isOnImage ? styles.dropdowndiv : styles.dropdowndivBanner
            }
            ImgClass="w-6 h-6 "
            leftIcon={leftIcon}
            onReportIssue={() => setReportAnIssue(true)}
          />
          <Button variant="primary" onClick={handleSignupClick}>
            Login or Sign Up
          </Button>
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
          <p className="text-lg font-semibold text-gray-900 my-4 ">
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
