import Router from "next/router";
import Image from "next/future/image";
import Button from "@/atoms/Button";
import { HeroSecProps } from "./HeroSec.types";
import styles from "./HeroSec.module.css";
import logo from "public/images/hero-img.png";
import logoText from "public/images/Text.png";

function HeroSec(props: HeroSecProps) {
  const { userDetails, userAuthenticated } = props;

  return (
    <div className={styles.heroSection}>
      <Image src={logo} alt="hero section img" />
      {/* top header section */}
      <div className="absolute top-8 left-0 right-0 z-20 flex justify-between items-center mx-12 ">
        <div
          className="h-12 w-auto"
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            Router.push({ pathname: "/" });
          }}
          onClick={() => {
            Router.push({ pathname: "/" });
          }}
        >
          <Image src={logoText} height={100} width={120} alt="Easy Stay Logo" />
        </div>

        {userAuthenticated ? (
          <div className="text-white flex gap-x-8">
            <div>Explore</div>
            <div>My Bookings</div>
            <div>Saved</div>
          </div>
        ) : (
          <div />
        )}

        {userAuthenticated ? (
          <div className="text-white">Hi, {userDetails.lastName}</div>
        ) : (
          <div className="flex justify-between items-center gap-2">
            <div className="border border-gray-300 rounded-lg bg-[#00000033] p-[10px] ">
              <img
                src="/images/menu.png"
                alt="menu Logo"
                className="w-5 h-5 "
              />
            </div>
            <Button
              onClick={() => {
                Router.push({ pathname: "/signin" });
              }}
              variant="primary"
            >
              Login or Sign Up
            </Button>
          </div>
        )}
      </div>
      {/* hero modal */}
      <div className={styles.heromodal}>
        <p className={styles.heroP1}>
          Find Your Perfect Shortlet, Anytime, Anywhere.
        </p>
        <div className={styles.heroSearchdiv}>
          {/* location segment */}
          <div className="flex flex-row gap-2 w-[40%] border-r border-gray-300">
            <img
              src="/images/location-icon.png"
              alt="location icon"
              className="w-6 h-6"
            />
            <div className="flex flex-col items-start ">
              <p className="font-medium text-sm text-white">Where</p>
              <p className="text-sm text-gray-200 font-normal">
                Search Destination
              </p>
            </div>
          </div>

          {/* check in */}
          <div className="flex flex-col  w-[15%] border-r border-gray-300">
            <p className="font-medium text-sm text-white">Check In</p>

            <div className="flex flex-row items-center gap-1">
              <img
                src="/images/calendar-month-outline.png"
                alt="calendar icon"
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-200 font-normal">
                Select Date
              </span>
            </div>
          </div>

          {/* check out */}
          <div className="flex flex-col w-[15%] border-r border-gray-300">
            <p className="font-medium text-sm text-white">Check Out</p>

            <div className="flex flex-row items-center gap-1">
              <img
                src="/images/calendar-month-outline.png"
                alt="calendar icon"
                className="w-4 h-4"
              />

              <span className="text-sm text-gray-200 font-normal">
                Select Date
              </span>
            </div>
          </div>

          {/* Guest */}
          <div className="flex flex-col w-[25%] ">
            <p className="font-medium text-sm text-white">Guests</p>

            <div className="flex flex-row items-center gap-1">
              <img
                src="/images/users-group-outline.png"
                alt="guest icon"
                className="w-4 h-4"
              />

              <span className="text-sm text-gray-200 font-normal">
                Add Guests
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSec;
