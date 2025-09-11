import useCarousel from "@/hooks/useCarousel";
import React from "react";
import styles from "./CarouselComp.module.css";
import { Router, useRouter } from "next/router";

type CarouselSectionProps<T> = {
  title: string;
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  locationKey?: string; // key for location id
  neighborhoodKey?: string;
  showArrows?: boolean;
};

export default function CarouselSection<T>({
  title,
  items,
  itemsPerPage,
  renderItem,
  className,
  locationKey = "location",
  neighborhoodKey = "neighbourhood",
  showArrows,
}: CarouselSectionProps<T>) {
  const { visibleItems, handlePrev, handleNext, currentIndex } = useCarousel<T>(
    items,
    itemsPerPage
  );

  const router = useRouter();

  const handleTitleClick = () => {
    if (items.length === 0) return;

    let queryParam: string | null = null;
    let locationId: number | null = null;

    // Map title to query param
    if (title.toLowerCase().includes("near me")) {
      queryParam = "near-me";
    } else if (title.toLowerCase().includes("popular")) {
      queryParam = "popular-lagos"; // or dynamic based on first item location
    } else {
      // Default: use neighborhood or location ID from first item
      const firstItem: any = items[0];
      const neighborhoodId = firstItem?.[neighborhoodKey]?.id;
      const neighborhoodName = firstItem?.[neighborhoodKey]?.name;
      locationId = firstItem?.[locationKey]?.id;

      if (neighborhoodId && neighborhoodName && locationId) {
        // slugify name
        const slug = neighborhoodName.toLowerCase().replace(/\s+/g, "-");
        queryParam = `neighborhood-${neighborhoodId}-${slug}`;
      } else if (locationId) {
        queryParam = `location-${locationId}`;
      }
    }

    if (!queryParam) return;

    // build query object dynamically
    const query: Record<string, string> = { category: queryParam };
    if (locationId) {
      query.locationId = String(locationId);
    }

    router.push({
      pathname: "/guest/property-category",
      query,
    });
  };

  return (
    <section className={`my-8 w-full md:max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center px-3 mb-6">
        <div className="flex items-center gap-2">
          <p
            className="font-medium  text-sm md:text-base text-gray-800 cursor-pointer hover:underline "
            onClick={handleTitleClick}
          >
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
        {showArrows !== false && (
          <div className="hidden md:flex items-center gap-3">
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
        )}
      </div>

      {/* Items */}
      <div className="overflow-x-auto md:overflow-x-hidden hide-scrollbar ">
        <div className="flex flex-nowrap  gap-x-2">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              // className="w-1/3 "
              className={`shrink-0 md:shrink  px-2 ${showArrows === false ? "w-[90%] md:w-1/2 " : " w-full md:w-1/3"}`}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
