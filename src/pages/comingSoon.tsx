import Image from "next/image";
import CityCard from "@/atoms/CityCard";
import { useEffect, useState } from "react";
import { location } from "src/helpers/dataTypes";
import { getLocations } from "./api/property";
import bgImg from "public/images/comingsoon.png";
import logoText from "public/images/Text.png";

function ComingSoon() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getLocations().then((response) => {
      setCities(response.data.data);
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col ">
      <section className="relative w-full ">
        <Image
          src={bgImg}
          alt="hero section img"
          priority
          className="object-cover"
        />

        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
          <Image src={logoText} alt="Easy Stay Logo" width={153} height={64} />
        </div>

        <div className="absolute top-[38%] left-0 right-0 flex items-center justify-center">
          <div className=" bg-[#00000033]  w-[70%] rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center justify-center text-center h-[283px] py-8 ">
            <p className="font-semibold text-white text-5xl ">
              Coming Soon...!
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-x-auto -mt-2  ">
        <div className="flex  md:flex-row w-max md:w-full ">
          {cities?.map((city: location) => (
            <CityCard
              key={city.id}
              id={city.id}
              primaryText={city.name}
              secondaryText={city.cover_text}
              image={city.image_cover}
              clickable={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ComingSoon;
