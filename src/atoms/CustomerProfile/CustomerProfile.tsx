import { useRouter } from "next/router";
import styles from "./CustomerProfile.module.css";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "@/molecules/ProfileModal";

type CustomerProfileProps = {
  firstName?: string;
  lastName?: string;
  points?: number;
  avatarUrl?: string; // optional
  isOnImage?: boolean;
};

function CustomerProfile({
  firstName,
  lastName,
  points,
  avatarUrl,
  isOnImage,
}: CustomerProfileProps) {
  //   const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fallback to default avatar if none is provided
  const displayAvatar = avatarUrl || "/images/Avatar.png";
  const profileRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileModal = () => setShowProfileModal((prev) => !prev);

  return (
    <div ref={profileRef} className="relative">
      <div className={styles.maindiv} onClick={toggleProfileModal}>
        <div className="relative">
          <img
            src={displayAvatar}
            alt="Avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          {/* Points badge */}
          {points && <span className={styles.pointsdiv}>{points}</span>}
        </div>

        {/* First name */}
        <span
          className={`font-normal text-base ${isOnImage ? "text-white" : "text-gray-800"} `}
        >
          Hi, {firstName}
        </span>
      </div>

      {showProfileModal && (
        <ProfileModal
          firstName={firstName}
          points={points}
          lastName={lastName}
        />
      )}
    </div>
  );
}

export default CustomerProfile;
