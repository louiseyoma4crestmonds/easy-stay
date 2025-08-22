import { useState } from "react";
import styles from "./DateDropdownModal.module.css";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import Button from "@/atoms/Button";

type DateDropdownModalProps = {
  initialDate: Date | null;
  minDate?: Date;
  onConfirm: (date: Date | null) => void;
};

function DateDropdownModal({
  initialDate,
  minDate,
  onConfirm,
}: DateDropdownModalProps) {
  const [tempDate, setTempDate] = useState<Date | null>(initialDate);
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg p-4 z-50">
      {/* Calendar */}
      <DatePicker
        selected={tempDate}
        onChange={(date: Date | null) => setTempDate(date)}
        inline
        minDate={minDate}
        // className="w-full border-0 rounded-lg px-3 py-2 text-red-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        // calendarClassName="bg-red shadow-lg rounded-xl border-0 p-3"
      />

      <div className="flex justify-between gap-2 mt-3">
        <Button
          variant="profile"
          width="full"
          onClick={() => onConfirm(null)} // cancel
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          width="full"
          onClick={() => onConfirm(tempDate)} // confirm
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default DateDropdownModal;
