import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { property } from "src/helpers/dataTypes";
import { getLocations, getPropertiesByLocation } from "../api/property";
import { useSession } from "next-auth/react";
import useSessionDetails from "@/hooks/useSessionDetails";
import HeroSec from "@/molecules/HeroSec";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";
import CarouselComp from "@/molecules/CarouselComp";
import PropertyCard from "@/molecules/PropertyCard";
import PageSkeletons from "@/components/PageSkeletons";

function Properties() {
  const router = useRouter();
  const [properties, setProperties] = useState<property[]>([]);
  const [cities, setCities] = useState([]);
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";
  const [mounted, setMounted] = useState(false);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  // GET CITIES
  useEffect(() => {
    getLocations().then((response) => {
      setCities(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (router.query.location !== undefined) {
      getPropertiesByLocation(router.query.location).then((response: any) => {
        setProperties(response.data.data);
      });
    }
  }, [router.query.location]);

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  console.log("properties", properties);

  const groupedByNeighborhood = properties.reduce(
    (acc, property) => {
      const neighborhoodName = property?.neighbourhood?.name || "Other";

      // Only add if property is valid
      if (property) {
        if (!acc[neighborhoodName]) {
          acc[neighborhoodName] = [];
        }
        acc[neighborhoodName].push(property);
      }

      return acc;
    },
    {} as Record<string, typeof properties>
  );

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroSec
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
      />
      <div className="flex justify-center items-center space-x-2 mt-12  ">
        <p className="text-gray-800 text-2xl font-medium ">
          {" "}
          Explore Apartments in{" "}
          {properties.length > 0 ? properties[0].location.name : ""}
        </p>{" "}
        <p className="bg-gray-100 py-0.5 px-2.5 rounded-full text-gray-900 text-xs font-normal ">
          {" "}
          {properties.length}{" "}
        </p>
      </div>

      {Object.entries(groupedByNeighborhood).map(
        ([neighborhood, properties]) =>
          properties.length > 0 && ( // ✅ ensures at least 1 apartment
            <CarouselComp
              key={neighborhood}
              title={`Apartments in ${neighborhood}`}
              itemsPerPage={3}
              items={properties}
              renderItem={(listing) => (
                <PropertyCard
                  key={listing.id}
                  photo={listing.photo}
                  name={listing.name}
                  neighbourhood={listing.neighbourhood.name}
                  rate={listing.rate}
                  rating={listing.rating}
                  rooms={listing.rooms.name}
                  id={listing.id}
                />
              )}
            />
          )
      )}

      {/*gift section*/}
      <BottomHero
        backgroundImage="/images/empty-state.svg"
        leftImage="/images/gift-boxes.png"
        title="Book & Be Rewarded!"
        description="Earn reward points with every apartment booking. These points can be redeemed for incredible benefits, including a free apartment stay or even free airport transport."
        buttons={[
          {
            label: "Explore Apartments",
            link: "/guest/properties?location=1",
            variant: "explore",
          },
        ]}
        divClass="items-start"
      />

      <FooterComp data={cities} />
    </main>
  );
}

export default Properties;
