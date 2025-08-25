import Image from "next/image";
import styles from "./BookingModal.module.css";
import { BookingModalProps } from "./BookingModal.types";
import Modal from "../Modal";

function BookingModal(props: BookingModalProps) {
  const { showBookingSummary, setShowBookingSummary } = props;

  return (
    <Modal
      isOpen={showBookingSummary}
      onClose={() => setShowBookingSummary(false)}
      title="Book Apartment"
      modalcontent={styles.modalContent}
    >
      <div className="w-full ">
        <div className={styles.firstdiv}>
          <div className=" ">
            <Image
              src="/images/sample-image.png"
              alt="sample-img"
              width={88}
              height={73}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row items-center gap-2 ">
              <p className="text-gray-900 font-medium text-base ">
                Luxury Suite, Lekki
              </p>
              <div>
                <Image src="/images/little-star.png" width={16} height={16} />
                <span className="text-gray-400 ml-0.5 font-normal text-sm ">
                  4.4
                </span>
              </div>
            </div>
            <div className="text-primary-600 font-bold text-sm ">
              ₦100,000/Night
            </div>
            <div className="flex flex-row items-center gap-2 ">
              <p className="bg-gray-100 px-3 mt-1 rounded-md text-gray-900 font-medium text-sm ">
                {" "}
                2 Bedrooms
              </p>
              <p className="bg-gray-100 px-3  mt-1 rounded-md text-gray-900 font-medium text-sm ">
                {" "}
                2 Guests
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 border-y  ">
          <p className={styles.text}>Address</p>
          <p className={styles.text2}>
            2715 Ash Dr. San Jose, South Dakota 83475
          </p>
        </div>

        <div className="flex flex-row justify-between items-center py-4 border-b ">
          <div className="flex flex-row w-[50%] items-center gap-3 ">
            <Image
              src="/images/checkin-icon.png"
              alt="checkin-icon"
              width={48}
              height={48}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Check In Time</p>
              <p className={styles.text2}>11:00 </p>
            </div>
          </div>
          <div className="flex flex-row w-[50%] items-center gap-3 ">
            <Image
              src="/images/checkout-icon.png"
              alt="checkout-icon"
              width={48}
              height={48}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Check Out Time</p>
              <p className={styles.text2}>16:00 </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between py-4 border-b ">
          <div className="flex flex-row  items-center gap-3 ">
            <Image
              src="/images/calendar3.png"
              alt="calendar"
              width={48}
              height={48}
            />
            <div className="flex flex-col ">
              <p className={styles.text}>Number of days</p>
              <p className={styles.text2}>2 </p>
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
            <p className={styles.text}>Booking (₦100,000 x 3)</p>
            <p className={styles.text3}>₦300,000</p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center py-4 border-b">
          <p className={styles.text}>VAT (7.5%)</p>
          <p className={styles.text3}>₦11,250</p>
        </div>

        <div className="flex flex-row justify-between items-center py-4 border-b">
          <p className="text-gray-800 font-semibold text-base ">Total Amount</p>
          <p className={styles.text3}>₦311,250</p>
        </div>
      </div>
    </Modal>
  );
}

export default BookingModal;
