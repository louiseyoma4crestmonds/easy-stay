import styles from "./ComTab.module.css";
import { HOST_MOCK_COMMISSIONS, HostCommission } from "src/helpers/dataTypes";
import { useEffect, useState } from "react";
import NoBooking from "@/atoms/NoBooking";

import Pagination from "@/organisms/Pagination";

import StatsCategory from "@/atoms/StatsCategory";
import { CategoriesProp } from "@/atoms/StatsCategory/StatsCategory";
import ComsList from "../ComsList";
import ComsDrawer from "../ComsDrawer";
import GenerateReport from "../GenerateReport";

const filterOptions = [
  { name: "all", label: "All" },
  { name: "paid", label: "Paid" },
  { name: "pending", label: "Pending" },
];

type ComTabProps = {
  isMobile?: boolean;
  reportModal: boolean;
  setReportModal(arg: boolean): void;
};

function ComTab({ isMobile, setReportModal, reportModal }: ComTabProps) {
  const [loading, setLoading] = useState(true);

  const [commissions, setCommissions] = useState<HostCommission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComs, setSelectedComs] = useState<HostCommission | null>(null);

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
  const currentCommissions = commissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    // Simulated API response
    setCommissions(HOST_MOCK_COMMISSIONS);
    setLoading(false);
  }, []);

  const onOpen = (coms: HostCommission) => {
    setSelectedComs(coms);
    setDrawerOpen(true);
    console.log("booking", coms);
  };

  const categories: CategoriesProp[] = [
    {
      label: "Total Commissions",
      count: 10000000,
      bg: "bg-blue-100",
      image: "/images/cash-outline-blue.png",
    },
    {
      label: "Commissions Paid",
      count: 1234,
      bg: "bg-green-100",
      image: "/images/cash-outline.png",
    },
    {
      label: "Commissions Pending",
      count: 175000,
      bg: "bg-gray-100",
      image: "/images/cash-outline-pending.png",
    },
  ];

  const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-gray-100 text-gray-900",
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
      {commissions.length > 0 && (
        <StatsCategory categories={categories} isMobile={isMobile} />
      )}

      <div className={styles.bookingdiv}>
        {commissions.length > 0 ? (
          <div className="">
            <ComsList
              commissions={currentCommissions}
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
        {commissions.length > 0 && (
          <div className="absolute flex justify-between px-4 py-3 bottom-0 w-full ">
            <div className="text-sm font-semibold ">
              {commissions.length > 0 && (
                <>
                  <span className="text-gray-500 ">Showing</span>{" "}
                  <span className="text-gray-900 ">{indexOfFirstItem + 1}</span>
                  –
                  <span className="text-gray-900 ">
                    {Math.min(indexOfLastItem, commissions.length)}
                  </span>{" "}
                  <span className="text-gray-500">of</span>{" "}
                  <span className="text-gray-900 ">
                    {commissions.length}
                  </span>{" "}
                </>
              )}
            </div>

            <Pagination
              listOfItems={commissions}
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

      {selectedComs && (
        <ComsDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          commissions={selectedComs}
          statusStyles={statusStyles}
        />
      )}

      {reportModal && <GenerateReport setReportModal={setReportModal} />}
    </div>
  );
}

export default ComTab;
