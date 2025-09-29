import SearchInput from "@/atoms/SearchInput";
import { useEffect, useRef, useState } from "react";

import styles from "./HostBookingList.module.css";
import { HostBookingListProps } from "./HostBookingList.types";
import HostBookingCard from "../HostBookingCard";
import Calendar from "@/molecules/Calendar";
import { createPortal } from "react-dom";

function HostBookingList(props: HostBookingListProps) {
  const { bookings, onOpen, handleCancel } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterDateDropdown, setFilterDateDropdown] = useState(false);

  const filterDateDropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;

      const clickedOutsideFrom =
        filterDateDropdownRef.current &&
        !filterDateDropdownRef.current.contains(t) &&
        (!calendarRef.current || !calendarRef.current.contains(t));

      if (clickedOutsideFrom) setFilterDateDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position the portal under the trigger button
  const toggleDropdown = () => {
    if (filterDateDropdownRef.current) {
      const rect = filterDateDropdownRef.current.getBoundingClientRect();
      setPortalPos({
        top: rect.bottom + window.scrollY + 4, // +4px gap
        left: rect.left + window.scrollX - 180,
      });
    }
    setFilterDateDropdown((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.maindiv}>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search (Apartment, ID, Guest Name)"
        />

        <div ref={filterDateDropdownRef} className={styles.checkoutdiv}>
          <div className="" onClick={toggleDropdown}>
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
        </div>
      </div>

      {filterDateDropdown && (
        <div
          ref={calendarRef}
          className="fixed z-50"
          style={{ top: portalPos.top, left: portalPos.left }}
        >
          <Calendar
            initialDate={filterDate}
            onConfirm={(date) => {
              if (date) setFilterDate(date);
              setFilterDateDropdown(false);
            }}
          />
        </div>
      )}

      <div className=" flex-1 overflow-y-auto h-[calc(100vh-450px)]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 ">
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
    </div>
  );
}

export default HostBookingList;
