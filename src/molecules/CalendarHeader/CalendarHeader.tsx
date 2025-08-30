import Image from "next/image";
import Button from "@/atoms/Button";

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigateMonth: (direction: "prev" | "next") => void;
}

export function CalendarHeader({
  currentDate,
  onNavigateMonth,
}: CalendarHeaderProps) {
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white    ">
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => onNavigateMonth("prev")}
          data-testid="button-prev-month"
        >
          <Image
            src="/images/arrow-left.png"
            alt="arrow-left"
            width={20}
            height={20}
          />
        </Button>
        <p
          className="text-xs font-bold text-gray-900"
          data-testid="text-current-month"
        >
          {monthName}
        </p>
        <Button
          variant="secondary"
          onClick={() => onNavigateMonth("next")}
          data-testid="button-next-month"
        >
          <Image
            src="/images/arrow-right.png"
            alt="arrow-right"
            width={20}
            height={20}
          />
        </Button>
      </div>
    </div>
  );
}
