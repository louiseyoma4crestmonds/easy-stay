// import { calendarEvents } from "src/pages/api/shared";
import CalendarCell from "../CalendarCell";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
} from "date-fns";

interface CalendarEvent {
  id: string;
  price: number;
  is_booked: boolean;
  date: string;
  created_at: Date;
  booked_by: {};
  property: {};
}

interface CalendarGridProps {
  currentDate: Date;
  isLoading: boolean;
  onDateSelect: (date: string) => void;
  // selectedDate?: Date | null;
  selectedDate?: string | null;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({
  currentDate,
  isLoading,
  onDateSelect,
  selectedDate,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Start on Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  if (isLoading) {
    return (
      <div className="bg-white  ">
        <div className="grid grid-cols-7 ">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="p-1 md:p-2 text-center text-xs font-semibold text-gray-500  "
            >
              {day}
            </div>
          ))}
        </div>
        <div className="p-8 text-center text-gray-500">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-3 ">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 ">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="p-1 md:p-2 text-center text-xs font-semibold text-gray-500 "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 ">
          {week.map((day, dayIndex) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isLastInRow = dayIndex === 6;
            const isSelected = selectedDate === dateStr;
            // const isSelected = selectedDate ? format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") : false;

            return (
              <CalendarCell
                key={dateStr}
                date={day}
                isCurrentMonth={isCurrentMonth}
                isLastInRow={isLastInRow}
                onSelect={() => onDateSelect(dateStr)}
                isSelected={isSelected}
                selectedDate={selectedDate}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
