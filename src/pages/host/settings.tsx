import Tabs from "@/atoms/Tabs";
import AppLayout from "@/layouts/AppLayout";
import HostBookingComp from "@/molecules/Host/HostBookingComp";
import HostDoc from "@/molecules/Host/HostDoc";
import HostNotification from "@/molecules/Host/HostNotification";
import HostPassword from "@/molecules/Host/HostPassword";
import HostProfile from "@/molecules/Host/HostProfile";
import HostRefund from "@/molecules/Host/HostRefund";
import HostSessionMgt from "@/molecules/Host/HostSessionMgt";
import SettingsSidebar from "@/molecules/Host/SettingsSidebar";
import { useEffect, useState } from "react";
import { BookingStatus } from "src/helpers/dataTypes";

function Settings() {
  const [width, setWidth] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("profile");
  const [sideSection, setSideSection] = useState("my profile");
  const tabs = ["profile", "platforms"];

  const statusLabel = {
    profile: "Profile & Settings",
    platforms: "Platforms Settings",
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
      pageTitle="Settings"
      subTitle="Take a look around and tweak whatever you need!"
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          labels={statusLabel}
          type="host"
        />
      }
      secondarySidebar={
        <SettingsSidebar
          onSectionChange={setSideSection}
          activeTab={activeTab}
        />
      }
    >
      <div className="mt-5 flex flex-col h-[calc(100vh-210px)] ">
        {/* ---- Main Content ---- */}
        <div className="flex-1 min-h-0 overflow-y-auto ">
          {activeTab === "profile" && (
            <>
              {sideSection === "my profile" && <HostProfile />}
              {sideSection === "doc" && <HostDoc />}
              {sideSection === "password" && <HostPassword />}
              {sideSection === "session" && <HostSessionMgt />}
            </>
          )}

          {activeTab === "platforms" && (
            <>
              {sideSection === "refund" && <HostRefund />}
              {sideSection === "notification" && <HostNotification />}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Settings;
