import Image from "next/image";
import { HostCommission, HostPayment } from "src/helpers/dataTypes";
import styles from "./ComsDrawer.module.css";
import Tooltip from "@/atoms/Tooltip";

type ComsDrawerProps = {
  open: boolean;
  onClose: () => void;
  commissions: HostCommission;
  statusStyles: Record<string, string>;
};

function ComsDrawer({
  commissions,
  open,
  onClose,
  statusStyles,
}: ComsDrawerProps) {
  const content = () => {
    return (
      <div className="flex md:h-[calc(100%-80px)] flex-col ">
        <div className="md:flex-1 md:overflow-y-auto  md:space-y-1 p-2 md:p-5">
          {/* */}
          <div className="flex flex-col ">
            <div className="flex flex-col md:flex-row items-start md:items-center ">
              <div className="flex flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">
                  Booking ID{" "}
                </p>
                <p className="text-primary-600 underline font-medium text-sm md:text-base">
                  {" "}
                  {commissions.id}{" "}
                </p>
              </div>
              <div className="flex flex-col mt-3 md:mt-2 mb-4 ">
                <p className="text-gray-500 font-normal text-sm ">Date Paid</p>
                <p className={styles.P2}>12/12/2025 </p>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex flex-col ">
            <div className="flex flex-col md:flex-row items-start md:items-center ">
              <div className="flex flex-col w-full md:w-[50%] ">
                <p className="text-gray-500 font-normal text-sm ">
                  Booking Amount
                </p>
                <p className={styles.P2}>{commissions.bookingAmount} </p>
              </div>
              <div className="flex flex-col mt-3 md:mt-2 mb-4 ">
                <p className="text-gray-500 font-normal text-sm ">
                  Commission Rate
                </p>
                <p className={styles.P2}>{commissions.comRate}</p>
              </div>
            </div>
          </div>

          {/* */}
          <div className="flex flex-col   ">
            <div className="flex flex-col md:flex-row items-start md:items-center ">
              <div className="flex flex-col mt-3 md:mt-2 mb-4 w-full md:w-[50%]  ">
                <p className="text-gray-500 font-normal text-sm ">
                  {" "}
                  Commission Earned
                </p>
                <p className={styles.P2}>{commissions.comEarned} </p>
              </div>
              <div className="flex flex-col ">
                <p className="text-gray-500 font-normal text-sm ">
                  Payment Status
                </p>

                <p
                  className={`px-3 py-0.5 inline-flex items-center rounded-md text-sm uppercase whitespace-nowrap w-auto max-w-max font-normal  ${
                    statusStyles[commissions.status] ||
                    "bg-gray-100 text-gray-500"
                  }`}
                >
                  {commissions.status}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-between items-center px-5 pt-4 pb-7 border-t ">
          <button className={styles.btn1}>
            <Image src="/images/file.png" width={20} height={20} />
            Download Invoice
          </button>
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
        <div className="hidden md:flex items-center justify-between border-b px-5 pt-8 pb-5">
          <div className="flex gap-4 ">
            <span className={styles.iddiv}>#{commissions.id} </span>
            <span
              className={`px-2 md:px-3 py-0.5 flex items-center rounded-md text-xs md:text-sm font-normal uppercase ${
                statusStyles[commissions.status] || "bg-gray-100 text-gray-500"
              }`}
            >
              {commissions.status}
            </span>
          </div>

          <div className="flex flex-row items-center gap-x-3 ">
            <Tooltip content="">
              <div className={styles.tooltipDiv}>
                <img
                  src="/images/printer-outline.png"
                  alt="img"
                  className="w-5 h-5 "
                />
              </div>
            </Tooltip>

            <button
              onClick={onClose}
              className=" text-gray-500 "
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
        </div>

        {content()}

        {/* {content()} */}
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
              <span className={styles.iddiv}>#{commissions.id} </span>
              <span
                className={`px-3 py-0.5 flex items-center rounded-md text-sm font-normal uppercase ${
                  statusStyles[commissions.status] ||
                  "bg-gray-100 text-gray-500"
                }`}
              >
                {commissions.status}
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
          <div className="  ">
            {/* put your booking details, host info, etc. here */}

            {content()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComsDrawer;
