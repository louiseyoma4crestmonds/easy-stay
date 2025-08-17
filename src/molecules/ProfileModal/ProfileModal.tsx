import Link from "next/link";
import styles from "./ProfileModal.module.css";

type ProfileModalProps = {
  firstName?: string;
  lastName?: string;
  points?: number;
};

const profileOptions = [
  {
    label: "Settings",
    link: "/customer/settings?tab=profile",
  },
  { label: "Redeem Points", link: "/customer/how-it-works" },
  { label: "Support", link: "/country/france" },
  { label: "Logout", link: "/customer/about-us" },
];

function ProfileModal({ firstName, lastName, points }: ProfileModalProps) {
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

      {profileOptions.map((option, i) => (
        <Link key={i} href={option.link}>
          <a
            className={`${styles.label} ${i === profileOptions.length - 1 ? styles.logout : ""}`}
          >
            {option.label}
          </a>
        </Link>
      ))}
    </div>
  );
}

export default ProfileModal;
