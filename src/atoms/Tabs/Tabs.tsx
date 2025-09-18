type TabsProps<T extends string> = {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  labels: Record<T, string>;
};

function Tabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  labels,
}: TabsProps<T>) {
  return (
    <div className="overflow-x-auto z-10 w-full md:w-auto  ">
      <div className="flex justify-between md:gap-2 w-full md:w-auto  rounded-lg text-xs bg-gray-50 p-2 md:p-1.5 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            className={`px-2 py-1 rounded transition ${
              activeTab === t
                ? "bg-primary-600 font-medium text-white"
                : "text-gray-500 font-normal hover:bg-gray-100"
            }`}
          >
            {labels[t]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
