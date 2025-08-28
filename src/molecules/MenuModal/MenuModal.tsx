import Image from "next/image";
import styles from "./MenuModal.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type MenuModalProps = {
  dropdownClassName?: string;
  buttonClassName?: string;
  leftIcon?: string;
  ImgClass?: string;
  //   onClose: () => void;
  onReportIssue: () => void;
};

const menuOptions = [
  {
    label: "Register Your Apartment",
    link: "/guest/register-your-apartment",
  },
  { label: "How it Works", link: "/guest/how-it-works" },
  { label: "Report an Issue", isReport: true },
  { label: "About Us", link: "/guest/about-us" },
  { label: "FAQs", link: "/guest/faqs" },
];

function MenuModal({
  dropdownClassName,
  buttonClassName,
  leftIcon,
  ImgClass,
  //   onClose,
  onReportIssue,
}: MenuModalProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative" ref={dropdownRef}>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setOpen((prev) => !prev)}
      >
        {leftIcon && (
          <img src={leftIcon} alt="Left icon" className={ImgClass} />
        )}
      </button>

      {open && (
        <div className={dropdownClassName}>
          {menuOptions.map((option, i) =>
            option.isReport ? (
              <button
                key={i}
                onClick={() => {
                  onReportIssue(); // open redeem modal
                  setOpen(false); // close dropdown
                }}
                className={`${styles.label} w-full text-left `}
              >
                {option.label}
              </button>
            ) : option.link ? (
              <Link key={i} href={option.link}>
                <a onClick={() => setOpen(false)} className={styles.label}>
                  {option.label}
                </a>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default MenuModal;
