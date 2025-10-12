type TabsProps<T extends string> = {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  labels: Record<T, string>;
  type?: "host" | "guest";
};

function Tabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  labels,
  type,
}: TabsProps<T>) {
  return (
    <div className="overflow-x-auto z-10 w-full md:w-auto  ">
      {type === "guest" ? (
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
      ) : (
        <div className="flex flex-row md:gap-x-2 w-full md:w-auto z-50  text-xs  ">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={`px-2 py-1  transition ${
                activeTab === t
                  ? "text-primary-600  border-b border-primary-600  font-medium "
                  : "text-gray-500 font-normal "
              }`}
            >
              {labels[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tabs;
