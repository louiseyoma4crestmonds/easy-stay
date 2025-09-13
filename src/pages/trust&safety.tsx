import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLocations } from "./api/property";
import PageSkeletons from "@/components/PageSkeletons";
import HeroBanner from "@/organisms/HeroBanner";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";

function TrustandSafety() {
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
        backgroundImg="/images/trust-img.png"
        primaryText="Trust & Safety"
        secondaryText="We understand plans can change. As your host, we aim to make our refund policy clear and fair, detailing everything you need to know about cancellations and refunds for your booking."
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        isMobile={isMobile}
      />

      <section className="bg-gray-50 px-5 md:px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-5 md:p-10">
          <div className="w-full md:w-[70%] ">
            <p className="text-base text-gray-800 font-normal mb-6 ">
              Trust and Safety (T&S) for EasyStay is absolutely critical, as it
              underpins the entire platform's success. For a company built on
              the concept of people sharing their homes with strangers,
              establishing and maintaining trust is paramount.
            </p>
            <p className="text-base text-gray-800 font-normal mb-6 ">
              {" "}
              Here's a breakdown of how Airbnb approaches Trust and Safety:
            </p>
            <p className="text-base text-gray-800 font-normal mb-6 ">
              {" "}
              Core Principles:
            </p>

            <ul className="list-disc text-base text-gray-800 font-normal pl-10 mb-6 ">
              <li>
                Safety: Protecting hosts and guests from physical harm,
                dangerous conditions, and illegal activities.
              </li>
              <li>
                Security: Safeguarding personal information, financial
                transactions, and property.
              </li>
              <li>
                Fairness: Ensuring equitable treatment, preventing
                discrimination, and resolving disputes justly.
              </li>
              <li>
                Authenticity: Verifying identities, promoting honest
                interactions, and combating fraudulent listings or reviews
              </li>
              <li>
                Reliability: Providing consistent support and upholding platform
                standards.
              </li>
            </ul>
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

export default TrustandSafety;
