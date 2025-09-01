import Pagination from "@/organisms/Pagination";
import PropertyCard from "../PropertyCard";
import SearchFilter from "../SearchFilter";
import styles from "./SearchComp.module.css";
import { SearchCompProps } from "./SearchComp.types";
import { useState } from "react";
import { property } from "src/helpers/dataTypes";
import NoSearchResults from "../NoSearchResults";

function SearchComp(props: SearchCompProps) {
  const {
    properties,
    onRemove,
    selectedLocation,
    headingText,
    propertiesNearby,
    popularProperties,
  } = props;
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  // const locations = [
  //   { name: "Lagos", count: 120 },
  //   { name: "Abuja", count: 80 },
  //   { name: "Port Harcourt", count: 5 },
  // ];

  const apartmentTypes = [
    { name: "1 Bedroom", count: 7 },
    { name: "2 Bedroom", count: 5 },
    { name: "Miniflat", count: 4 },
    { name: "Studio", count: 3 },
    { name: "Duplex", count: 2 },
  ];

  const amenities = [
    { name: "Pool", count: 6 },
    { name: "Gym", count: 5 },
    { name: "Wi-Fi", count: 8 },
    { name: "Parking", count: 4 },
  ];

  const ratings = [
    { stars: 5, count: 10 },
    { stars: 4, count: 7 },
    { stars: 3, count: 5 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ];

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
  console.log("locations", locations);
  console.log("properties", properties);

  console.log("loacations", locations);
  const pricing = { min: 0, max: 500000 };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Call your API or filter your data here
  };

  return (
    <div className="w-full flex   gap-6  mx-auto  ">
      <div className="w-[27%]  ">
        <SearchFilter
          locations={locations}
          apartmentTypes={apartmentTypes}
          amenities={amenities}
          ratings={ratings}
          pricing={pricing}
          onApply={handleApplyFilters}
          defaultSelectedLocation={selectedLocation}
        />{" "}
      </div>

      {properties.length === 0 ? (
        <div className={styles.maindiv}>
          {" "}
          <NoSearchResults
            propertiesNearby={propertiesNearby}
            popularProperties={popularProperties}
          />{" "}
        </div>
      ) : (
        <div
          className={`${styles.maindiv} flex flex-col justify-between min-h-screen`}
        >
          <div>
            <div className="flex justify-start items-center space-x-2 mb-4  ">
              <p className="text-gray-800 text-2xl font-medium ">
                {" "}
                {headingText}
              </p>{" "}
              <p className="bg-gray-100 py-0.5 px-2.5 rounded-full text-gray-900 text-xs font-normal mb-2 ">
                {" "}
                {properties.length}{" "}
              </p>
            </div>
            <div className=" grid grid-cols-2 gap-4 mb-6 ">
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
