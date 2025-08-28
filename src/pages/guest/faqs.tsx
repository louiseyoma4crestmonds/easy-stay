import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLocations } from "../api/property";
import PageSkeletons from "@/components/PageSkeletons";
import HeroBanner from "@/organisms/HeroBanner";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";

export default function Faqs() {
  const { status } = useSession();
  const { firstName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";
  const [mounted, setMounted] = useState(false);
  const [cities, setCities] = useState([]);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

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
        backgroundImg="/images/hero-one.png"
        primaryText="Frequently Asked Questions"
        secondaryText="Need something cleared up? Here are our most frequently asked questions."
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />

      <section className="bg-gray-50 px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-10">
          <div className="w-[70%]"> FAQs </div>
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
