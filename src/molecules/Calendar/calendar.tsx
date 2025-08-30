import { useState } from "react";
import CalendarGrid from "@/molecules/CalendarGrid";
import CalendarHeader from "@/molecules/CalendarHeader";
import { parseISO } from "date-fns";

export type CalendarProps = {
  initialDate: Date | null;
  minDate?: Date;
  onConfirm: (date: Date | null) => void;
};

export default function Calendar(props: CalendarProps) {
  const { initialDate, onConfirm } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr); // string (yyyy-MM-dd)
    setTempDate(parseISO(dateStr)); // Date object used when pressing OK
  };

  const [tempDate, setTempDate] = useState<Date | null>(initialDate);

  return (
    <div className="absolute top-full max-w-4xl w-[284px] left-0 mt-2 bg-white rounded-lg shadow-lg px-4 py-5 z-50">
      <div className="">
        <CalendarHeader
          currentDate={currentDate}
          onNavigateMonth={navigateMonth}
        />

        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          isLoading={false}
          onDateSelect={handleDateSelect}
        />
        <div className="flex justify-between gap-2 mt-3">
          <button
            className="border border-gray-200 text-gray-800 text-sm font-medium rounded-lg w-full  "
            onClick={() => onConfirm(null)}
          >
            Cancel
          </button>
          <button
            className="bg-primary-600 px-3 py-2 text-white rounded-lg text-sm font-medium w-full "
            onClick={() => onConfirm(tempDate)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
