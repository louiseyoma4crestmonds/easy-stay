import { Booking, HostBooking } from "src/helpers/dataTypes";
import Image from "next/image";
import styles from "./BookingHeader.module.css";

interface BookingHeaderProps {
  bookings: Booking[];
  isMobile?: boolean;
}

function BookingHeader({ bookings, isMobile }: BookingHeaderProps) {
  // Do the counting here
  const counts = {
    active: bookings.filter((b) => b.status === "active").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    past: bookings.filter((b) => b.status === "past").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const categories = [
    {
      label: "Active Bookings",
      count: counts.active,
      bg: "bg-primary-100",
      image: "/images/active-img.png",
    },
    {
      label: "Upcoming Bookings",
      count: counts.upcoming,
      bg: "bg-purple-100",
      image: "/images/upcoming-booking.png",
    },
    {
      label: "Past Bookings",
      count: counts.past,
      bg: "bg-green-100",
      image: "/images/past.png",
    },
    {
      label: "Cancelled Bookings",
      count: counts.cancelled,
      bg: "bg-red-100",
      image: "/images/cancelled.png",
    },
  ];
  return (
    <div className="w-full">
      <div className={`${styles.seconddiv} hide-scrollbar`}>
        {categories.map((c, index) => {
          const isLast = index === categories.length - 1;
          return (
            <div
              key={c.label}
              role="group"
              aria-label={`${c.label} summary`}
              className="relative flex items-center p-4 md:p-6 "
            >
              <div className="flex flex-row gap-4 ">
                <div
                  className={`rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ${c.bg}`}
                >
                  <Image
                    src={c.image}
                    width={isMobile ? 16 : 24}
                    height={isMobile ? 16 : 24}
                  />
                </div>

                <div className=" flex flex-col ">
                  <div className=" text-xl font-semibold text-gray-800">
                    {c.count}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 truncate">
                    {c.label}
                  </div>
                </div>
              </div>

              {/* Short vertical divider */}
              {!isLast && <div className={styles.line} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingHeader;
