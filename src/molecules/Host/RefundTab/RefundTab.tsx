import styles from "./RefundTab.module.css";
import { HOST_MOCK_REFUNDS, HostPayment } from "src/helpers/dataTypes";
import { useEffect, useRef, useState } from "react";
import NoBooking from "@/atoms/NoBooking";

import Pagination from "@/organisms/Pagination";
import PaymentList from "../PaymentList";
import StatsCategory from "@/atoms/StatsCategory";
import { CategoriesProp } from "@/atoms/StatsCategory/StatsCategory";
import Modal from "@/molecules/Modal";
import Calendar from "@/molecules/Calendar";
import Button from "@/atoms/Button";
import RefundDrawer from "../RefundDrawer";

const RefundfilterOptions = [
  { name: "all", label: "All" },
  { name: "completed", label: "Completed" },
  { name: "approved", label: "Approved" },
  { name: "pending", label: "Pending" },
  { name: "rejected", label: "Rejected" },
];

type RefundTabProps = {
  isMobile?: boolean;
  showModal: "none" | "reject" | "approve" | "success";
  setShowModal: React.Dispatch<
    React.SetStateAction<"none" | "reject" | "approve" | "success">
  >;
  reportModal: boolean;
  setReportModal(arg: boolean): void;
};

function RefundTab({
  isMobile,
  showModal,
  setShowModal,
  reportModal,
  setReportModal,
}: RefundTabProps) {
  const [loading, setLoading] = useState(true);

  const [refunds, setRefunds] = useState<HostPayment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRefund, setSelectedRefund] = useState<HostPayment | null>(
    null
  );
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDateDropdown, setFromDateDropdown] = useState(false);
  const [toDateDropdown, setToDateDropdown] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [selectedReason, setSelectedReason] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  // or whatever number you want per page
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fromDateRef = useRef<HTMLDivElement>(null);
  const toDateRef = useRef<HTMLDivElement>(null);
  const fromCalendarRef = useRef<HTMLDivElement>(null);
  const toCalendarRef = useRef<HTMLDivElement>(null);

  // Filtered bookings based on searchTerm
  // WILL CONSUME API FOR THIS
  // Filter bookings by active tab and search term

  // pagination slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = refunds.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Simulated API response
    setRefunds(HOST_MOCK_REFUNDS);
    setLoading(false);
  }, []);

  const onOpen = (Payment: HostPayment) => {
    setSelectedRefund(Payment);
    setDrawerOpen(true);
    console.log("booking", Payment);
  };

  const categories: CategoriesProp[] = [
    {
      label: "Total Refunds",
      count: 97600000,
      bg: "bg-primary-100",
      image: "/images/chart-pie-outline.png",
    },
    {
      label: " Transactions Refunds",
      count: 12,
      bg: "bg-primary-100",
      image: "/images/receipt-outline.png",
    },
    {
      label: " Pending Refunds",
      count: 105000,
      bg: "bg-gray-100",
      image: "/images/chart-line-down-outline.png",
    },
    {
      label: " Completed Refunds",
      count: 175000,
      bg: "bg-green-100",
      image: "/images/cash-outline.png",
    },
  ];

  const statusStyles: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    approved: "bg-primary-100 text-green-800",
    pending: "bg-gray-100 text-gray-900",
    rejected: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;

      const clickedOutsideFrom =
        fromDateRef.current &&
        !fromDateRef.current.contains(t) &&
        (!fromCalendarRef.current || !fromCalendarRef.current.contains(t));

      const clickedOutsideTo =
        toDateRef.current &&
        !toDateRef.current.contains(t) &&
        (!toCalendarRef.current || !toCalendarRef.current.contains(t));

      if (clickedOutsideFrom) setFromDateDropdown(false);
      if (clickedOutsideTo) setToDateDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position the portal under the trigger button
  const toggleFromDateDropdown = () => {
    if (fromDateRef.current) {
      const rect = fromDateRef.current.getBoundingClientRect();
      setPortalPos({
        top: rect.bottom + window.scrollY + 4, // +4px gap
        left: rect.left + window.scrollX - 0,
      });
    }
    setFromDateDropdown((prev) => !prev);
  };

  // Position the portal under the trigger button
  const toggleToDateDropdown = () => {
    if (toDateRef.current) {
      const rect = toDateRef.current.getBoundingClientRect();
      setPortalPos({
        top: rect.bottom + window.scrollY + 4, // +4px gap
        left: rect.left + window.scrollX - 0,
      });
    }
    setToDateDropdown((prev) => !prev);
  };

  const proceedToApprove = async () => {
    try {
      // Example API call
      // await api.cancelBooking({ bookingId: selectedBooking?.id });

      console.log("approve successfully!");
      setActionType("approve");
      setShowModal("success");
      //   setCancelStep("success"); // show success modal
    } catch (error) {
      console.error("Error cancelling booking:", error);
      // optionally show toast or error modal
    }
  };

  const proceedToReject = async () => {
    try {
      // Example API call
      // await api.cancelBooking({ bookingId: selectedBooking?.id });

      console.log("reject successfully!");
      setActionType("reject");
      setShowModal("success");
      //   setCancelStep("success"); // show success modal
    } catch (error) {
      console.error("Error cancelling booking:", error);
      // optionally show toast or error modal
    }
  };

  if (loading) {
    // FULL-PAGE loader (inside AppLayout but above all content)
    return (
      <div className="flex items-center justify-center h-full">
        <img src="/icons/nobg-spinner.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col flex-1 ">
      {refunds.length > 0 && (
        <StatsCategory categories={categories} isMobile={isMobile} />
      )}

      <div className={styles.bookingdiv}>
        {refunds.length > 0 ? (
          <div className="">
            <PaymentList
              payments={currentPayments}
              onOpen={onOpen}
              statusOptions={RefundfilterOptions}
              statusStyles={statusStyles}
            />{" "}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full ">
            <NoBooking
              isMobile={isMobile}
              type="host"
              title="No transactions yet"
              desc=" It looks like you have no booking yet. Ensure you have added an apartment."
            />{" "}
          </div>
        )}
        {refunds.length > 0 && (
          <div className="absolute flex justify-between px-4 py-3 bottom-0 w-full ">
            <div className="text-sm font-semibold ">
              {refunds.length > 0 && (
                <>
                  <span className="text-gray-500 ">Showing</span>{" "}
                  <span className="text-gray-900 ">{indexOfFirstItem + 1}</span>
                  –
                  <span className="text-gray-900 ">
                    {Math.min(indexOfLastItem, refunds.length)}
                  </span>{" "}
                  <span className="text-gray-500">of</span>{" "}
                  <span className="text-gray-900 ">{refunds.length}</span>{" "}
                </>
              )}
            </div>

            <Pagination
              listOfItems={refunds}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
              prevButton={
                <img
                  src="/images/chevron-left.png"
                  alt="Previous"
                  className="w-5 h-5 "
                />
              }
              nextButton={
                <img
                  src="/images/chevron-right-svg.svg"
                  alt="next"
                  className="w-5 h-5 "
                />
              }
              paginationDivActiveClass="bg-primary-100 text-primary-600 "
            />
          </div>
        )}{" "}
      </div>

      {selectedRefund && (
        <RefundDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          payment={selectedRefund}
          statusStyles={statusStyles}
          setShowModal={setShowModal}
        />
      )}

      {showModal === "approve" && (
        <Modal
          isOpen
          onClose={() => setShowModal("none")}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div className="py-4 flex flex-col items-center ">
            <p className="text-lg font-semibold text-gray-800 ">
              Approve Refund
            </p>
            <p className="text-gray-500 font-normal text-sm ">
              Are you sure you want to approve this refund?
            </p>
            <div className="flex md:pt-6 gap-4  ">
              <Button variant="profile" onClick={() => setShowModal("none")}>
                Cancel
              </Button>

              <Button variant="primary" onClick={proceedToApprove}>
                Proceed
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === "reject" && (
        <Modal
          isOpen
          onClose={() => setShowModal("none")}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div className="py-4 flex flex-col items-center ">
            <p className="text-lg font-semibold text-gray-800 ">
              Reject Refund
            </p>
            <p className="text-gray-500 font-normal text-sm ">
              Are you sure you want to reject this refund?
            </p>
            <div className="flex md:pt-6 gap-4  ">
              <Button variant="profile" onClick={() => setShowModal("none")}>
                Cancel
              </Button>

              <Button variant="delete" onClick={proceedToReject}>
                Reject
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === "success" && (
        <Modal
          isOpen
          onClose={() => setShowModal("none")}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div className="pt-3 pb-5 text-gray-900 text-lg font-semibold ">
            {actionType === "reject"
              ? "Rejected Successfully"
              : "Approved Successfully"}
          </div>
        </Modal>
      )}

      {reportModal && (
        <Modal
          isOpen
          onClose={() => setReportModal(false)}
          title="Generate Report"
          modalcontent={styles.modalContent2}
        >
          <div className="py-4 ">
            <div className="flex items-center gap-4 justify-between border-b border-gray-100 py-2 md:pt-3 md:pb-5 ">
              <div className="flex flex-col w-full ">
                <label className="text-gray-900 font-medium text-sm mb-1 ">
                  From
                </label>
                <div ref={fromDateRef} className={styles.checkoutdiv}>
                  <div className="" onClick={toggleFromDateDropdown}>
                    <div className={styles.seconddiv}>
                      <img
                        src="/images/calendar-day-outline.png"
                        alt="calendar icon"
                        className="w-5 h-5"
                      />
                      <span className="text-xs md:text-base text-gray-500 font-medium">
                        {fromDate
                          ? fromDate.toLocaleDateString()
                          : "DD/MM/YYYY"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Portal dropdown */}
              {fromDateDropdown && (
                <div
                  ref={fromCalendarRef}
                  className="fixed z-50"
                  style={{ top: portalPos.top, left: portalPos.left }}
                >
                  <Calendar
                    initialDate={fromDate}
                    onConfirm={(date) => {
                      if (date) setFromDate(date);
                      setFromDateDropdown(false);
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col w-full ">
                <label className="text-gray-900 font-medium text-sm mb-1 ">
                  To
                </label>
                <div ref={toDateRef} className={styles.checkoutdiv}>
                  <div className="" onClick={toggleToDateDropdown}>
                    <div className={styles.seconddiv}>
                      <img
                        src="/images/calendar-day-outline.png"
                        alt="calendar icon"
                        className="w-5 h-5"
                      />
                      <span className="text-xs md:text-base text-gray-500 font-medium">
                        {toDate ? toDate.toLocaleDateString() : "DD/MM/YYYY"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {toDateDropdown && (
                <div
                  ref={toCalendarRef}
                  className="fixed z-50"
                  style={{ top: portalPos.top, left: portalPos.left }}
                >
                  <Calendar
                    initialDate={toDate}
                    onConfirm={(date) => {
                      if (date) setToDate(date);
                      setToDateDropdown(false);
                    }}
                  />
                </div>
              )}
            </div>
            <p className="text-gray-500 font-normal text-sm md:pt-6 ">
              Export as
            </p>
            <div className="flex flex-row items gap-x-4 ">
              {["CSV", "PDF", "XLS"].map((item) => {
                const isChecked = selectedReason === item;
                return (
                  <div key={item} className="flex items-center gap-1.5 my-3">
                    {/* Hidden input for accessibility */}
                    <input
                      type="radio"
                      name="cancelReason"
                      value={item}
                      checked={isChecked}
                      onChange={() => setSelectedReason(item)}
                      className="hidden"
                    />

                    {/* Custom radio UI */}
                    <span
                      onClick={() => {
                        setSelectedReason(item);
                        // setErrorMsg("");
                      }}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer transition
          ${isChecked ? "border-blue-600" : "border-gray-400 bg-gray-50 "}`}
                    >
                      {isChecked && (
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                      )}
                    </span>

                    {/* Label */}
                    <span className="text-gray-800 font-normal text-sm">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end md:pt-6 gap-4 border-t border-gray-100 ">
              <Button variant="profile" onClick={() => setReportModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">Generate</Button>{" "}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RefundTab;
