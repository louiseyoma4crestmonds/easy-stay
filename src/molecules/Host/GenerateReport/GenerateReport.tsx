import Modal from "@/molecules/Modal";
import styles from "./GenerateReport.module.css";
import Button from "@/atoms/Button";
import { useEffect, useRef, useState } from "react";
import Calendar from "@/molecules/Calendar";

type GenerateReportProps = {
  setReportModal: (arg: boolean) => void;
};

function GenerateReport({ setReportModal }: GenerateReportProps) {
  const fromDateRef = useRef<HTMLDivElement>(null);
  const toDateRef = useRef<HTMLDivElement>(null);
  const fromCalendarRef = useRef<HTMLDivElement>(null);
  const toCalendarRef = useRef<HTMLDivElement>(null);

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
  const [reportCategory, setReportCategory] = useState<
    "All" | "Payments" | "Refund" | "Commissions" | null
  >(null);

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

  return (
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
                    {fromDate ? fromDate.toLocaleDateString() : "DD/MM/YYYY"}
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
        <div className="flex flex-wrap gap-4 py-5 border-b">
          {["All", "Payments", "Refund", "Commissions"].map((opt) => {
            const isChecked = reportCategory === opt;
            return (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-800"
              >
                <input
                  type="radio"
                  name="reportCategory"
                  value={opt}
                  checked={isChecked}
                  onChange={() =>
                    setReportCategory(
                      opt as Exclude<typeof reportCategory, null>
                    )
                  }
                  className="hidden"
                />
                <span
                  onClick={() => {
                    setSelectedReason(opt);
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
                <span className="text-gray-800 font-normal text-sm">{opt}</span>
              </label>
            );
          })}
        </div>
        <p className="text-gray-500 font-normal text-sm md:pt-6 ">Export as</p>
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
  );
}

export default GenerateReport;
