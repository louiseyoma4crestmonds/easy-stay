import Tabs from "@/atoms/Tabs";
import AppLayout from "@/layouts/AppLayout";
import HostBookingComp from "@/molecules/Host/HostBookingComp";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { BookingStatus } from "src/helpers/dataTypes";

function Bookings() {
  const router = useRouter();
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

  // 🧭 Detect tab from query string
  useEffect(() => {
    if (router.isReady) {
      const tabParam = router.query.tab as BookingStatus | undefined;
      if (tabParam && tabs.includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [router.isReady, router.query.tab]);

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
      <div className="mt-5 h-[calc(100vh-210px)]  ">
        <HostBookingComp isMobile={isMobile} activeTab={activeTab} />
      </div>
    </AppLayout>
  );
}

export default Bookings;
