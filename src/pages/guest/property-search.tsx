import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { property } from "src/helpers/dataTypes";
import {
  getLocations,
  getPopularProperties,
  getPropertiesByLocation,
  getPropertiesNearby,
} from "../api/property";
import HeroSec from "@/molecules/HeroSec";
import FooterComp from "@/organisms/FooterComp";
import BottomHero from "@/molecules/BottomHero";
import SearchComp from "@/molecules/SearchComp";
import { useRouter } from "next/router";
import PageSkeletons from "@/components/PageSkeletons";

function PropertySearch() {
  const router = useRouter();
  const { status } = useSession();
  const {
    location,
    checkin,
    checkout,
    adults,
    children,
    infants,
    pets,
    locationId,
  } = router.query;
  // const { category, ...query } = router.query;
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

  const initialGuests = {
    adults: Number(adults || 0),
    children: Number(children || 0),
    infants: Number(infants || 0),
    pets: Number(pets || 0),
  };
  const [width, setWidth] = useState<number>(0);
  const isMobile = width <= 767;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  // GET CITIES
  useEffect(() => {
    const usersLattitude: any = localStorage.getItem("usersLattitude");
    const usersLongitude: any = localStorage.getItem("usersLongitude");

    getLocations().then((response) => {
      setCities(response.data.data);
    });

    getPropertiesNearby(usersLattitude, usersLongitude).then((response) => {
      setPropertiesNearby(response.data.data);
    });

    getPopularProperties().then((response) => {
      setPopularProperties(response.data.data);
    });
  }, []);

  // 🔑 Main fetch logic (combined categories + query params)
  // destructure only what you need

  useEffect(() => {
    if (!router.isReady || cities.length === 0) return;

    const fetchData = async () => {
      setThisPageLoads(true);
      try {
        // ✅ Case 2: query params (HeroSec search)
        if (location) {
          const matchedCity = cities.find(
            (c) => c.name.toLowerCase() === location.toString().toLowerCase()
          );
          if (matchedCity) {
            const res = await getPropertiesByLocation(matchedCity.id);
            let results = res.data.data || [];
            if (adults) {
              results = results.filter(
                (p: any) => p.maxAdults >= Number(adults)
              );
            }
            setProperties(results);
            setSelectedLocation(matchedCity.name);
            return;
          }
        }

        setProperties([]);
      } finally {
        setThisPageLoads(false);
      }
    };

    fetchData();
  }, [
    location,
    checkin,
    checkout,
    adults,
    children,
    infants,
    pets,
    locationId,
    cities,
    router.isReady,
  ]);

  const handleRemove = (id: string | number) => {
    setSavedApartments((prev) => prev.filter((item) => item.id !== id));
  };

  // for the text
  let headingText = "";

  if (properties.length > 0) {
    headingText = `Apartments in ${properties[0].neighbourhood?.name ?? ""}`;
  } else {
    headingText = "No Apartments Found";
  }

  const isLoggedIn = status === "authenticated";

  const isLoading = !mounted || status === "loading" || thisPageLoads;

  if (isLoading) return <PageSkeletons />;
  // if (!mounted) return null; // hydration guard only
  // if (status === "loading" || thisPageLoads) return <PageSkeletons />;

  return (
    <main className="min-h-screen flex flex-col  ">
      <HeroSec
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        initialLocation={location as string}
        initialCheckin={checkin ? new Date(checkin as string) : null}
        initialCheckout={checkout ? new Date(checkout as string) : null}
        initialGuests={initialGuests}
        isMobile={isMobile}
        // points={points}
      />

      <section className="w-[90%] md:w-[80%]  mx-auto mt-8 md:mt-16 mb-16 md:mb-32 ">
        <SearchComp
          properties={properties}
          onRemove={handleRemove}
          selectedLocation={selectedLocation}
          headingText={headingText}
          propertiesNearby={propertiesNearby}
          popularProperties={popularProperties}
          isMobile={isMobile}
          setProperties={setProperties}
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
        divClass="items-center md:items-start"
      />

      <FooterComp data={cities} />
    </main>
  );
}

export default PropertySearch;
