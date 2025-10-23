import Image from "next/image";
import DateDropdownModal from "../DateDropdownModal";
import styles from "./RightsideContent.module.css";
import { useEffect, useRef, useState } from "react";
import { GuestCounts } from "../HeroSec/HeroSec.types";
import GuestDropdownModal from "@/atoms/GuestDropdownModal";
import { RightsideContentProps } from "./RightsideContent.types";
import Button from "@/atoms/Button";
import Modal from "../Modal";
import BookingModal from "../BookingModal";
import Calendar from "../Calendar";
import { useRouter } from "next/router";
import PaymentMethods from "@/organisms/PaymentMethods";

function RightsideContent({
  guests,
  apartment,
  price,
  isLoggedIn,
  isMobile,
}: RightsideContentProps) {
  const router = useRouter();
  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showChoosePaymentMethod, setShowChoosePaymentMethod] =
    useState<boolean>(false);
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [amount, setAmount] = useState<any>(1);

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

  // const handleBookNow = () => {
  //   // MAKE API CAL
  //   setShowBookingSummary(true);
  // };

  const handleBookNow = () => {
    // MAKE API CAL
    if (!isLoggedIn) {
      setShowAuthModal(true); // show sign-in/sign-up modal
      return; // stop here, don’t proceed to booking
    }

    // Proceed with booking if logged in
    setShowBookingSummary(true);
  };

  const handleSigninClick = () => {
    setShowAuthModal(false);
    router.push("/signin");
  };

  const handleSignupClick = () => {
    setShowAuthModal(false);
    router.push("/signup");
  };

  return (
    <div className=" w-full">
      <div className="  bg-white rounded-lg py-5  flex flex-col space-y-6 ">
        {/*CHECKIN*/}
        <div ref={checkinRef} className={styles.checkindiv}>
          <div
            className="flex flex-col"
            onClick={() => {
              setCheckinOpen((prev) => !prev);
              // setCheckinOpen(true);
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
            <Calendar
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
              setCheckoutOpen((prev) => !prev);
              // setCheckinOpen(true);
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
            <Calendar
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

            <div className={`${styles.seconddiv} py-10 w-full`}>
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
        <div className="px-5  ">
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
          <p className="font-bold text-sm text-primary-600 ">
            ₦{(80 / 100) * price}/Night
          </p>
        </div>
      </div>
      <div className="hidden md:block relative mt-6 ">
        <Image src="/images/0.png" alt="bg-img" width={322} height={344} />
        <div className={styles.giftdiv}>
          <Image
            src="/images/gift-boxes.png"
            alt="giftboxes"
            width={153}
            height={153}
          />

          <p className={styles.text2}>Book & Be Rewarded!</p>
          <p className={styles.text3}>
            {" "}
            Earn reward points with every apartment booking. These points can be
            redeemed for incredible benefits, including a free apartment stay or
            even free airport transport. It's simple: the more you book, the
            more you save!
          </p>
        </div>
      </div>

      {showBookingSummary && (
        <BookingModal
          setShowBookingSummary={setShowBookingSummary}
          apartment={apartment}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          showBookingSummary={showBookingSummary}
          setBookingSuccessModal={setBookingSuccessModal}
          setShowChoosePaymentMethod={setShowChoosePaymentMethod}
          setAmountToPay={setAmount}
          isMobile={isMobile}
        />
      )}

      {bookingSuccessModal && (
        <Modal
          isOpen
          onClose={() => setBookingSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 "> Booking Successful</div>
        </Modal>
      )}

      {showChoosePaymentMethod && (
        <Modal
          isOpen
          onClose={() => setShowChoosePaymentMethod(false)}
          imageUrl=""
          title="Payment Method"
          width={48}
          height={48}
          modalcontent={""}
        >
          <div className="pt-3 ">
            <PaymentMethods
              checkinDate={checkinDate}
              checkoutDate={checkoutDate}
              apartment={apartment}
              amount={amount}
            />
          </div>
        </Modal>
      )}

      {showAuthModal && (
        <Modal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          imageUrl="/images/house-info.png"
          width={96}
          height={96}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-500 text-sm py-5 px-8 text-center ">
              Your new apartment awaits! Sign in or sign up to complete your
              booking.
            </p>
            <div className="flex justify-center items-center mb-4 gap-5 px-4 ">
              <Button
                variant="profile"
                width="full"
                onClick={handleSigninClick}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                width="full"
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RightsideContent;
