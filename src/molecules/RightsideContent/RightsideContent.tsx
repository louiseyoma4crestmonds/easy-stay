import Image from "next/image";
import DateDropdownModal from "../DateDropdownModal";
import styles from "./RightsideContent.module.css";
import { useEffect, useRef, useState } from "react";
import { GuestCounts } from "../HeroSec/HeroSec.types";
import GuestDropdownModal from "@/atoms/GuestDropdownModal";
import { RightsideContentProps } from "./RightsideContent.types";
import Button from "@/atoms/Button";
import Modal from "../Modal";
import StarIcon from "@/atoms/Icons/StarIcon";
import BookingModal from "../BookingModal";

function RightsideContent({ guests }: RightsideContentProps) {
  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        checkinRef.current &&
        !checkinRef.current.contains(event.target as Node)
      ) {
        setCheckinOpen(false);
      }

      if (
        checkoutRef.current &&
        !checkoutRef.current.contains(event.target as Node)
      ) {
        setCheckoutOpen(false);
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(event.target as Node)
      ) {
        setGuestDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBookNow = () => {
    // MAKE API CAL
    setShowBookingSummary(true);
  };

  return (
    <div className=" w-full">
      <div className="bg-white rounded-lg py-5  flex flex-col space-y-6 ">
        {/*CHECKIN*/}
        <div ref={checkinRef} className={styles.checkindiv}>
          <div
            className="flex flex-col"
            onClick={() => {
              setCheckinOpen(true);
              setCheckoutOpen(false);
            }}
          >
            <p className={styles.text}>Check In</p>

            <div className={styles.seconddiv}>
              <Image
                src="/images/calendar2.png"
                alt="calendar icon"
                width={20}
                height={20}
              />
              <span className="text-base text-gray-500 font-normal">
                {checkinDate ? checkinDate.toLocaleDateString() : "DD/MM/YYYY"}
              </span>
            </div>
          </div>

          {checkinOpen && (
            <DateDropdownModal
              initialDate={checkinDate}
              onConfirm={(date) => {
                if (date) setCheckinDate(date);
                setCheckinOpen(false);
              }}
            />
          )}
        </div>

        {/**CHECKOUT*/}
        <div ref={checkoutRef} className={styles.checkindiv}>
          <div
            className="flex flex-col"
            onClick={() => {
              setCheckoutOpen(true);
              setCheckinOpen(false);
            }}
          >
            <p className={styles.text}>Check Out</p>

            <div className={styles.seconddiv}>
              <Image
                src="/images/calendar2.png"
                alt="calendar icon"
                width={20}
                height={20}
              />
              <span className="text-base text-gray-500 font-normal">
                {checkoutDate
                  ? checkoutDate.toLocaleDateString()
                  : "DD/MM/YYYY"}
              </span>
            </div>
          </div>

          {checkoutOpen && (
            <DateDropdownModal
              initialDate={checkoutDate}
              onConfirm={(date) => {
                if (date) setCheckoutDate(date);
                setCheckoutOpen(false);
              }}
            />
          )}
        </div>

        {/* Guest */}
        <div
          ref={guestRef}
          className={`${styles.checkindiv} border-b pb-6 w-full `}
        >
          <div
            className="flex flex-col items-start"
            onClick={() => setGuestDropdownOpen((prev) => !prev)}
          >
            <p className={styles.text}>Guests</p>

            <div className={`${styles.seconddiv} w-full`}>
              <span className="text-base text-gray-400 font-normal">
                {guestCounts.adults === 0 &&
                guestCounts.children === 0 &&
                guestCounts.infants === 0 &&
                guestCounts.pets === 0
                  ? guests
                  : `${guestCounts.adults} Adult${guestCounts.adults > 1 ? "s" : ""}${
                      guestCounts.children > 0
                        ? `, ${guestCounts.children} Child${guestCounts.children > 1 ? "ren" : ""}`
                        : ""
                    }${guestCounts.infants > 0 ? `, ${guestCounts.infants} Infant${guestCounts.infants > 1 ? "s" : ""}` : ""}${
                      guestCounts.pets > 0
                        ? `, ${guestCounts.pets} Pet${guestCounts.pets > 1 ? "s" : ""}`
                        : ""
                    }`}
              </span>
              <span className="text-base text-gray-400 font-normal">
                Guests
              </span>
            </div>
          </div>

          {guestDropdownOpen && (
            <GuestDropdownModal
              // onClose={() => setGuestDropdownOpen(false)}
              onConfirm={(guests) => {
                setGuestCounts(guests);
                setGuestDropdownOpen(false);
              }}
              initialGuests={guestCounts}
            />
          )}
        </div>
        <div className="px-5 ">
          <Button
            variant="primary"
            width="full"
            disabled={!checkinDate || !checkoutDate}
            onClick={handleBookNow}
          >
            Book Now
          </Button>{" "}
        </div>

        <div className="px-5 text-center ">
          <p className="font-normal text-sm text-gray-500 ">
            Save 20% by booking more than 3 nights
          </p>
          <p className="font-bold text-sm text-primary-600 ">₦70,000/Night</p>
        </div>
      </div>
      <div></div>

      {showBookingSummary && (
        <BookingModal
          setShowBookingSummary={setShowBookingSummary}
          showBookingSummary={showBookingSummary}
        />
      )}
    </div>
  );
}

export default RightsideContent;
