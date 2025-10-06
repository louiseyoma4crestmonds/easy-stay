import Image from "next/image";
import NotificationModal from "@/molecules/NotificationModal";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./HostNavArea.module.css";
import { HostNavAreaProps } from "./HostNavArea.types";
import Link from "next/link";

const profileOptions = [
  {
    label: "View Profile",
    link: "/guest/settings?tab=profile",
  },

  { label: "Settings", link: "/guest/settings?tab=support" },
];

function HostNavArea({ firstName, lastName }: HostNavAreaProps) {
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const profilemodalRef = useRef<HTMLDivElement>(null);

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

      if (
        profilemodalRef.current &&
        !profilemodalRef.current.contains(event.target as Node)
      ) {
        setShowProfileModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <div className="flex flex-row items-center justify-between px-6 py-2  ">
      <div className="relative w-full md:w-[35%] ">
        <div className={styles.imgdiv}>
          <Image
            src="/images/search-outline2.png"
            width={16}
            height={16}
            alt="search icon"
          />
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className={styles.inputdiv}
        />
      </div>

      <div className="flex flex-row items-center gap-6 ">
        <div className="flex items-center gap-1.5 rounded-md bg-green-100 py-0.5 px-3 ">
          {" "}
          <img
            src="/images/badge-check.png"
            alt="verified-img"
            className="w-4 h-4 "
          />
          Verified
        </div>

        {/* notification Icon */}
        <div ref={modalRef} className="relative ">
          <div
            onClick={toggleNotifications}
            className="p-[10px] rounded-lg cursor-pointer bg-gray-50 "
          >
            <img
              src="/images/bell-black.png"
              alt="notification"
              className="h-5 w-5"
            />
          </div>

          {/* Notification Modal */}
          {showNotifications && <NotificationModal />}
        </div>

        <div ref={profilemodalRef} className="relative cursor-pointer">
          <div
            className={styles.initialsdiv}
            onClick={() => setShowProfileModal((prev) => !prev)}
          >
            {" "}
            {initials.toUpperCase()}{" "}
          </div>

          {showProfileModal && (
            <div className={styles.profilemodaldiv}>
              <div className="flex flex-row p-4 gap-2 border-b ">
                <div className={styles.initialsdiv}>
                  {" "}
                  {initials.toUpperCase()}{" "}
                </div>
                {/* Name and points stacked */}
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-medium">
                    {firstName} {lastName}
                  </p>
                </div>
              </div>

              {profileOptions.map((option, i) =>
                option.link ? (
                  <Link key={i} href={option.link}>
                    <a
                      onClick={() => setShowProfileModal(false)}
                      className={styles.label}
                    >
                      {option.label}
                    </a>
                  </Link>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HostNavArea;
