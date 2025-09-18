import Tabs from "@/atoms/Tabs";
import AppLayout from "@/layouts/AppLayout";
import HostBookingComp from "@/molecules/Host/HostBookingComp";
import { useEffect, useState } from "react";
import { BookingStatus } from "src/helpers/dataTypes";

function Bookings() {
  const [width, setWidth] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<BookingStatus>("active");
  const tabs: BookingStatus[] = ["active", "upcoming", "past", "cancelled"];

  const statusLabel: Record<BookingStatus, string> = {
    active: "Active",
    upcoming: "Upcoming",
    past: "Past",
    cancelled: "Cancelled",
  };

  const isMobile = width <= 767;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <AppLayout
      isMobile={isMobile}
      pageTitle="Bookings"
      subTitle="Manage bookings easily"
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          labels={statusLabel}
          type="host"
        />
      }
    >
      <div className="my-6 h-[calc(100vh-210px)]  ">
        <HostBookingComp isMobile={isMobile} activeTab={activeTab} />
      </div>
    </AppLayout>
  );
}

export default Bookings;
