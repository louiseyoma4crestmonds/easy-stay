import Image from "next/image";
import Calendar from "@/molecules/Calendar";
import styles from "./ComsList.module.css";
import SearchInput from "@/atoms/SearchInput";
import { useEffect, useRef, useState } from "react";
import { ComsListProps } from "./ComsList.types";
import { createPortal } from "react-dom";
import CustomDropdown from "@/molecules/CustomDropdown";
import { DropdownOption } from "@/molecules/CustomDropdown/CustomDropdown.types";

function ComsList({
  commissions,
  onOpen,
  statusOptions,
  statusStyles,
}: ComsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectFilter, setSelectFilter] = useState<DropdownOption>(
    statusOptions[0]
  );
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterDateDropdown, setFilterDateDropdown] = useState(false);

  const filterDateDropdownRef = useRef<HTMLDivElement>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDateDropdownRef.current &&
        !filterDateDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDateDropdown(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
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
    <div className="h-full ">
      <div className=" flex flex-col w-full space-y-4 md:space-y-0  justify-between px-4 ">
        <div className="flex flex-row items-center justify-between py-3 ">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search (Apartment, ID, Guest Name)"
          />
          <div className="flex items-center gap-x-4 ">
            <div ref={filterDateDropdownRef} className={styles.checkoutdiv}>
              <div className="" onClick={toggleDropdown}>
                <div className={styles.seconddiv}>
                  <img
                    src="/images/calendar-day-outline.png"
                    alt="calendar icon"
                    className="w-3 h-3"
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    {filterDate
                      ? filterDate.toLocaleDateString()
                      : "DD/MM/YYYY"}
                  </span>
                </div>
              </div>
            </div>

            <CustomDropdown
              options={statusOptions}
              value={selectFilter}
              onChange={(val) => setSelectFilter(val)}
              buttonClassName={styles.btndiv}
              dropdownClassName={styles.dropdowndiv}
              toggleIcon="/images/chevron-down-outline.png"
            />
          </div>
        </div>

        {/*  Portal dropdown */}
        {filterDateDropdown &&
          createPortal(
            <div
              className="absolute z-50"
              onPointerDown={(e) => e.stopPropagation()}
              style={{ top: portalPos.top, left: portalPos.left }}
            >
              <Calendar
                initialDate={filterDate}
                onConfirm={(date) => {
                  if (date) setFilterDate(date);
                  setFilterDateDropdown(false);
                }}
              />
            </div>,
            document.body
          )}

        <div className=" overflow-y-auto h-[calc(100vh-450px)] ">
          <table className="w-[90%]  border-collapse">
            <thead className="sticky top-0 z-20 ">
              <tr className="border-b h-12 text-left text-gray-500 text-xs font-semibold bg-gray-50">
                <th className="  px-4">ID</th>
                <th className=" ">BOOKING AMOUNT </th>
                <th className=" ">COMMISSION RATE (%) </th>
                <th className=" ">COMMISSION EARNED</th>
                <th className="hidden md:table-cell ">DATE</th>

                <th className="hidden md:table-cell ">STATUS</th>

                <th className="hidden md:table-cell px-4 w-[6%] ">ACTION</th>
              </tr>
            </thead>

            <tbody className="">
              {searchTerm && commissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No search result found
                  </td>
                </tr>
              ) : (
                commissions.map((coms) => (
                  <tr className="border-b font-sm font-normal ">
                    <td className="px-4 py-2 underline md:no-underline ">
                      <span className="hidden md:block text-gray-800 ">
                        {coms.id}
                      </span>
                    </td>
                    <td className=" py-2 text-gray-800  ">
                      {coms.bookingAmount}
                    </td>
                    <td className=" py-2 text-gray-500 ">{coms.comRate}</td>
                    <td className=" py-2  text-gray-500 truncate ">
                      {coms.comEarned}
                    </td>
                    <td className=" py-2  text-gray-500 truncate ">
                      {coms.dateBooked}
                    </td>
                    <td className="hidden md:table-cell py-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md  text-xs font-normal uppercase ${
                          statusStyles[coms.status] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {coms.status}
                      </span>
                    </td>

                    <td className="hidden md:table-cell py-2  relative">
                      <div
                        className="flex items-center justify-center cursor-pointer "
                        onClick={() => onOpen(coms)}
                      >
                        <Image
                          src="/images/eye-outline.png"
                          width={20}
                          height={20}
                          alt="View"
                        />{" "}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComsList;
