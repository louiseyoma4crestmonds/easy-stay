import Image from "next/image";
import styles from "./NoSearchResults.module.css";
import PropertyCard from "../PropertyCard";
import CarouselComp from "../CarouselComp";
import { property } from "src/helpers/dataTypes";

type NoSearchResultsProps = {
  popularProperties: property[];
  propertiesNearby: property[];
};

function NoSearchResults({
  propertiesNearby,
  popularProperties,
}: NoSearchResultsProps) {
  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-col items-center justify-center ">
        <Image src="/images/Navigation_empty.png" width={180} height={180} />
        <p className="text-gray-800 text-xl font-medium mt-4 ">
          No result found
        </p>
        <p className="text-gray-600 text-base font-normal text-center w-[60%]  ">
          {" "}
          Looks like your search didn't return any results. Don't worry, we've
          got plenty of other recommendations for you to explore below!
        </p>
      </div>

      {/* available near me */}
      <CarouselComp
        title="Available Near Me"
        itemsPerPage={2}
        items={propertiesNearby}
        showArrows={false}
        renderItem={(listings) => (
          <PropertyCard
            photo={listings?.photo}
            name={listings?.name}
            neighbourhood={listings?.neighbourhood.name}
            rate={listings?.rate}
            rating={listings?.rating}
            rooms={listings?.rooms.name}
            id={listings?.id}
          />
        )}
      />

      <CarouselComp
        title="Popular Apartments in Lagos"
        itemsPerPage={2}
        items={popularProperties}
        showArrows={false}
        renderItem={(listings) => (
          <PropertyCard
            photo={listings?.photo}
            name={listings?.name}
            neighbourhood={listings?.neighbourhood.name}
            rate={listings?.rate}
            rating={listings?.rating}
            rooms={listings?.rooms.name}
            id={listings?.id}
          />
        )}
      />
    </div>
  );
}

export default NoSearchResults;
