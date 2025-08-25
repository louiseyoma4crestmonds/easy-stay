import useCarousel from "@/hooks/useCarousel";
import React from "react";
import styles from "./CarouselComp.module.css";

type CarouselSectionProps<T> = {
  title: string;
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
};

export default function CarouselSection<T>({
  title,
  items,
  itemsPerPage,
  renderItem,
  className,
}: CarouselSectionProps<T>) {
  const { visibleItems, handlePrev, handleNext, currentIndex } = useCarousel<T>(
    items,
    itemsPerPage
  );

  return (
    <section className={` my-12 w-full max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center px-3 mb-6">
        <div className="flex items-center gap-2">
          <p className="font-medium text-base text-gray-800 cursor-pointer hover:underline ">
            {title}
          </p>
          <img
            src="/images/angle-left.png"
            width={8}
            height={14}
            className="transform -rotate-180"
            alt="Arrow icon"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous items"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            // aria-disabled={!hasPrev}
            className={styles.btndiv}
          >
            <img
              src="/images/angle-right.png"
              alt="Previous"
              width={12}
              height={12}
              className="transform -rotate-180"
            />
          </button>
          <button
            aria-label="Next items"
            onClick={handleNext}
            // disabled={!hasNext}
            // aria-disabled={!hasNext}
            className={styles.btndiv}
          >
            <img
              src="/images/angle-right.png"
              alt="Next"
              width={12}
              height={12}
            />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-nowrap  gap-2">
        {visibleItems.map((item, index) => (
          <div key={index} className="px-2 w-1/3">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}
