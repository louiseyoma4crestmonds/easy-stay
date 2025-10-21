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

  const [cities, setCities] = useState([]);
  const [propertiesNearby, setPropertiesNearby] = useState<property[]>([]);
  const [popularProperties, setPopularProperties] = useState<property[]>([]);
  const [mounted, setMounted] = useState(false);
  const [thisPageLoads, setThisPageLoads] = useState(true);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

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

  // GET CITIES
  // useEffect(() => {
  //   const usersLattitude: any = localStorage.getItem("usersLattitude");
  //   const usersLongitude: any = localStorage.getItem("usersLongitude");

  //   getLocations().then((response) => {
  //     setCities(response.data.data);
  //   });

  //   getPropertiesNearby(usersLattitude, usersLongitude).then((response) => {
  //     setPropertiesNearby(response.data.data);
  //   });

  //   getPopularProperties().then((response) => {
  //     setPopularProperties(response.data.data);
  //   });
  // }, []);

  useEffect(() => {
    const usersLattitude: any = localStorage.getItem("usersLattitude");
    const usersLongitude: any = localStorage.getItem("usersLongitude");

    setThisPageLoads(true);

    Promise.allSettled([
      getLocations(),
      getPropertiesNearby(usersLattitude, usersLongitude),
      getPopularProperties(),
    ]).then((results) => {
      // locations
      if (results[0].status === "fulfilled") {
        setCities(results[0].value.data.data);
      }

      // nearby
      if (results[1].status === "fulfilled") {
        setPropertiesNearby(results[1].value.data.data);
      }

      // popular
      if (results[2].status === "fulfilled") {
        setPopularProperties(results[2].value.data.data);
      }

      setThisPageLoads(false); //  hide skeleton no matter what
    });
  }, []);

  const isLoggedIn = status === "authenticated";

  // const isLoading = !mounted || status === "loading" || thisPageLoads;
  const isLoading = !mounted || status === "loading" || thisPageLoads;

  if (isLoading) return <PageSkeletons />;

  const points = 100;

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroSec
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        points={points}
        isMobile={isMobile}
      />

      {/* city card section */}
      <section className="overflow-x-auto md:overflow-x-hidden ">
        <div className="flex flex-row w-max md:w-full md:flex-wrap ">
          {cities?.map((city: location) => (
            <div
              key={city.id}
              className="min-w-[320px] sm:min-w-[370px] md:min-w-0 md:flex-1"
            >
              <CityCard
                key={city.id}
                id={city.id}
                primaryText={city.name}
                secondaryText={city.cover_text}
                image={city.image_cover}
              />{" "}
            </div>
          ))}
        </div>
      </section>

      {/* available near me */}
      <section className=" w-[90%] md:w-[80%] flex justify-center items-center mx-auto ">
        <CarouselComp
          title="Available Near Me"
          itemsPerPage={3}
          items={propertiesNearby}
          className="md:my-20  "
          renderItem={(listings) => (
            <PropertyCard
              photo={listings?.photo}
              name={listings?.name}
              price={listings?.price}
              description={listings.description}
              neighbourhood={listings?.neighbourhood.name}
              rate={listings?.rate}
              rating={listings?.rating}
              rooms={listings?.type.name}
              id={listings?.id}
            />
          )}
        />
      </section>

      {/* /////// section */}
      <section className="relative w-full mb-6 md:py-5  overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/bg-img.png"
            alt="section background"
            className="w-full h-full object-cover"
          />
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50" />
        </div>

        {/* Top Text */}
        <div className="relative text-center text-white pt-8 px-4">
          <p className="md:text-4xl text-gray-50 font-bold mb-0 md:mb-2">
            Find Your Perfect Stay
          </p>
          <p className="text-sm md:text-2xl mt-0.5 md:mt-2 text-gray-50 font-normal w-[90%] text-center mx-auto ">
            Your Perfect Home Away From Home Awaits
          </p>
        </div>

        {/* Center Containers */}
        <div className="relative py-10  flex items-center justify-center">
          <div className="flex  items-center gap-2 md:gap-6 w-[120%] justify-center">
            {/* Left card (partially outside) */}
            <div className=" border border-white bg-[#FFFFFF4D] opacity-75 rounded-lg md:rounded-2xl backdrop-blur-lg shadow-lg flex flex-col items-center p-2  md:px-4 md:py-8 -ml-16 ">
              <div className="flex items-center justify-center">
                <img
                  src="/images/E3.png"
                  alt=" img"
                  className="w-4 h-4  md:w-16 md:h-16 object-contain "
                />
              </div>
              <p className="font-bold text-gray-50 text-[5px] md:text-xl mt-1 md:mt-6 ">
                Instant Booking
              </p>
              <p className="text-[4px] md:text-base font-normal text-gray-200 text-center mt-2 ">
                Book immediately with our streamlined reservation system
              </p>
            </div>

            {/* Middle card (prominent) */}
            <div className=" bg-[#FFFFFF4D] border-2 md:border-4 border-white rounded-lg md:rounded-2xl shadow-xl backdrop-blur-xl flex flex-col items-center justify-center text-center px-2 md:px-10 py-2 md:py-14 ">
              <div className="flex items-center justify-center">
                <img
                  src="/images/E1.png"
                  alt=" img"
                  className="w-6 h-6  md:w-24 md:h-24 object-contain "
                />
              </div>
              <p className="font-bold text-gray-50 text-[8px] md:text-3xl mt-2 md:mt-10 ">
                5 Star Apartments
              </p>
              <p className="text-[6px] md:text-2xl font-normal text-gray-200 w-[70%]  mt-2 ">
                High-speed WiFi, fully equipped kitchen, premium bedding & more
              </p>
            </div>

            {/* Right card (partially outside) */}
            <div className=" border border-white bg-[#FFFFFF4D] opacity-75 backdrop-blur-lg rounded-lg md:rounded-2xl shadow-lg flex flex-col items-center p-2  md:px-4  md:py-8 -mr-16">
              <div className="flex items-center justify-center">
                <img
                  src="/images/E2.png"
                  alt=" img"
                  className="w-4 h-4  md:w-16 md:h-16 object-contain "
                />
              </div>
              <p className="font-bold text-gray-50 text-[5px] md:text-xl mt-1 md:mt-6 ">
                Superhost Quality
              </p>
              <p className="text-[4px] md:text-base font-normal text-center text-gray-200 w-full mt-2 ">
                Consistently rated 5-stars by guests for exceptional service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* popular apartments */}

      <section className="w-[90%] md:w-[80%] flex justify-center items-center mx-auto ">
        <CarouselComp
          title="Popular Apartments"
          itemsPerPage={3}
          items={popularProperties}
          className=" md:mb-28 "
          renderItem={(listings) => (
            <PropertyCard
              photo={listings?.photo}
              name={listings?.name}
              description={listings.description}
              neighbourhood={listings?.neighbourhood.name}
              rate={""}
              price={listings?.price}
              rating={listings?.rating}
              rooms={listings?.type.name}
              id={listings?.id}
            />
          )}
        />{" "}
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

export default Home;
