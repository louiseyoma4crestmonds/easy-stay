import CustomerNavArea from "@/molecules/CustomerNavArea";
import CustomerSidebar from "@/molecules/CustomerSidebar";
import ProfileTab from "@/molecules/ProfileTab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SettingsTab =
  | "my Profile"
  | "password"
  | "notifications"
  | "support";
const SETTINGS_TABS: SettingsTab[] = [
  "my Profile",
  "password",
  "notifications",
  "support",
];

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("my Profile");

  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.tab;
    const val = Array.isArray(raw) ? raw[0] : raw;
    if (typeof val === "string" && SETTINGS_TABS.includes(val as SettingsTab)) {
      setActiveTab(val as SettingsTab);
    } else {
      setActiveTab("my Profile");
    }
  }, [router.isReady, router.query.tab]);

  const isLoggedIn = true;
  const firstName = "Lekan";
  const lastName = "Okeowo";
  const points = 100;

  return (
    <section className="min-h-screen bg-gray-50 w-full">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />
      <div className="flex w-[90%] justify-center mt-12 gap-6 mx-auto ">
        <CustomerSidebar
          activeTab={activeTab}
          onChange={(t) => setActiveTab(t)}
          tabs={SETTINGS_TABS}
        />
        {activeTab === "my Profile" && <ProfileTab />}
        {activeTab === "password" && <div>Password Content</div>}
        {activeTab === "support" && <div>Support Content</div>}
        {activeTab === "notifications" && <div>Notifications Content</div>}
      </div>
    </section>
  );
}
