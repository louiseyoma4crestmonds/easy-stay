import { useEffect, useState } from "react";

type SettingsSidebarProps = {
  onSectionChange: (section: string) => void;
  activeTab: string;
};

function SettingsSidebar({ onSectionChange, activeTab }: SettingsSidebarProps) {
  const [active, setActive] = useState<string>("my profile"); // nothing to do with top tabs

  // different sidebar menus
  const profileTabs = [
    { key: "my profile", label: "My Profile" },
    { key: "doc", label: "Documents & Payments" },
    { key: "password", label: "Password" },
    { key: "session", label: "Session Management" },
  ];

  const refundTabs = [
    { key: "refund", label: "Refund " },
    { key: "notification", label: "Notifications " },
  ];

  const sideTabs = activeTab === "profile" ? profileTabs : refundTabs;

  // reset active when top-level tab changes
  useEffect(() => {
    const first = sideTabs[0].key;
    setActive(first);
    onSectionChange(first);
  }, [activeTab]);

  const handleClick = (key: string) => {
    setActive(key);
    onSectionChange(key);
  };

  return (
    <div className="hidden md:block  bg-white">
      <div className="flex flex-col px-2 pb-2 pt-5 border-t space-y-2">
        {sideTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleClick(tab.key)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors
               ${active === tab.key ? "bg-primary-50 text-primary-600 font-semibold truncate " : "text-gray-500 font-normal hover:bg-gray-50"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SettingsSidebar;
