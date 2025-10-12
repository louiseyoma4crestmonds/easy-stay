import Image from "next/image";
import { useEffect, useState } from "react";

type ActivityProps = {
  id: number;
  title: string;
};

type DashActivityProps = {
  isMobile?: boolean;
};

const Activity: ActivityProps[] = [
  { id: 1, title: "New Booking Request from John Doe" },
  { id: 2, title: "Booking Cancellation: Apartment B by Jane Smith" },
  { id: 3, title: "Booking Cancellation: Apartment C by Jane Smith" },
  { id: 4, title: "Booking Check In: Apartment B by Jane Smith" },
  { id: 5, title: "Activity 5" },
];

function DashActivity({ isMobile }: DashActivityProps) {
  const [activities, setActivities] = useState<ActivityProps[]>([]);

  useEffect(() => {
    // Simulated API response
    setActivities(Activity.slice(0, 4));
  }, []);

  return (
    <div className="bg-white flex flex-col w-[33.33%] rounded-lg">
      <p className="text-gray-500 font-normal text-sm md:text-base text-left p-4 border-b pb-2">
        Recent Activity
      </p>

      <div>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={activity.id} className="">
              <div className="flex justify-between items-center p-4">
                <p className="text-gray-500 text-xs font-normal">
                  {activity.title}
                </p>
                <p className="text-blue-500 text-xs font-medium cursor-pointer">
                  View
                </p>
              </div>

              {/* ✅ Separate inner div for the border */}
              {index !== activities.length - 1 && (
                <div className="border-b border-gray-200 w-[90%] mx-auto "></div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center md:py-16 px-4">
            <Image
              src="/images/no-booking.png"
              alt="booking-img"
              width={isMobile ? 95 : 98}
              height={isMobile ? 64 : 63}
            />
            <p className="text-gray-500 font-normal text-sm mt-3">
              No activity yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashActivity;
