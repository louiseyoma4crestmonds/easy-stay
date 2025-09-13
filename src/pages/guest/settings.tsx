import useSessionDetails from "@/hooks/useSessionDetails";
import ChangePwdTab from "@/molecules/ChangePwdTab";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import CustomerSidebar from "@/molecules/CustomerSidebar";
import NotificationTab from "@/molecules/NotificationTab";
import ProfileTab from "@/molecules/ProfileTab";
import SupportTab from "@/molecules/SupportTab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SettingsTab =
  | "my Profile"
  | "Profile"
  | "password"
  | "notifications"
  | "support";

export default function Settings() {
  const router = useRouter();
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  const [activeTab, setActiveTab] = useState<SettingsTab>("my Profile");

  const [width, setWidth] = useState<number>(0);
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

  const SETTINGS_TABS: SettingsTab[] = [
    (isMobile ? "Profile" : "my Profile") as SettingsTab,
    "password",
    "notifications",
    "support",
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.tab;
    const val = Array.isArray(raw) ? raw[0] : raw;
    if (typeof val === "string" && SETTINGS_TABS.includes(val as SettingsTab)) {
      setActiveTab(val as SettingsTab);
    } else {
      setActiveTab(isMobile ? "Profile" : "my Profile");
    }
  }, [router.isReady, router.query.tab, isMobile]);

  const points = 100;

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10 ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        lastName={lastName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
        isMobile={isMobile}
      />
      <div className="flex flex-col md:flex-row w-[90%] justify-center mt-12 gap-6 mx-auto ">
        <CustomerSidebar
          activeTab={activeTab}
          onChange={(t) => setActiveTab(t)}
          tabs={SETTINGS_TABS}
        />
        {activeTab === "my Profile" && <ProfileTab />}
        {activeTab === "Profile" && <ProfileTab />}
        {activeTab === "password" && <ChangePwdTab />}
        {activeTab === "support" && <SupportTab />}
        {activeTab === "notifications" && <NotificationTab />}
      </div>
    </section>
  );
}
