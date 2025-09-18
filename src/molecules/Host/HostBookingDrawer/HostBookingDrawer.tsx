import Image from "next/image";
import styles from "./HostBookingDrawer.module.css";
import { HostBooking } from "src/helpers/dataTypes";

type HostBookingDrawerProps = {
  open: boolean;
  onClose: () => void;
  booking: HostBooking;
  handleCancel: (booking: HostBooking) => void;
  showReviewModal?: () => void;
  setCheckModal: React.Dispatch<React.SetStateAction<"none" | "in" | "out">>;
};

function HostBookingDrawer({
  open,
  booking,
  onClose,
  handleCancel,
  setCheckModal,
}: HostBookingDrawerProps) {
  const statusStyles: Record<string, string> = {
    active: "bg-primary-100 text-primary-800",
    upcoming: "bg-purple-100 text-purple-800",
    past: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const content = () => {
    return (
      <div className="flex md:h-[calc(100%-57px)] flex-col ">
        <div className="md:flex-1 md:overflow-y-auto  md:space-y-4 p-2 md:p-5">
          {/*GUEST INFOMATION*/}
          <div className="flex flex-col border-b py-3 ">
            <p className={`${styles.P1} mb-4 `}>Guest Information</p>
            <div className="flex flex-col md:flex-row items-start md:items-center ">
              <div className="flex flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">Guest Name</p>
                <p className={styles.P2}>{booking.guestName} </p>
              </div>
              <div className="flex flex-col mt-3 md:mt-0 ">
                <p className="text-gray-500 font-normal text-sm ">
                  Phone Number
                </p>
                <p className={styles.P2}>+2347031267197</p>
              </div>
            </div>

            <div className="flex flex-col mt-3 md:mt-2 mb-4 ">
              <p className="text-gray-500 font-normal text-sm ">Email</p>
              <p className={styles.P2}>okeowo.lekan@gmail.com</p>
            </div>

            <div className="flex flex-col mt-3 md:mt-2 mb-4 ">
              <p className="text-gray-500 font-normal text-sm ">
                Extra information
              </p>
              <p className={styles.P2}>nil</p>
            </div>
          </div>

          {/*BOOKING DETAILS*/}
          <div className="flex flex-col border-b py-3 ">
            <p className={`${styles.P1} mb-4 `}>Booking Details</p>
            <div className="flex flex-col md:flex-row items-start md:items-center ">
              <div className="flex flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">
                  Date Booked
                </p>
                <p className={styles.P2}>{booking.dateBooked} </p>
              </div>
              <div className="flex flex-col mt-3 md:mt-0 ">
                <p className="text-gray-500 font-normal text-sm ">
                  Booking Dates
                </p>
                <p className={styles.P2}>{booking.bookingDates} </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  items-start md:items-center my-4 ">
              <div className="fles flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">
                  Number of Days
                </p>
                <p className={styles.P2}>{booking.numberOfDays} </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 font-normal text-sm ">
                  Rates/Night
                </p>
                <p className={styles.P2}>100,0000</p>
              </div>
            </div>
            <div className="flex flex-col mb-4 ">
              <p className="text-gray-500 font-normal text-sm ">Address</p>
              <p className={styles.P2}>{booking.location}</p>
            </div>

            <div className="flex flex-col md:flex-row  items-start md:items-center my-4 ">
              <div className="fles flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">
                  Apartment Booked
                </p>
                <p className="text-base font-medium text-primary-600 underline">
                  Studio{" "}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 font-normal text-sm ">
                  Number of Guests
                </p>
                <p className={styles.P2}>2</p>
              </div>
            </div>
          </div>

          {/*CURRENT STAY INFORMATION*/}
          <div className="flex flex-col border-b py-3 ">
            <p className={`${styles.P1} mb-4 `}>Current Stay Info</p>
            <div className="flex flex-col md:flex-row items-start  md:items-center mb-4 ">
              <div className="flex flex-col w-full md:w-[50%]  ">
                <p className="text-gray-500 font-normal text-sm ">Check In</p>
                <p className={styles.P2}>
                  {booking.status === "upcoming"
                    ? "-"
                    : "07/05/2025 09:17AM"}{" "}
                </p>
              </div>
              <div className="flex flex-col w-full md:w-[35%] mt-3 md:mt-0 ">
                <p className="text-gray-500 font-normal text-sm ">Check Out</p>
                <p className={styles.P2}>
                  {" "}
                  {booking.status === "active" || booking.status === "upcoming"
                    ? "-"
                    : "07/05/2025 09:17AM"}{" "}
                </p>
              </div>
              {booking.status === "active" && (
                <div
                  className="border border-gray-200 px-3 cursor-pointer py-2 rounded-lg flex gap-1 items-center text-sm text-gray-800 "
                  onClick={() => setCheckModal("out")}
                >
                  {" "}
                  <img
                    src="/images/clock-outline.png"
                    alt="img"
                    className="w-3 h-3 "
                  />{" "}
                  Check out
                </div>
              )}
              {booking.status === "upcoming" && (
                <div
                  className="border border-gray-200 px-3 cursor-pointer py-2 rounded-lg flex gap-1 items-center text-sm text-gray-800 "
                  onClick={() => setCheckModal("in")}
                >
                  {" "}
                  <img
                    src="/images/clock-outline.png"
                    alt="img"
                    className="w-3 h-3 "
                  />{" "}
                  Check in
                </div>
              )}
            </div>

            <div className="flex flex-col mb-4 ">
              <p className="text-gray-500 font-normal text-sm ">
                Payment Status
              </p>
              <p className="px-3 py-0.5 rounded-md mt-1 text-xs md:text-sm font-normal w-12 md:w-14 bg-green-100 text-green-800">
                PAID
              </p>
            </div>
          </div>

          {/*REASON FOR CANCELLATION*/}
          {booking.status === "cancelled" && (
            <div className="flex flex-col border-b py-4 ">
              <p className={`${styles.P1} mb-1 `}>Reason for Cancellation</p>

              <p className={styles.P2}>
                {" "}
                I cancelled because, I wont be avalible
              </p>
              <p className="text-gray-500 font-normal text-left md:text-right pt-2 text-sm ">
                07/05/2025 09:17AM
              </p>
            </div>
          )}

          {/* DAYS PROGRESS */}
          {booking.numberOfDays && booking.numberOfDays > 0 && (
            <div className="flex flex-col border-b py-2">
              <div className="">
                {Array.from({ length: booking.numberOfDays }, (_, i) => {
                  const dayNumber = i + 1;

                  // Example logic: all days before today = completed, otherwise upcoming
                  const isCompleted =
                    booking.status === "past" ||
                    (booking.status === "active" && i < 1);

                  return (
                    <div
                      key={dayNumber}
                      className="flex items-center justify-between py-2"
                    >
                      {/* Left side: Image + Day text */}
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            isCompleted
                              ? "/images/completed.png"
                              : "/images/upcoming2.png"
                          }
                          width={24}
                          height={24}
                          alt={`Day ${dayNumber}`}
                        />
                        <p className="text-gray-500 font-normal text-sm ">{`Day ${dayNumber}`}</p>
                      </div>

                      {/* Right side: Status badge */}
                      <span
                        className={`px-3 py-1 text-xs md:text-sm font-normal uppercase rounded-md ${
                          isCompleted
                            ? "bg-green-100 text-green-900"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {isCompleted ? "Completed" : "Upcoming"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/*PAYMENT HISTORY*/}
          <div
            className={`flex flex-col py-3 ${booking.status === "cancelled" ? "border-b" : ""} `}
          >
            <p className={`${styles.P1} mb-4 `}>Payment History</p>

            <div className="flex flex-row justify-between  ">
              <p className="text-gray-500 font-normal text-sm ">
                Total Amount Paid
              </p>
              <p className={styles.P2}> ₦300,000</p>
            </div>
          </div>

          {/*CANCELLATION REFUND*/}
          {booking.status === "cancelled" && (
            <div className="flex flex-row justify-between items-end py-3 ">
              <div className="flex flex-col ">
                <p className={`${styles.P1} mb-4 `}>Refund</p>

                <p className={styles.P2}> 20% REFUND - ₦150,000</p>
                <p className={`${styles.P1}  `}>12/12/2025 - 09:25AM</p>
              </div>
              <div className="flex flex-row items-center gap-4 ">
                <div className="border border-gray-200 w-8 h-8 rounded-lg flex items-center cursor-pointer p-1 justify-center ">
                  <Image src="/images/dwnload.png" width={24} height={24} />
                </div>
                <p className="px-3 py-0.5 rounded-md text-sm font-normal w-14 bg-green-100  text-green-800">
                  PAID
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex justify-between items-center px-5 pt-4 pb-7 border-t ">
          {(booking.status === "active" ||
            booking.status === "upcoming" ||
            booking.status === "past") && (
            <button className={styles.btn1}>
              <Image src="/images/file.png" width={20} height={20} />
              Download Payment Invoice
            </button>
          )}

          {(booking.status === "active" || booking.status === "upcoming") && (
            <button
              className={styles.btn1}
              onClick={() => handleCancel(booking)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel for desktop */}
      <div
        className={`hidden md:flex flex-col  fixed right-0 top-0 z-50 h-full w-full max-w-3xl transform bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="hidden md:flex items-center justify-between border-b px-5 py-4">
          <div className="flex gap-4 ">
            <span className={styles.iddiv}>#{booking.id} </span>
            <span
              className={`px-2 md:px-3 py-0.5 flex items-center rounded-md text-xs md:text-sm font-normal uppercase ${
                statusStyles[booking.status] || "bg-gray-100 text-gray-500"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {content()}
      </div>

      {/* Modal for mobile (smaller than md) */}
      <div
        className={` md:hidden fixed inset-0 z-50 flex items-center justify-center transform transition-transform ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-[87%] max-h-[90vh] bg-white rounded-lg shadow-xl ">
          <div className="flex items-center justify-between border-b px-2 py-4">
            <div className="flex gap-4 ">
              <span className={styles.iddiv}>#{booking.id} </span>
              <span
                className={`px-3 py-0.5 flex items-center rounded-md text-sm font-normal uppercase ${
                  statusStyles[booking.status] || "bg-gray-100 text-gray-500"
                }`}
              >
                {booking.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* {content()} */}
          <div className="flex-1 h-[500px] overflow-y-auto p-2 space-y-4">
            {/* put your booking details, host info, etc. here */}

            {content()}
          </div>

          <div className="flex justify-between items-center px-5 pt-4 pb-7 border-t ">
            <button className={styles.btn1}>
              <Image src="/images/file.png" width={20} height={20} />
            </button>
            {booking.status === "past" && (
              <button className={styles.btn1}>Review Apartment</button>
            )}
            {(booking.status === "active" || booking.status === "upcoming") && (
              <button
                className={styles.btn2}
                onClick={() => handleCancel(booking)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostBookingDrawer;
