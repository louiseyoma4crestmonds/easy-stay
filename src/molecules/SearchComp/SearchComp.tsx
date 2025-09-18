import Pagination from "@/organisms/Pagination";
import PropertyCard from "../PropertyCard";
import SearchFilter from "../SearchFilter";
import styles from "./SearchComp.module.css";
import { SearchCompProps } from "./SearchComp.types";
import { useEffect, useRef, useState } from "react";
import { property, PropertyType } from "src/helpers/dataTypes";
import NoSearchResults from "../NoSearchResults";
import {
  getApartmentTypes,
  searchWithFilterParameters,
} from "src/pages/api/property";

// utils/filters.ts
export function flattenFilters(
  filters: any
): { category: string; value: string }[] {
  const applied: { category: string; value: string }[] = [];

  if (filters.locations?.length) {
    filters.locations.forEach((loc: string) =>
      applied.push({ category: "Location", value: loc })
    );
  }

  if (filters.apartmentTypes?.length) {
    filters.apartmentTypes.forEach((apt: string) =>
      applied.push({ category: "Apartment Type", value: apt })
    );
  }

  if (filters.amenities?.length) {
    filters.amenities.forEach((a: string) =>
      applied.push({ category: "Amenities", value: a })
    );
  }

  if (filters.rating) {
    applied.push({ category: "Rating", value: `${filters.rating}★` });
  }

  if (filters.priceRange) {
    applied.push({
      category: "Price",
      value: `₦${filters.priceRange.min} - ₦${filters.priceRange.max}`,
    });
  }

  return applied;
}

function SearchComp(props: SearchCompProps) {
  const {
    properties,
    onRemove,
    selectedLocation,
    headingText,
    propertiesNearby,
    popularProperties,
    isMobile,
    setProperties,
  } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // Calculate indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedFilters, setSelectedFilters] = useState<
    { category: string; value: string }[]
  >([]);

  // const locations = [
  //   { name: "Lagos", count: 120 },
  //   { name: "Abuja", count: 80 },
  //   { name: "Port Harcourt", count: 5 },
  // ];

  const [apartmentTypess, setApartmentTypes] = useState([]);

  useEffect(() => {
    getApartmentTypes().then((response: any) => {
      setApartmentTypes(response.data.data);
    });
  }, []);

  // build location counts dynamically
  type LocationCount = { name: string; count: number };

  const getLocations = (properties: property[]): LocationCount[] => {
    const counts: Record<string, number> = {};

    properties.forEach((prop) => {
      const locName = prop.location?.name; // parent city: Lagos, Abuja, etc
      if (locName) {
        counts[locName] = (counts[locName] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const locations = getLocations(properties);
  const pricing = { min: 0, max: 500000 };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Call your API or filter your data here
    searchWithFilterParameters(filters).then((response: any) => {
      console.log("Manu: ", response.data.data);
      setProperties(response.data.data);
    });

    // for mobile chips
    setSelectedFilters(flattenFilters(filters));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    }
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div className="w-full flex flex-col md:flex-row   md:gap-6  mx-auto  ">
      <div className=" hidden md:flex w-[27%]  ">
        <SearchFilter
          pricing={pricing}
          onApply={handleApplyFilters}
          defaultSelectedLocation={selectedLocation}
        />{" "}
      </div>
      <div className=" md:hidden w-full relative mb-6 " ref={dropdownRef}>
        {selectedFilters.length === 0 ? (
          <div
            className={styles.mobileSearch}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <div className="flex items-center  ">
              <img
                src="/images/filter-outline.png"
                alt="filter-icon"
                className="w-4 h-4 inline-block mr-2"
              />
              Filter by{" "}
            </div>
            <img
              src="/images/chevron-down-outline.png"
              alt="dropdown-icon"
              className="w-3 h-3 inline-block "
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar  py-2">
            <div
              className="border-gray-300 rounded-lg bg-gray-50 border px-4 py-3  shrink-0 cursor-pointer "
              onClick={() => setShowFilter((prev) => !prev)}
            >
              {" "}
              <img
                src="/images/filter-outline.png"
                alt="filter-icon"
                className="w-4 h-4 inline-block "
              />
            </div>
            <div className="flex gap-2">
              {selectedFilters.map((filter) => (
                <div
                  key={filter.category + filter.value}
                  className="flex items-center border-gray-300 text-gray-500 text-sm rounded-lg bg-gray-50 border px-4 py-3 gap-2.5 truncate"
                >
                  <span className="">
                    {" "}
                    {filter.category} - {filter.value}
                  </span>
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-800"
                    onClick={() =>
                      setSelectedFilters((prev) =>
                        prev.filter(
                          (f) =>
                            !(
                              f.category === filter.category &&
                              f.value === filter.value
                            )
                        )
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showFilter && (
          <SearchFilter
            variant="dropdown"
            pricing={pricing}
            onApply={handleApplyFilters}
            defaultSelectedLocation={selectedLocation}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>

      {properties.length === 0 ? (
        <div className={styles.maindiv}>
          {" "}
          <NoSearchResults
            propertiesNearby={propertiesNearby}
            popularProperties={popularProperties}
            isMobile={isMobile}
          />{" "}
        </div>
      ) : (
        <div
          className={`${styles.maindiv} flex flex-col justify-between min-h-screen`}
        >
          <div>
            <div className="flex justify-start items-center space-x-2 mb-4  ">
              <p className="text-gray-800 text-base md:text-2xl font-medium ">
                {" "}
                {headingText}
              </p>{" "}
              <p className="bg-gray-100 py-0.5 px-2.5 rounded-full text-gray-900 text-xs font-normal md:mb-2 ">
                {" "}
                {properties.length}{" "}
              </p>
            </div>
            <div className=" grid md:grid-cols-2 gap-4 mb-6 ">
              {currentItems.map((apt) => (
                <PropertyCard
                  key={apt.id}
                  photo={apt?.photo}
                  name={apt?.name}
                  neighbourhood={apt?.neighbourhood.name}
                  rate={apt?.rate}
                  rating={apt?.rating}
                  rooms={apt?.rooms.name}
                  id={apt?.id}
                  onSave={(id, isSaved) => {
                    if (!isSaved) {
                      onRemove(id); // delegate removal to parent
                    }
                  }}
                />
              ))}{" "}
            </div>{" "}
          </div>
          <div className="w-full flex justify-center pt-6  ">
            <Pagination
              listOfItems={properties}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
              prevButton="Previous"
              nextButton="Next"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchComp;
