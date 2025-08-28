import CityCard from "@/atoms/CityCard";
import CarouselComp from "@/molecules/CarouselComp";
import FooterComp from "@/organisms/FooterComp";
import HeroSec from "@/molecules/HeroSec";
import PropertyCard from "@/molecules/PropertyCard";
// import { useState } from "react";
import BottomHero from "@/molecules/BottomHero";
import { useSession } from "next-auth/react";
import useSessionDetails from "@/hooks/useSessionDetails";
import { useEffect, useState } from "react";
import { location, property } from "src/helpers/dataTypes";
import {
  getLocations,
  getPopularProperties,
  getPropertiesNearby,
} from "./api/property";
import PageSkeletons from "@/components/PageSkeletons";

function Home(): JSX.Element {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();

  // const { data: session } = useSession();
  // console.log(session);

  const [cities, setCities] = useState([]);
  const [propertiesNearby, setPropertiesNearby] = useState<property[]>([]);
  const [popularProperties, setPopularProperties] = useState<property[]>([]);

  // GET CITIES
  useEffect(() => {
    const usersLattitude: any = localStorage.getItem("usersLattitude");
    const usersLongitude: any = localStorage.getItem("usersLongitude");
    console.log("lat/lng from localStorage:", usersLattitude, usersLongitude);
    getLocations().then((response) => {
      setCities(response.data.data);
    });

    getPropertiesNearby(usersLattitude, usersLongitude).then((response) => {
      console.log("Nearby API response:", response.data.data);
      setPropertiesNearby(response.data.data);
    });

    getPopularProperties().then((response) => {
      setPopularProperties(response.data.data);
    });
  }, []);

  const isLoggedIn = status === "authenticated";

  const points = 100;
  const [mounted, setMounted] = useState(false);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  // console.log("status", status);
  // console.log("property", propertiesNearby);

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroSec
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        points={points}
      />

      {/* city card section */}
      <section className="overflow-x-auto  ">
        <div className="flex  md:flex-row w-max md:w-full ">
          {cities?.map((city: location) => (
            <CityCard
              key={city.id}
              id={city.id}
              primaryText={city.name}
              secondaryText={city.cover_text}
              image={city.image_cover}
            />
          ))}
        </div>
      </section>

      {/* available near me */}
      <CarouselComp
        title="Available Near Me"
        itemsPerPage={3}
        className="mt-24 mb-16"
        items={propertiesNearby}
        renderItem={(listings) => (
          <PropertyCard
            photo={listings?.photo}
            name={listings?.name}
            neighbourhood={listings?.neighbourhood.name}
            rate={listings?.rate}
            rating={listings?.rating}
            rooms={listings?.rooms.name}
            id={listings?.id}
            isLoggedIn={isLoggedIn}
          />
        )}
      />

      {/* /////// section */}
      <section className="relative w-full mb-6 overflow-hidden">
        <img
          src="/images/bg-img.png"
          alt="section img"
          className="w-full object-cover "
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50" />

        {/* Top Text */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
          <p className="text-4xl text-gray-50 font-bold mb-2">
            Find Your Perfect Stay
          </p>
          <p className="text-2xl text-gray-50 font-normal w-[90%] text-center mx-auto ">
            Your Perfect Home Away From Home Awaits
          </p>
        </div>

        {/* Center Containers */}
        <div className="absolute  top-[40%] left-0 right-0 flex items-center justify-center">
          <div className="flex  items-center gap-6 w-[120%] justify-center">
            {/* Left card (partially outside) */}
            <div className=" border border-white bg-[#FFFFFF4D] opacity-75 rounded-2xl backdrop-blur-lg shadow-lg flex flex-col items-center  px-4 py-8 -ml-16 ">
              <div className="flex items-center justify-center">
                <img src="/images/E3.png" alt=" img" width={64} height={64} />
              </div>
              <p className="font-bold text-gray-50 text-xl mt-6 ">
                Instant Booking
              </p>
              <p className="text-base font-normal text-gray-200 text-center mt-2 ">
                Book immediately with our streamlined reservation system
              </p>
            </div>

            {/* Middle card (prominent) */}
            <div className=" bg-[#FFFFFF4D] border-4 border-white rounded-2xl shadow-xl backdrop-blur-xl flex flex-col items-center justify-center text-center px-10 py-8 ">
              <div className="flex items-center justify-center">
                <img src="/images/E1.png" alt=" img" width={97} height={97} />
              </div>
              <p className="font-bold text-gray-50 text-3xl mt-6 ">
                5 Star Apartments
              </p>
              <p className="text-2xl font-normal text-gray-200  mt-2 ">
                High-speed WiFi, fully equipped kitchen, premium bedding & more
              </p>
            </div>

            {/* Right card (partially outside) */}
            <div className=" border border-white bg-[#FFFFFF4D] opacity-75 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center  px-4 py-8 -mr-16">
              <div className="flex items-center justify-center">
                <img src="/images/E2.png" alt=" img" width={64} height={64} />
              </div>
              <p className="font-bold text-gray-50 text-xl mt-6 ">
                Superhost Quality
              </p>
              <p className="text-base font-normal text-center text-gray-200 w-full mt-2 ">
                Consistently rated 5-stars by guests for exceptional service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* popular apartments */}
      <CarouselComp
        title="Popular Apartments in Lagos"
        itemsPerPage={3}
        items={popularProperties}
        className="mb-24"
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

export default Home;
