import { Booking, HostBooking } from "src/helpers/dataTypes";
import Image from "next/image";
import styles from "./StatsCategory.module.css";

export interface CategoriesProp {
  label: string;
  count: number | string;
  bg: string; // Tailwind background classes, e.g. "bg-red-100"
  image: string; // image path
}

type StatsCategoryProps = {
  categories: CategoriesProp[];
  isMobile?: boolean;
  // className?: string;
};

function StatsCategory({ categories, isMobile }: StatsCategoryProps) {
  return (
    <div className="w-full">
      <div
        className={` rounded-lg bg-white  flex items-center justify-between  overflow-x-auto
          hide-scrollbar
          md:grid 
          ${categories.length === 2 ? "md:grid-cols-2" : ""}
          ${categories.length === 3 ? "md:grid-cols-3" : ""}
          ${categories.length === 4 ? "md:grid-cols-4" : ""}
        `}
      >
        {/* <div className={`${styles.seconddiv} hide-scrollbar`}> */}
        {categories.map((c, index) => {
          const isLast = index === categories.length - 1;
          return (
            <div
              key={c.label}
              role="group"
              aria-label={`${c.label} summary`}
              className={`flex items-center p-4 md:p-6 min-w-[160px] md:min-w-0 
              ${!isLast ? "border-r h-[50%] " : ""}`}
            >
              <div className="flex flex-row gap-4 ">
                <div
                  className={`rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ${c.bg}`}
                >
                  <Image
                    src={c.image}
                    width={isMobile ? 16 : 24}
                    height={isMobile ? 16 : 24}
                  />
                </div>

                <div className=" flex flex-col ">
                  <div className=" text-xl font-semibold text-gray-800">
                    {c.count}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 truncate">
                    {c.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsCategory;
