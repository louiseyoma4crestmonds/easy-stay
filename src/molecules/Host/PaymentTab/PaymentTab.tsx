import styles from "./PaymentTab.module.css";
import { HOST_MOCK_PAYMENTS, HostPayment } from "src/helpers/dataTypes";
import { useEffect, useState } from "react";
import NoBooking from "@/atoms/NoBooking";

import Pagination from "@/organisms/Pagination";
import PaymentList from "../PaymentList";
import StatsCategory from "@/atoms/StatsCategory";
import { CategoriesProp } from "@/atoms/StatsCategory/StatsCategory";
import PaymentDrawer from "../PaymentDrawer";

import GenerateReport from "../GenerateReport";

const filterOptions = [
  { name: "all", label: "All" },
  { name: "paid", label: "Paid" },
  { name: "pending", label: "Pending" },
  { name: "failed", label: "Failed" },
];

type PaymentTabProps = {
  isMobile?: boolean;
  reportModal: boolean;
  setReportModal(arg: boolean): void;
};

function PaymentTab({
  isMobile,
  setReportModal,
  reportModal,
}: PaymentTabProps) {
  const [loading, setLoading] = useState(true);

  const [payments, setPayments] = useState<HostPayment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<HostPayment | null>(
    null
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // or whatever number you want per page
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filtered bookings based on searchTerm
  // WILL CONSUME API FOR THIS
  // Filter bookings by active tab and search term

  // pagination slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Simulated API response
    setPayments(HOST_MOCK_PAYMENTS);
    setLoading(false);
  }, []);

  const onOpen = (Payment: HostPayment) => {
    setSelectedPayment(Payment);
    setDrawerOpen(true);
    console.log("booking", Payment);
  };

  const categories: CategoriesProp[] = [
    {
      label: "Total Revenue",
      count: 10000000,
      bg: "bg-green-100",
      image: "/images/chart-pie-outline.png",
    },
    {
      label: "Total Transactions",
      count: 1234,
      bg: "bg-primary-100",
      image: "/images/receipt-outline.png",
    },
    {
      label: "Total Pending",
      count: 175000,
      bg: "bg-gray-100",
      image: "/images/chart-line-down-outline.png",
    },
    {
      label: "Total Failed",
      count: 175000,
      bg: "bg-red-100",
      image: "/images/exclamation-outline.png",
    },
  ];

  const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-gray-100 text-gray-900",
    failed: "bg-red-100 text-red-800",
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
      {payments.length > 0 && (
        <StatsCategory categories={categories} isMobile={isMobile} />
      )}

      <div className={styles.bookingdiv}>
        {payments.length > 0 ? (
          <div className="">
            <PaymentList
              payments={currentPayments}
              onOpen={onOpen}
              statusOptions={filterOptions}
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
        {payments.length > 0 && (
          <div className="absolute flex justify-between px-4 py-3 bottom-0 w-full ">
            <div className="text-sm font-semibold ">
              {payments.length > 0 && (
                <>
                  <span className="text-gray-500 ">Showing</span>{" "}
                  <span className="text-gray-900 ">{indexOfFirstItem + 1}</span>
                  –
                  <span className="text-gray-900 ">
                    {Math.min(indexOfLastItem, payments.length)}
                  </span>{" "}
                  <span className="text-gray-500">of</span>{" "}
                  <span className="text-gray-900 ">{payments.length}</span>{" "}
                </>
              )}
            </div>

            <Pagination
              listOfItems={payments}
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

      {selectedPayment && (
        <PaymentDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          payment={selectedPayment}
          statusStyles={statusStyles}
        />
      )}

      {reportModal && <GenerateReport setReportModal={setReportModal} />}
    </div>
  );
}

export default PaymentTab;
