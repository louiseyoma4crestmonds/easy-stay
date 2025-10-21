import Image from "next/image";
import styles from "./MenuModal.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/atoms/Button";
import { useRouter } from "next/router";

type MenuOption = {
  label: string;
  link?: string;
  isReport?: boolean;
  icon?: string;
};

type MenuModalProps = {
  dropdownClassName?: string;
  buttonClassName?: string;
  leftIcon?: string;
  ImgClass?: string;
  //   onClose: () => void;
  onReportIssue: () => void;
  menuOptions: MenuOption[];
  isLoggedIn?: boolean;
};

function MenuModal({
  dropdownClassName,
  buttonClassName,
  leftIcon,
  ImgClass,
  //   onClose,
  onReportIssue,
  menuOptions,
  isLoggedIn,
}: MenuModalProps) {
  const router = useRouter();
  const handleSignupClick = () => router.push("/signin");
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
                <a
                  onClick={() => setOpen(false)}
                  className={`${styles.label} flex items-center gap-3 `}
                >
                  {option.icon && (
                    <Image
                      src={option.icon}
                      alt={option.label}
                      width={20}
                      height={20}
                    />
                  )}
                  {option.label}
                </a>
              </Link>
            ) : null
          )}
          {!isLoggedIn && (
            <div className=" flex flex-col space-y-4 my-4 px-4 md:hidden ">
              <button className={styles.btn1}>
                <Image
                  src="/images/explore-default.png"
                  width={20}
                  height={20}
                />
                Register your Apartment
              </button>
              <Button
                variant="primary"
                width="full"
                onClick={handleSignupClick}
              >
                Login or Sign Up
              </Button>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuModal;
