import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLocations } from "./api/property";
import PageSkeletons from "@/components/PageSkeletons";
import HeroBanner from "@/organisms/HeroBanner";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";

function TermsOfService() {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";
  const [mounted, setMounted] = useState(false);
  const [cities, setCities] = useState([]);
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
  useEffect(() => {
    getLocations().then((response) => {
      setCities(response.data.data);
    });
  }, []);

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroBanner
        backgroundImg="/images/terms.png"
        primaryText="Term of Service"
        secondaryText="We are big on our terms and values"
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        isMobile={isMobile}
      />

      <section className="bg-gray-50 px-5 md:px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-5 md:p-10">
          <div className="w-full md:w-[70%] ">
            <p className="text-base text-gray-800 font-normal mb-6 ">
              Here are some descriptive terms for "Easy Stay," playing on its
              name and core purpose as a short-let platform:
            </p>
            <ul className="list-disc text-base text-gray-800 font-normal pl-10 space-y-6 ">
              <li>
                <span className="font-bold ">Effortless Stays: </span>{" "}
                Highlights the ease and simplicity for guests.
              </li>
              <li>
                <span className="font-bold ">Seamless Hosting: </span>{" "}
                Emphasizes the smooth experience for property owners.
              </li>
              <li>
                <span className="font-bold "> Your Home Away: </span> Conveys
                comfort, warmth, and a sense of belonging for travelers.
              </li>
              <li>
                <span className="font-bold ">Curated Comfort: </span> Suggests
                carefully selected properties offering high-quality amenities
                and design.
              </li>
              <li>
                <span className="font-bold ">Reliable Rentals: </span> Focuses
                on trustworthiness and dependability for both booking and
                hosting.
              </li>
              <li>
                <span className="font-bold ">Flexible Living: </span> Points to
                the adaptability and convenience of short-term accommodations.
              </li>
              <li>
                <span className="font-bold ">Connected Community: </span>{" "}
                Suggests a network of hosts and guests, fostering positive
                interactions.
              </li>
              <li>
                <span className="font-bold ">
                  {" "}
                  Smart Stays, Smart Earnings:{" "}
                </span>{" "}
                Combines the guest benefit of intelligent booking with the host
                benefit of income generation.
              </li>
              <li>
                <span className="font-bold ">Boutique Short-Lets:</span> Implies
                a selection of unique, high-quality, and often stylish
                properties.
              </li>
              <li>
                <span className="font-bold ">Hassle-Free Hospitality:</span>{" "}
                Underscores the platform's ability to remove complications from
                both sides of the short-let experience.
              </li>
            </ul>
            <p className="text-base text-gray-800 font-normal mt-6  ">
              These terms can be used in marketing materials, website copy, and
              mission statements to quickly convey what Easy Stay is all about.
            </p>
          </div>
        </div>
      </section>

      {/*///////// section*/}
      <BottomHero
        backgroundImage="/images/hero-two.png"
        title="Your hosting journey starts here"
        buttons={[
          {
            label: "Register Your Apartment Now!",
            link: "/",
            variant: "primary",
          },
        ]}
        divClass="items-center "
      />

      <FooterComp data={cities} />
    </main>
  );
}

export default TermsOfService;
