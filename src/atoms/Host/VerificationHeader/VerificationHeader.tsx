import Image from "next/image";

export interface VerificationCategoriesProp {
  label: string;
  count: number | string;
  bg: string; // Tailwind background classes, e.g. "bg-red-100"
  border: string;
  image: string; // image path
}

type VerificationHeaderProps = {
  categories: VerificationCategoriesProp[];
  isMobile?: boolean;
};

function VerificationHeader({
  categories,
  isMobile = false,
}: VerificationHeaderProps) {
  return (
    <div className="w-full">
      <div
        className={`grid gap-2 md:gap-3
          ${categories.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}
        `}
      >
        {categories.map((c) => (
          <div
            key={c.label}
            role="group"
            aria-label={`${c.label} summary`}
            className="  bg-white rounded-lg shadow-sm flex items-center justify-between  p-1 md:p-3"
          >
            <div className="flex flex-row gap-3 items-center  ">
              <div
                className={`rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ${c.bg}`}
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                />
              </div>

              <div className="flex flex-col">
                <div className="text-xl font-semibold text-gray-800">
                  {c.count}
                </div>
                <div className="text-xs md:text-sm text-gray-500 truncate">
                  {c.label}
                </div>
              </div>
            </div>

            <div className={` h-full w-[8px] rounded-lg ${c.border} `} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerificationHeader;
