import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CustomerProfile from "@/atoms/CustomerProfile";
import styles from "./CustomerNavLeft.module.css";
import NotificationModal from "../NotificationModal";

type NavLeftProps = {
  isOnImage?: boolean; // checker for color
  firstName?: string;
  points?: number;
  lastName?: string;
};

function CustomerNavLeft({
  isOnImage,
  firstName,
  points,
  lastName,
}: NavLeftProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const goToSupport = () => router.push("/guest/settings?tab=support");

  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  // Close modal if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.maindiv}>
      {/* Support Icon */}
      <div onClick={goToSupport} className="cursor-pointer ">
        <img
          src={
            isOnImage
              ? "/images/support-white.png"
              : "/images/support-black.png"
          }
          alt="Support"
          className="h-6 w-6"
        />
      </div>
      {/* notification Icon */}
      <div ref={modalRef} className="relative ">
        <div
          onClick={toggleNotifications}
          className={`p-[10px] rounded-lg cursor-pointer ${isOnImage ? "bg-[#1F2A371A]" : "bg-gray-50"} `}
        >
          <img
            src={
              isOnImage ? "/images/bell-white.png" : "/images/bell-black.png"
            }
            alt="notification"
            className="h-5 w-5"
          />
        </div>

        {/* Notification Modal */}
        {showNotifications && <NotificationModal />}
      </div>

      {/* profile */}
      <CustomerProfile
        isOnImage={isOnImage}
        firstName={firstName}
        points={points}
        lastName={lastName}
      />
    </div>
  );
}

export default CustomerNavLeft;
