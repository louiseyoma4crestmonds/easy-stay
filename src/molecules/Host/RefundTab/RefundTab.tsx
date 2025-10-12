import styles from "./RefundTab.module.css";
import { HOST_MOCK_REFUNDS, HostPayment } from "src/helpers/dataTypes";
import { useEffect, useState } from "react";
import NoBooking from "@/atoms/NoBooking";

import Pagination from "@/organisms/Pagination";
import PaymentList from "../PaymentList";
import StatsCategory from "@/atoms/StatsCategory";
import { CategoriesProp } from "@/atoms/StatsCategory/StatsCategory";
import Modal from "@/molecules/Modal";
import Button from "@/atoms/Button";
import RefundDrawer from "../RefundDrawer";
import GenerateReport from "../GenerateReport";

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  // or whatever number you want per page
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

      {reportModal && <GenerateReport setReportModal={setReportModal} />}
    </div>
  );
}

export default RefundTab;
