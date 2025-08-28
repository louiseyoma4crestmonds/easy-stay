// import { useRouter } from "next/router";
import styles from "./CustomerProfile.module.css";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "@/molecules/ProfileModal";
import PointsModal from "@/molecules/PointsModal";
import Modal from "@/molecules/Modal";
import Button from "../Button";

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
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selected, setSelected] = useState<null | "apartment" | "ride">(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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

  // PROCEED AFTER SELECTING FREE RIDE OR APARTMENT
  const onProceed = () => {
    setShowRedeemModal(false);
    // setShowFinalModal(true);
    setShowSuccessModal(true);
  };

  const onClose = () => {
    if (showRedeemModal) {
      setShowRedeemModal(false);
      setSelected(null);
    }
    if (showSuccessModal) {
      setShowSuccessModal(false);
      setSelected(null);
    }
  };

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
          onClose={() => setShowProfileModal(false)}
          onRedeemPoints={() => setShowRedeemModal(true)}
          onLogoutModal={() => setShowLogoutModal(true)}
        />
      )}

      {/**POINTS MODAL*/}
      {showRedeemModal && (
        <PointsModal
          onClose={onClose}
          onProceed={onProceed}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={onClose}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent}
        >
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-lg font-semibold text-gray-900 "> 🎉Success!</p>
            {selected === "ride" ? (
              <p className="font-normal text-gray-500 text-sm text-center pt-2 ">
                Your free airport ride has been redeemed. We'll contact you to
                arrange pickup.
              </p>
            ) : (
              <p className="font-normal text-gray-500 text-sm text-center pt-2 ">
                Your free apartment booking has been redeemed. Check your email
                for booking details.
              </p>
            )}
          </div>
        </Modal>
      )}

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-3  ">
              {" "}
              Logout
            </p>

            <p className="text-gray-500 text-sm pb-6 ">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center items-center gap-5 ">
              <Button
                variant="profile"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button variant="delete">Logout</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CustomerProfile;
