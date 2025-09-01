import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { property } from "src/helpers/dataTypes";
import {
  getLocations,
  getPropertiesByLocation,
  getPropertiesNearby,
} from "../api/property";
import HeroSec from "@/molecules/HeroSec";
import FooterComp from "@/organisms/FooterComp";
import BottomHero from "@/molecules/BottomHero";
import SearchComp from "@/molecules/SearchComp";
import { useRouter } from "next/router";
import PageSkeletons from "@/components/PageSkeletons";

function PropertyCategory() {
  const router = useRouter();
  const { status } = useSession();

  const { category } = router.query;
  const { firstName, lastName } = useSessionDetails();

  // const [cities, setCities] = useState([]);
  const [cities, setCities] = useState<any[]>([]);
  const [properties, setProperties] = useState<property[]>([]);
  const [propertiesNearby, setPropertiesNearby] = useState<property[]>([]);
  const [popularProperties, setPopularProperties] = useState<property[]>([]);
  const [savedApartments, setSavedApartments] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  // const [thisPageLoads, setThisPageLoads] = useState(false);
  const [thisPageLoads, setThisPageLoads] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );

  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  // GET CITIES
  useEffect(() => {
    getLocations().then((response) => {
      setCities(response.data.data);
    });
  }, []);

  //  Fetch Apartments Near Me
  useEffect(() => {
    const usersLattitude: any = localStorage.getItem("usersLattitude");
    const usersLongitude: any = localStorage.getItem("usersLongitude");

    if (category !== "near-me") return; // only run for near-me

    setThisPageLoads(true);
    getPropertiesNearby(usersLattitude, usersLongitude).then((response) => {
      setProperties(response.data.data);
      console.log("near-me", response.data.data);
      setThisPageLoads(false);
    });
  }, [category]);

  //  Fetch Popular Apartments in Lagos
  useEffect(() => {
    if (category !== "popular-lagos") return; // only run for lagos
    if (cities.length === 0) return;

    const lagos = cities.find(
      (city: any) => city.name.toLowerCase() === "lagos"
    ) as { id: number; name: string } | undefined;

    if (!lagos) {
      setThisPageLoads(false);
      return;
    }

    setThisPageLoads(true);
    getPropertiesByLocation(lagos.id).then((response: any) => {
      setProperties(response.data.data);
      console.log("properties in lagos", response.data.data);
      setSelectedLocation("Lagos");
      setThisPageLoads(false);
    });
  }, [category, cities]);

  //  Fetch Apartments by Neighborhood or Location
  useEffect(() => {
    if (!category) return;
    if (category === "near-me" || category === "popular-lagos") return;

    const parts = category.toString().split("-");
    const type = parts[0];
    const id = Number(parts[1]); // neighborhoodId
    const locationId = Number(router.query.locationId);

    if (type === "neighborhood" && id && locationId) {
      getPropertiesByLocation(locationId)
        .then((response: any) => {
          const allProps = response.data.data || [];
          const filtered = allProps.filter(
            (prop: any) => prop.neighbourhood?.id === id
          );

          setProperties(filtered);
          setThisPageLoads(true);
          // ✅ Set selectedLocation immediately from API result
          if (filtered.length > 0) {
            const parentCity = filtered[0]?.location?.name;
            if (parentCity) setSelectedLocation(parentCity);
          }
        })
        .finally(() => setThisPageLoads(false));
    }
  }, [category, router.query.locationId]);

  console.log("selectedloc", selectedLocation);

  const handleRemove = (id: string | number) => {
    setSavedApartments((prev) => prev.filter((item) => item.id !== id));
  };

  let headingText = "";

  if (category === "popular-lagos") {
    headingText = "Apartments in Lagos";
  } else if (category === "near-me") {
    headingText = "Apartments Near Me";
  } else if (selectedLocation) {
    headingText = `Apartments in ${selectedLocation}`;
  } else {
    headingText = "No Apartments Found";
  }

  const isLoggedIn = status === "authenticated";

  const isLoading = !mounted || status === "loading" || thisPageLoads;

  if (isLoading) return <PageSkeletons />;
  // if (!mounted) return null; // hydration guard only
  // if (status === "loading" || thisPageLoads) return <PageSkeletons />;

  return (
    <main className="min-h-screen ">
      <HeroSec
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}

        // points={points}
      />

      <section className="w-[80%]  mx-auto mt-16 mb-32 ">
        <SearchComp
          properties={properties}
          onRemove={handleRemove}
          selectedLocation={selectedLocation}
          headingText={headingText}
          propertiesNearby={propertiesNearby}
          popularProperties={popularProperties}
        />
      </section>

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

export default PropertyCategory;
