// import BookedIcon from "@/atoms/Icons/Booked";
import { format, isToday } from "date-fns";

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isLastInRow: boolean;
  onSelect: () => void;
  isSelected?: boolean;
  // selectedDate?: Date | null;
  selectedDate?: string | null;
}

export function CalendarCell({
  date,
  isCurrentMonth,
  isLastInRow,
  onSelect,
  isSelected,
  selectedDate,
}: DateCellProps) {
  const dayNumber = format(date, "d");

  const today = new Date();
  // Highlight today's date only if it is in the current month
  const isTodayDate = isCurrentMonth && date.getDate() === today.getDate();

  // Highlight rules:
  // 1. If selected → blue highlight
  // 2. Else if this day matches today's system date (dayNumber == today) AND no date is selected → gray highlight
  const highlightClasses = isSelected
    ? "bg-blue-600 text-white rounded-lg px-0.5 py-1.5"
    : isTodayDate && !selectedDate
      ? "bg-gray-300 text-black rounded-lg px-0.5 py-1.5"
      : "text-gray-900";

  const cellClasses = [
    " ",
    "cursor-pointer transition-colors group",
    !isLastInRow ? "" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cellClasses}
      onClick={isCurrentMonth ? onSelect : undefined}
      data-testid={`cell-date-${format(date, "yyyy-MM-dd")}`}
    >
      <div className="flex items-center justify-center">
        <div
          className={`text-xs font-bold w-8 h-8 flex items-center justify-center ${highlightClasses}`}
          // className={`text-xs font-bold  w-8 h-8 flex items-center justify-center
          //   ${isSelected ? "bg-blue-600 text-white rounded-lg px-0.5 py-1.5 " : "text-gray-900"}
          // `}
        >
          {dayNumber}
        </div>
      </div>
    </div>
  );
}
