import Image from "next/image";
import router from "next/router";
import { useEffect } from "react";

type DashHeaderProps = {
  isMobile?: boolean;
};

function DashHeader({ isMobile }: DashHeaderProps) {
  const Categories = [
    {
      label: "Active Bookings",
      count: 0,
      bg: "bg-green-100",
      image: "/images/blue_archive_outline.png",
      tab: "active",
    },
    {
      label: "Upcoming Bookings",
      count: 0,
      bg: "bg-blue-100",
      image: "/images/archive-outline.png",
      tab: "upcoming",
    },
    {
      label: "Past Bookings",
      count: 0,
      bg: "bg-gray-100",
      image: "/images/archive-default.png",
      tab: "past",
    },
    {
      label: "Cancelled Bookings",
      count: 0,
      bg: "bg-red-100",
      image: "/images/red_archive-outline.png",
      tab: "cancelled",
    },
  ];

  const handleNavigate = (tab: string) => {
    router.push(`/host/bookings?tab=${tab}`);
  };

  return (
    <div className="w-full">
      <div className="grid gap-2 md:gap-3 md:grid-cols-4">
        {Categories.map((c) => (
          <div
            key={c.label}
            role="group"
            aria-label={`${c.label} summary`}
            className="relative  bg-white rounded-lg shadow-sm flex items-center justify-between  p-1 md:p-3"
          >
            <div className="flex flex-row gap-3 items-center  ">
              <div
                className={`rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ${c.bg}`}
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                />
              </div>

              <div className="flex flex-col">
                <div className="text-xl font-semibold text-gray-800">
                  {c.count}
                </div>
                <div className="text-xs md:text-sm text-gray-500 truncate">
                  {c.label}
                </div>
              </div>
            </div>

            <div
              className="absolute top-2 right-2 cursor-pointer "
              onClick={() => handleNavigate(c.tab)}
            >
              <img
                src="/images/square-outline.png"
                alt=""
                className="w-4 h-4"
              />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashHeader;
