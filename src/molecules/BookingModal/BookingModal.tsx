import Image from "next/image";
import styles from "./BookingModal.module.css";
import { BookingModalProps } from "./BookingModal.types";
import Modal from "../Modal";
import Button from "@/atoms/Button";
import Link from "next/link";
import { useState } from "react";

function BookingModal(props: BookingModalProps) {
  const {
    showBookingSummary,
    apartment,
    checkinDate,
    checkoutDate,
    setShowBookingSummary,
    setBookingSuccessModal,
    isMobile,
  } = props;

  const [agreed, setAgreed] = useState(false);

  const handlePayNow = () => {
    // API CALL

    setShowBookingSummary(false);
    setBookingSuccessModal(true);
  };

  return (
    <Modal
      isOpen={showBookingSummary}
      onClose={() => setShowBookingSummary(false)}
      title="Book Apartment"
      modalcontent={styles.modalContent}
    >
      <div className="w-full ">
        <div className="px-5 mt-40 ">
          <div className={styles.firstdiv}>
            <div className="flex items-center ">
              <Image
                src="/images/sample-image.png"
                alt="sample-img"
                width={isMobile ? 363 : 88}
                height={isMobile ? 140 : 73}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row items-center gap-2 mb-1 md:mb-0">
                <p className="text-gray-900 font-medium text-base ">
                  {apartment.name}
                </p>
                <div>
                  <Image src="/images/little-star.png" width={16} height={16} />
                  <span className="text-gray-400 ml-0.5 font-normal text-sm ">
                    {apartment.rating}
                  </span>
                </div>
              </div>
              <div className="text-primary-600 font-bold text-sm ">
                ₦{apartment.price}/Night
              </div>
              <div className="flex flex-row items-center gap-2 my-1 md:my-0  ">
                <p className="bg-gray-100 px-3 mt-1 rounded-md text-gray-900 font-medium text-sm ">
                  {" "}
                  {apartment.type.name}
                </p>
                <p className="bg-gray-100 px-3  mt-1 rounded-md text-gray-900 font-medium text-sm ">
                  {" "}
                  {apartment.number_off_allowed_infants +
                    apartment.number_off_allowed_adults +
                    apartment.number_off_allowed_children +
                    apartment.number_off_allowed_pets}{" "}
                  Guests
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-4 border-y  ">
            <p className={styles.text}>Address</p>
            <p className={styles.text2}>{apartment.address}</p>
          </div>

          <div className="flex flex-row justify-between items-center py-4 border-b ">
            <div className="flex flex-row w-[50%] items-center gap-3 ">
              <Image
                src="/images/checkin-icon.png"
                alt="checkin-icon"
                width={isMobile ? 32 : 48}
                height={isMobile ? 32 : 48}
              />
              <div className="flex flex-col ">
                <p className={styles.text}>Check In Time</p>
                <p className={styles.text2}>
                  {apartment.expected_checkin_time}{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-row w-[50%] items-center gap-3 ">
              <Image
                src="/images/checkout-icon.png"
                alt="checkout-icon"
                width={isMobile ? 32 : 48}
                height={isMobile ? 32 : 48}
              />
              <div className="flex flex-col ">
                <p className={styles.text}>Check Out Time</p>
                <p className={styles.text2}>
                  {apartment.expected_checkout_time}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between py-4 border-b ">
            <div className="flex flex-row  items-center gap-3 ">
              <Image
                src="/images/calendar3.png"
                alt="calendar"
                width={isMobile ? 32 : 48}
                height={isMobile ? 32 : 48}
              />
              <div className="flex flex-col ">
                <p className={styles.text}>Number of days</p>
                <p className={styles.text2}>
                  {(checkoutDate - checkinDate) / (3600000 * 24)}{" "}
                </p>
              </div>
            </div>
            <button
              className={styles.btn}
              onClick={() => setShowBookingSummary(false)}
            >
              Edit
            </button>
          </div>

          <div className="flex flex-col space-y-2 py-4 border-b  ">
            <p className={styles.text}>Payment Summary</p>
            <div className="flex flex-row justify-between items-center ">
              <p className={styles.text}>
                Booking (₦{apartment.price} x{" "}
                {(checkoutDate - checkinDate) / (3600000 * 24)})
              </p>
              <p className={styles.text3}>
                ₦
                {(apartment.price * (checkoutDate - checkinDate)) /
                  (3600000 * 24)}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center py-4 border-b">
            <p className={styles.text}>VAT (7.5%)</p>
            <p className={styles.text3}>
              ₦
              {(7.5 / 100) *
                ((apartment.price * (checkoutDate - checkinDate)) /
                  (3600000 * 24))}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-5 border-b">
          <p className="text-gray-800 font-semibold text-base ">Total Amount</p>
          <p className={styles.text3}>
            ₦
            {(7.5 / 100) *
              ((apartment.price * (checkoutDate - checkinDate)) /
                (3600000 * 24)) +
              (apartment.price * (checkoutDate - checkinDate)) / (3600000 * 24)}
          </p>
        </div>

        <div className="flex flex-col  md:flex-row justify-between items-center py-4 px-5 ">
          <label className="flex items-center gap-2 w-full md:w-[70%] text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-primary-600 cursor-pointer mr-2 "
            />
            <span>
              I have read and agree to EasyStay’s{" "}
              <Link href="/termsOfService" target="_blank">
                <a className="text-blue-600 underline">Terms & Conditions</a>
              </Link>
              ,{" "}
              <Link href="/privacy-policy" target="_blank">
                <a className="text-primary-600 underline">Privacy Policy</a>
              </Link>{" "}
              and{" "}
              <Link href="/cookies-policy" target="_blank">
                <a className="text-primary-600 underline">Cookies Policy</a>
              </Link>
              .
            </span>
          </label>
          <div className="w-full mt-2 md:mt-0 md:w-auto ">
            <Button
              variant="primary"
              width="full"
              disabled={!agreed}
              onClick={handlePayNow}
            >
              Pay Now
            </Button>{" "}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BookingModal;
