// pages/how-it-works.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";
import HeroBanner from "@/organisms/HeroBanner";
import useSessionDetails from "@/hooks/useSessionDetails";
import PageSkeletons from "@/components/PageSkeletons";

export default function HowItWorks() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { firstName, lastName } = useSessionDetails();
  const [mounted, setMounted] = useState(false);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  console.log("sttaus", status);

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroBanner
        isLoggedIn={isLoggedIn}
        backgroundImg="/images/hero-one.png"
        primaryText="How it Works"
        secondaryText="We understand plans can change. As your host, we aim to make our refund policy clear and fair, detailing everything you need to know about cancellations and refunds for your booking."
        buttons={[
          { label: "Book an Apartment", link: "/", variant: "explore2" },
          {
            label: "Register Your Apartment Now",
            link: "/",
            variant: "primary",
          },
        ]}
        firstName={firstName}
        lastName={lastName}
      />

      {/* TEXT SECTION */}
      <section className="bg-gray-50 px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-10">
          <div className="w-[70%]">
            <p className="text-gray-800 font-bold text-base mb-6">
              Our Flexible Refund Policy for Guests
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              We understand that plans can change, and we want to make our
              refund process as transparent and fair as possible. With Easy
              Stay, hosts have the flexibility to set their own refund policies,
              which are clearly displayed on each listing. This means that
              refund amounts are determined by the host and are based on the
              number of days prior to check-in that a cancellation is made.
            </p>

            <p className="text-gray-800 font-normal text-base mb-6">
              How Refunds Work:
            </p>

            <p className="text-gray-800 font-normal text-base mb-6">
              Each host customizes their refund policy, typically structured as
              a percentage of the booking total, varying based on how far in
              advance you cancel:
            </p>
            <p className="text-gray-800 font-normal text-base ">
              For example, a host might offer:
            </p>
            <ul className="list-disc text-gray-800 font-normal text-base pl-8 mb-6">
              <li>
                100% refund if you cancel 30 days or more before check-in.
              </li>
              <li>
                50% refund if you cancel between 7 and 29 days before check-in.
              </li>
              <li>0% refund if you cancel less than 7 days before check-in.</li>
            </ul>
            <p className="text-gray-800 font-normal text-base mb-6">
              To view the specific refund policy for any property, please check
              the "Cancellation Policy" section on the individual listing page
              before you book. This ensures you understand the terms directly
              from your chosen host.
            </p>
          </div>
        </div>
      </section>

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

      <FooterComp />
    </main>
  );
}
