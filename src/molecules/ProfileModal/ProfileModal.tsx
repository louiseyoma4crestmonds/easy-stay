import Link from "next/link";
import styles from "./ProfileModal.module.css";
import useSessionDetails from "@/hooks/useSessionDetails";

type ProfileModalProps = {
  firstName?: string;
  lastName?: string;
  points?: number;
  onClose: () => void;
  onRedeemPoints: () => void;
  onLogoutModal: () => void;
};

const profileOptions = [
  {
    label: "Settings",
    link: "/guest/settings?tab=profile",
  },
  { label: "Redeem Points", isRedeem: true },
  { label: "Support", link: "/guest/settings?tab=support" },
  { label: "Logout", isLogout: true },
];

function ProfileModal({
  firstName,
  lastName,
  points,
  onClose,
  onRedeemPoints,
  onLogoutModal,
}: ProfileModalProps) {
  // Compute initials safely

  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <div className={styles.profilemodaldiv}>
      <div className="flex flex-row p-4 gap-2 border-b ">
        <div className={styles.initialsdiv}> {initials.toUpperCase()} </div>
        {/* Name and points stacked */}
        <div className="flex flex-col">
          <p className="text-gray-700 text-sm font-medium">
            {firstName} {lastName}
          </p>
          <span className={styles.pointsdiv}>{points} Points</span>
        </div>
      </div>

      {profileOptions.map((option, i) =>
        option.isRedeem ? (
          <button
            key={i}
            onClick={() => {
              onRedeemPoints(); // open redeem modal
              onClose(); // close dropdown
            }}
            className={`${styles.label} w-full text-left ${i === profileOptions.length - 1 ? styles.logout : ""}`}
          >
            {option.label}
          </button>
        ) : option.isLogout ? (
          <button
            key={i}
            onClick={() => {
              onLogoutModal(); // open redeem modal
              onClose(); // close dropdown
            }}
            className={`${styles.label} w-full text-left ${i === profileOptions.length - 1 ? styles.logout : ""}`}
          >
            {option.label}
          </button>
        ) : option.link ? (
          <Link key={i} href={option.link}>
            <a
              onClick={onClose}
              className={`${styles.label} ${i === profileOptions.length - 1 ? styles.logout : ""}`}
            >
              {option.label}
            </a>
          </Link>
        ) : null
      )}
    </div>
  );
}

export default ProfileModal;
