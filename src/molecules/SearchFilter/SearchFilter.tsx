import { useEffect, useRef, useState } from "react";
import styles from "./SearchFilter.module.css";
import {
  Amenity,
  ApartmentType,
  LocationType,
  Pricing,
  Rating,
} from "src/helpers/dataTypes";
import Button from "@/atoms/Button";

interface SearchFilterProps {
  locations: LocationType[];
  apartmentTypes: ApartmentType[];
  amenities: Amenity[];
  ratings: Rating[];
  pricing: Pricing;
  variant?: "panel" | "dropdown";
  onApply: (filters: any) => void; // callback with selected filters
  defaultSelectedLocation?: string | undefined;
  onClose?: () => void;
}

function SearchFilter(props: SearchFilterProps) {
  const {
    locations,
    apartmentTypes,
    amenities,
    ratings,
    pricing,
    onApply,
    variant = "panel",
    onClose,
    defaultSelectedLocation,
  } = props;
  // State for filters
  // const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(() =>
    defaultSelectedLocation ? [defaultSelectedLocation] : []
  );

  const [selectedApartmentTypes, setSelectedApartmentTypes] = useState<
    string[]
  >([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{ from: number; to: number }>({
    from: pricing.min,
    to: pricing.max,
  });
  // Example state
  // const [priceRange, setPriceRange] = useState({ from: pricing.min, to: pricing.max });
  const [inputs, setInputs] = useState({ from: "", to: "" });

  // Handlers
  const toggleSelection = (
    value: string,
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    selected: string[]
  ) => {
    if (selected.includes(value)) {
      setFn(selected.filter((v) => v !== value));
    } else {
      setFn([...selected, value]);
    }
  };

  // const dropdownRef = useRef<HTMLDivElement>(null);

  // // close dropdown if clicked outside
  // useEffect(() => {
  //   if (variant !== "dropdown") return;

  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       onClose?.(); // ✅ will close dropdown from parent
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [variant, onClose]);

  const handleReset = () => {
    setSelectedLocations([]);
    setSelectedApartmentTypes([]);
    setSelectedAmenities([]);
    setSelectedRating(null);
    setPriceRange({ from: pricing.min, to: pricing.max });
  };

  const handleApply = () => {
    onApply({
      locations: selectedLocations,
      apartmentTypes: selectedApartmentTypes,
      amenities: selectedAmenities,
      rating: selectedRating,
      priceRange,
    });
    onClose?.();
  };

  const content = (
    <div className="space-y-4  ">
      {/* Locations */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className={styles.P1}>Location</h3>
        <div className="space-y-3">
          {locations.map((loc) => {
            const isChecked = selectedLocations.includes(loc.name);
            return (
              <label
                key={loc.name}
                className="flex justify-between items-center "
              >
                {/* Left side with custom checkbox + label */}
                <div className="flex items-center gap-3">
                  {/* Hidden checkbox for accessibility */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      toggleSelection(
                        loc.name,
                        setSelectedLocations,
                        selectedLocations
                      )
                    }
                    className="hidden"
                  />

                  {/* Custom checkbox */}
                  <span
                    className={` ${styles.inputspan}
                ${isChecked ? "bg-blue-600 border-blue-600" : "border-gray-300"}
              `}
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  {/* Label */}
                  <span className={styles.span}>{loc.name}</span>
                </div>

                {/* Count */}
                <span className={styles.countDiv}>{loc.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Apartment Types */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className={styles.P1}>Apartment Type</h3>
        <div className="space-y-3">
          {apartmentTypes.map((type) => {
            const isChecked = selectedApartmentTypes.includes(type.name);
            return (
              <label
                key={type.name}
                className="flex justify-between items-center "
              >
                {/* Left side with custom checkbox + label */}
                <div className="flex items-center gap-3">
                  {/* Hidden checkbox for accessibility */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      toggleSelection(
                        type.name,
                        setSelectedApartmentTypes,
                        selectedApartmentTypes
                      )
                    }
                    className="hidden"
                  />

                  {/* Custom checkbox */}
                  <span
                    className={` ${styles.inputspan}
                ${isChecked ? "bg-blue-600 border-blue-600" : "border-gray-300"}
              `}
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  {/* Label */}
                  <span className={styles.span}>{type.name}</span>
                </div>

                {/* Count */}
                <span className={styles.countDiv}>{type.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className={styles.P1}>Amenities</h3>
        <div className="space-y-3">
          {amenities.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity.name);
            return (
              <label
                key={amenity.name}
                className="flex justify-between items-center "
              >
                {/* Left side with custom checkbox + label */}
                <div className="flex items-center gap-3">
                  {/* Hidden checkbox for accessibility */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      toggleSelection(
                        amenity.name,
                        setSelectedAmenities,
                        selectedAmenities
                      )
                    }
                    className="hidden"
                  />

                  {/* Custom checkbox */}
                  <span
                    className={` ${styles.inputspan}
                ${isChecked ? "bg-blue-600 border-blue-600" : "border-gray-300"}
              `}
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  {/* Label */}
                  <span className={styles.span}>{amenity.name}</span>
                </div>

                {/* Count */}
                <span className={styles.countDiv}>{amenity.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Ratings */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className={styles.P1}>Guest Ratings</h3>
        <div className="space-y-3">
          {ratings
            .sort((a, b) => b.stars - a.stars)
            .map((r) => (
              <div
                key={r.stars}
                className="flex items-center justify-between cursor-pointer  rounded"
                onClick={() => setSelectedRating(r.stars)}
              >
                <div className="flex items-center ">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        selectedRating === r.stars
                          ? "text-[#FACA15] "
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.948c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.948a1 1 0 00-.364-1.118L2.078 9.375c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.948z" />
                    </svg>
                  ))}
                </div>
                <span className={styles.countDiv}>{r.count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Pricing */}
      {/* <div className="mb-6 ">
        <h3 className={styles.P1}>Pricing</h3>
        <input
          type="range"
          min={pricing.min}
          max={pricing.max}
          value={priceRange.to}
          onChange={(e) =>
            setPriceRange({ ...priceRange, to: Number(e.target.value) })
          }
          className="w-full mt-2 bg-gray-200 "
        />
        <div className="flex items-center w-full space-x-6 mb-1 ">
          <p className={styles.PP2}>From</p>
          <p className={styles.PP2}>To</p>
        </div>
        <div className="flex space-x-2 items-center">
          <input
            type="number"
            value={priceRange.from}
            onChange={(e) =>
              setPriceRange({ ...priceRange, from: Number(e.target.value) })
            }
            className="w-1/2 border border-gray-300 rounded-lg py-2 px-4 bg-gray-50 focus:outline-none "
            min={pricing.min}
            max={priceRange.to}
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange.to}
            onChange={(e) =>
              setPriceRange({ ...priceRange, to: Number(e.target.value) })
            }
            className="w-1/2 border border-gray-300 rounded-lg py-2 px-4 bg-gray-50 focus:outline-none"
            min={priceRange.from}
            max={pricing.max}
          />
        </div>
      </div> */}

      {/* Pricing */}

      {/* Pricing */}
      <div className="pb-6">
        <h3 className={styles.P1}>Pricing</h3>

        {/* Dual-thumb slider */}
        <div className="relative w-full mt-4 h-6">
          {/* Track bg */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded bg-gray-200"></div>

          {/* Selected range */}
          {(() => {
            const range = pricing.max - pricing.min;
            const leftPct = ((priceRange.from - pricing.min) / range) * 100;
            const rightPct = ((priceRange.to - pricing.min) / range) * 100;
            return (
              <div
                className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded"
                style={{
                  left: `${leftPct}%`,
                  width: `${Math.max(0, rightPct - leftPct)}%`,
                }}
              />
            );
          })()}

          {/* Min thumb (visual only) */}
          <input
            type="range"
            min={pricing.min}
            max={pricing.max}
            step={1}
            value={priceRange.from}
            readOnly
            className="absolute inset-0 w-full appearance-none bg-transparent range-thumb z-20 pointer-events-none"
          />

          {/* Max thumb (movable) */}
          <input
            type="range"
            min={pricing.min}
            max={pricing.max}
            step={1}
            value={priceRange.to}
            onChange={(e) => {
              const v = Number(e.target.value);
              const clamped = Math.min(
                pricing.max,
                Math.max(v, priceRange.from + 1)
              );
              setPriceRange({ ...priceRange, to: clamped });
              setInputs((prev) => ({ ...prev, to: String(clamped) }));
            }}
            className="absolute inset-0 w-full appearance-none bg-transparent range-thumb z-10"
          />
        </div>

        {/* Labels */}
        <div className="flex items-center w-full space-x-6 mb-1 mt-6">
          <p className={styles.PP2}>From</p>
          <p className={styles.PP2}>To</p>
        </div>

        {/* Number inputs */}
        <div className="flex space-x-2 items-center">
          {/* From input */}
          <input
            type="number"
            // placeholder={String(pricing.min)}
            placeholder={pricing.min.toLocaleString()}
            value={inputs.from}
            onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
            onBlur={() => {
              const v = Number(inputs.from || pricing.min);
              const clamped = Math.max(
                pricing.min,
                Math.min(v, priceRange.to - 1)
              );
              setPriceRange({ ...priceRange, from: clamped });
              setInputs((prev) => ({
                ...prev,
                from: clamped === pricing.min ? "" : String(clamped),
              }));
            }}
            className="no-spinner w-1/2 border border-gray-300 text-[#111928] text-sm font-normal rounded-lg py-2 px-4 bg-gray-50 focus:outline-none"
            min={pricing.min}
            max={priceRange.to - 1}
          />

          <span>-</span>

          {/* To input */}
          <input
            type="number"
            // placeholder={String(pricing.max)}
            placeholder={pricing.max.toLocaleString()}
            value={inputs.to}
            onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
            onBlur={() => {
              const v = Number(inputs.to || pricing.max);
              const clamped = Math.min(
                pricing.max,
                Math.max(v, priceRange.from + 1)
              );
              setPriceRange({ ...priceRange, to: clamped });
              setInputs((prev) => ({
                ...prev,
                to: clamped === pricing.max ? "" : String(clamped),
              }));
            }}
            className="no-spinner w-1/2 border text-[#111928] text-sm font-normal border-gray-300 rounded-lg py-2 px-4 bg-gray-50 focus:outline-none"
            min={priceRange.from + 1}
            max={pricing.max}
          />
        </div>
      </div>
    </div>
  );

  const footerButtons = (
    <div className="flex justify-between gap-4 mt-6">
      <button
        onClick={handleReset}
        className="bg-transparent border border-gray-200 text-gray-700 px-5 py-2.5 w-full rounded-lg"
      >
        Reset
      </button>
      <Button variant="primary" width="full" onClick={handleApply}>
        Apply
      </Button>
    </div>
  );

  /* ---------- Render: dropdown wrapper only gets dropdown classes & ref ---------- */

  if (variant === "dropdown") {
    return (
      <div className="absolute top-full mt-2 right-0 z-50 w-80 max-h-[70vh] rounded-lg shadow-lg bg-white flex flex-col">
        {/* Header */}
        <p className="text-gray-500 text-base p-4 ">Filter</p>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4">{content}</div>

        {/* Fixed footer */}
        <div className="p-4 -mt-4 rounded-lg bg-white">{footerButtons}</div>
      </div>
    );
  }

  // panel (inline) - original sizing/styling preserved
  return (
    <div className="bg-white p-2 space-y-4 w-full max-w-md">
      {content} {footerButtons}{" "}
    </div>
  );
}

export default SearchFilter;
