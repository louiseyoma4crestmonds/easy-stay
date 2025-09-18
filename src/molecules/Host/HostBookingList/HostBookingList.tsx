import SearchInput from "@/atoms/SearchInput";
import { useEffect, useRef, useState } from "react";

import styles from "./HostBookingList.module.css";
import { HostBookingListProps } from "./HostBookingList.types";
import HostBookingCard from "../HostBookingCard";
import Calendar from "@/molecules/Calendar";

function HostBookingList(props: HostBookingListProps) {
  const { bookings, onOpen, handleCancel } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterDateDropdown, setFilterDateDropdown] = useState(false);

  const filterDateDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDateDropdownRef.current &&
        !filterDateDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDateDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className=" flex flex-col w-full md:flex-row space-y-4 md:space-y-0 items-center justify-between px-4 py-3 ">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search (Apartment, ID, Guest Name)"
        />

        <div ref={filterDateDropdownRef} className={styles.checkoutdiv}>
          <div
            className=""
            onClick={() => {
              setFilterDateDropdown((prev) => !prev);
            }}
          >
            <div className={styles.seconddiv}>
              <img
                src="/images/calendar-day-outline.png"
                alt="calendar icon"
                className="w-3 h-3"
              />
              <span className="text-xs text-gray-500 font-medium">
                {filterDate ? filterDate.toLocaleDateString() : "DD/MM/YYYY"}
              </span>
            </div>
          </div>

          {filterDateDropdown && (
            <div className="absolute right-[270px] top-full ">
              <Calendar
                initialDate={filterDate}
                onConfirm={(date) => {
                  if (date) setFilterDate(date);
                  setFilterDateDropdown(false);
                }}
              />{" "}
            </div>
          )}
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b h-12 text-left text-gray-500 text-xs font-semibold bg-gray-50">
            <th className="  px-4">ID</th>
            <th className=" ">GUEST NAME </th>
            <th className=" ">APARTMENT NAME</th>
            <th className="hidden md:table-cell ">DATE BOOKED</th>
            <th className=" ">RATE/NIGHT</th>
            <th className="hidden md:table-cell ">BOOKING DATES</th>

            <th className="hidden md:table-cell w-[8%] ">NO OF DAYS</th>
            <th className="hidden md:table-cell px-4 w-[6%] ">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {searchTerm && bookings.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No search result found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <HostBookingCard
                key={booking.id}
                booking={booking}
                onOpen={onOpen}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HostBookingList;
