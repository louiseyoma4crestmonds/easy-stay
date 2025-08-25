import CityCard from "@/atoms/CityCard";
import CarouselComp from "@/molecules/CarouselComp";
import FooterComp from "@/organisms/FooterComp";
import HeroSec from "@/molecules/HeroSec";
import PropertyCard from "@/molecules/PropertyCard";
// import { useState } from "react";
import BottomHero from "@/molecules/BottomHero";
import { useSession } from "next-auth/react";
import useSessionDetails from "@/hooks/useSessionDetails";

function Home(): JSX.Element {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const cities = [
    {
      primaryText: "Lagos",
      secondaryText: "Over 10,000 apartments available",
      image: "/images/lagos.png",
    },
    {
      primaryText: "FCT, Abuja",
      secondaryText: "Over 1,000 apartments available",
      image: "/images/abuja.png",
    },
    {
      primaryText: "Port Harcourt",
      secondaryText: "Coming Soon.!",
      image: "/images/pH.png",
    },
  ];

  const SampleListings = [
    {
      id: 1,
      images: [
        "/images/sample-image.png",
        "/images/abuja.png",
        "/images/lagos.png",
      ],
      title: "Luxury Suite, Lekki",
      location: "Ikeja, Lagos",
      price: 120000,
      rating: 4.8,
      bedrooms: 2,
    },
    {
      id: 2,
      images: [
        "/images/sample-image.png",
        "/images/abuja.png",
        "/images/sample-image.png",
        "/images/lagos.png",
      ],
      title: "Luxury Suite, Lekki",
      location: "Ajah, Lagos",
      price: 250000,
      rating: 2.8,
      bedrooms: 1,
    },
    {
      id: 3,
      images: [
        "/images/sample-image.png",
        "/images/abuja.png",
        "/images/sample-image.png",
        "/images/lagos.png",
        "/images/sample-image.png",
      ],
      title: "Luxury Suite, Lekki",
      location: "Maitama, Abuja",
      price: 100000,
      rating: 3.4,
      bedrooms: 3,
    },
    {
      id: 4,
      images: [
        "/images/abuja.png",
        "/images/sample-image.png",
        "/images/abuja.png",
        "/images/sample-image.png",
        "/images/lagos.png",
      ],
      title: "Luxury Suite, Lekki",
      location: "Ajah, Lagos",
      price: 450000,
      rating: 1.8,
      bedrooms: 1,
    },
    {
      id: 5,
      images: [
        "/images/sample-image.png",
        "/images/abuja.png",
        "/images/sample-image.png",
        "/images/lagos.png",
        "/images/sample-image.png",
      ],
      title: "Luxury Suite, Lekki",
      location: "Maitama, Abuja",
      price: 100000,
      rating: 3.4,
      bedrooms: 3,
    },
  ];

  const isLoggedIn = status === "authenticated";

  const points = 100;

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
          {cities.map((city, index) => (
            <CityCard
              key={index}
              primaryText={city.primaryText}
              secondaryText={city.secondaryText}
              image={city.image}
            />
          ))}
        </div>
      </section>

      {/* available near me */}
      <CarouselComp
        title="Available Near Me"
        itemsPerPage={3}
        items={SampleListings}
        renderItem={(listing) => <PropertyCard {...listing} isSaved={false} />}
        className="mt-24"
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
        items={SampleListings}
        renderItem={(listing) => <PropertyCard {...listing} isSaved={false} />}
      />

      {/*gift section*/}
      <BottomHero
        backgroundImage="/images/empty-state.svg"
        leftImage="/images/gift-boxes.png"
        title="Book & Be Rewarded!"
        description="Earn reward points with every apartment booking. These points can be redeemed for incredible benefits, including a free apartment stay or even free airport transport."
        buttons={[
          { label: "Explore Apartments", link: "/", variant: "explore" },
        ]}
        divClass="items-start"
      />

      <FooterComp />
    </main>
  );
}

export default Home;
