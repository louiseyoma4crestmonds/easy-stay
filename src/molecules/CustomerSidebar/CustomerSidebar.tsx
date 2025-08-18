import { useRouter } from "next/router";
import { SettingsTab } from "src/pages/guest/settings";
import styles from "./CustomerSidebar.module.css";

export default function CustomerSidebar({
  activeTab,
  onChange,
  tabs,
}: {
  activeTab: SettingsTab;
  onChange: (t: SettingsTab) => void;
  tabs: SettingsTab[];
}) {
  const router = useRouter();

  return (
    <nav className={styles.maindiv}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const activeClasses = "bg-primary-50 text-primary-600 font-semibold ";
        const inactiveClasses = "text-gray-500 hover:bg-gray-100";

        return (
          <button
            key={tab}
            type="button"
            onClick={() => {
              onChange(tab);
              router.push(
                { pathname: "/guest/settings", query: { tab } },
                undefined,
                { shallow: true }
              );
            }}
            aria-current={isActive ? "page" : undefined}
            className={`text-left px-3 py-2 rounded-md text-sm font-normal transition-colors ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
            {/* Capitalize for display */}
          </button>
        );
      })}
    </nav>
  );
}
