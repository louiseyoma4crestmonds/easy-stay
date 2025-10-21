import Pagination from "@/organisms/Pagination";
import PropertyCard from "../PropertyCard";
import SearchFilter from "../SearchFilter";
import styles from "./SearchComp.module.css";
import { SearchCompProps } from "./SearchComp.types";
import { useEffect, useRef, useState } from "react";
import NoSearchResults from "../NoSearchResults";
import { searchWithFilterParameters } from "src/pages/api/property";
import ListIcon from "@/atoms/Icons/ListIcon";
import GridIcon from "@/atoms/Icons/GridIcon";
import ListView from "../ListView";

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
    isLoggedIn,
  } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Calculate indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedFilters, setSelectedFilters] = useState<
    { category: string; value: string }[]
  >([]);

  // const locations = getLocations(properties);
  const pricing = { min: 0, max: 500000 };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Call your API or filter your data here
    searchWithFilterParameters(filters).then((response: any) => {
      console.log("Manu: ", response.data.data);
      console.log("filters", filters);
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

  const tabsIcon = [
    { type: "grid", Icon: GridIcon },
    { type: "list", Icon: ListIcon },
  ];

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
            <div className="flex items-center justify-between  ">
              <div className="flex justify-start items-center space-x-1 mb-4  ">
                <p className="text-gray-800 text-base md:text-2xl font-medium ">
                  {" "}
                  {headingText}
                </p>{" "}
                <p className="bg-gray-100 py-0.5 px-2.5 rounded-full text-gray-900 text-xs font-normal ">
                  {" "}
                  {properties.length}{" "}
                </p>
              </div>

              <div className="hidden md:flex gap-2 items-center border rounded-lg p-[10px] border-gray-300 ">
                {[...tabsIcon]
                  // put the active one first
                  .sort((a, b) =>
                    a.type === viewMode ? -1 : b.type === viewMode ? 1 : 0
                  )
                  .map(({ type, Icon }) => (
                    <button
                      key={type}
                      onClick={() => setViewMode(type as "grid" | "list")}
                      className=""
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          viewMode === type ? "text-blue-600" : "text-gray-800"
                        }`}
                      />
                    </button>
                  ))}
              </div>
            </div>
            {viewMode === "grid" ? (
              <div className=" grid md:grid-cols-2 gap-4 md:mt-4 mb-6 ">
                {currentItems.map((apt) => (
                  <PropertyCard
                    key={apt.id}
                    photo={apt?.photo}
                    name={apt?.name}
                    description={apt.description}
                    neighbourhood={apt?.neighbourhood.name}
                    rate={apt?.rate}
                    rating={apt?.rating}
                    rooms={apt?.type.name}
                    id={apt?.id}
                    onSave={(id, isSaved) => {
                      if (!isSaved) {
                        onRemove(id);
                      }
                    }}
                  />
                ))}{" "}
              </div>
            ) : (
              <div className="md:mt-4 ">
                <ListView
                  properties={currentItems}
                  isLoggedIn={isLoggedIn}
                />{" "}
              </div>
              // <div className=" flex flex-col ">
              //   {currentItems.map((apt) => (
              //     <ListView
              //       key={apt.id}
              //       photo={apt?.photo}
              //       name={apt?.name}
              //       description={apt.description}
              //       neighbourhood={apt?.neighbourhood.name}
              //       rate={apt?.rate}
              //       rating={apt?.rating}
              //       rooms={apt?.rooms.name}
              //       id={apt?.id}
              //       onSave={(id, isSaved) => {
              //         if (!isSaved) {
              //           onRemove(id);
              //         }
              //       }}
              //     />
              //   ))}{" "}
              // </div>
            )}
          </div>
          <div className="w-full flex justify-center pt-6  ">
            <Pagination
              listOfItems={properties}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
              paginationDivActiveClass="bg-primary-600 text-white "
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
