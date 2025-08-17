import { useState } from "react";

export default function useCarousel<T>(items: T[], itemsPerPage: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < items.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return {
    visibleItems,
    handlePrev,
    handleNext,
    currentIndex,
  };
}
