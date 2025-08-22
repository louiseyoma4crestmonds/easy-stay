import PageSkeletons from "@/components/PageSkeletons";
import useSessionDetails from "@/hooks/useSessionDetails";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";
import HeroBanner from "@/organisms/HeroBanner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RegisterYourApartment() {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";
  const [mounted, setMounted] = useState(false);
  // Prevent hydration flicker and cover cases where 'loading' is brief
  useEffect(() => setMounted(true), []);

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  return (
    <main className="min-h-screen flex flex-col ">
      <HeroBanner
        backgroundImg="/images/hero-one.png"
        primaryText="Register your Apartment"
        secondaryText="Thinking of sharing your space and earning extra income? Becoming a host lets you welcome guests from around the world, all on your own terms. It's a fantastic way to monetize your property and be part of a global community."
        buttons={[
          {
            label: "Register Your Apartment Now",
            link: "/",
            variant: "primary",
          },
        ]}
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
      />

      {/* TEXT SECTION */}
      <section className="bg-gray-50 px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-10">
          <div className="w-[70%]">
            <p className="text-gray-800 font-bold text-base mb-6">
              Become a Host with Easy Stay
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              Ready to unlock the potential of your property? Becoming a host
              with Easy Stay is a straightforward way to earn income by sharing
              your space with travelers. We're here to guide you through every
              step, ensuring a smooth and secure experience.
            </p>
            <p className="text-gray-800 font-bold text-base mb-6">
              How to Get Started
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              Becoming an Easy Stay host involves a few simple steps designed to
              set you up for success and ensure trust within our community:
            </p>
            <ol className="list-none text-gray-800  ">
              <li className=" mb-4 relative">
                <span className="font-bold">1.</span>{" "}
                <span className="font-bold">Sign Up:</span> Begin by creating
                your Easy Stay account. It's quick and easy to get started.
              </li>
              <li className=" mb-4 relative">
                <span className="font-bold">2.</span>{" "}
                <span className="font-bold">Select Your Role:</span>
                Let us know how you'll be managing properties. Choose between:
                <ul className="list-disc pl-8">
                  <li>
                    Property Owner: If you own the property you'll be listing
                  </li>
                  <li>Agent: If you manage properties on behalf of others.</li>
                </ul>
              </li>
              <li className=" mb-4 relative">
                <span className="font-bold">3.</span>{" "}
                <span className="font-bold">Provide Property Details: </span>{" "}
                Share key information about your space. This includes location,
                type of property, number of rooms, amenities, and high-quality
                photos. The more detail you provide, the better guests can
                understand and appreciate your listing.
              </li>
              <li className=" mb-4 relative">
                <span className="font-bold">4.</span>{" "}
                <span className="font-bold">Identity Verification: </span> For
                the safety and security of all our users, we require identity
                verification. This helps build trust within the Easy Stay
                community.
              </li>
              <li className=" mb-4 relative">
                <span className="font-bold">5.</span>{" "}
                <span className="font-bold">Property Verification: </span> To
                ensure the quality and accuracy of our listings, your property
                will undergo a verification process. Please note, there's a
                one-time fee for this verification. This helps us maintain high
                standards and provides peace of mind for both hosts and guests.
              </li>
            </ol>
            <p className="text-gray-800 font-bold text-base mb-6">
              Once Approved: Start Earning!
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              After your identity and property verifications are complete and
              approved, your Easy Stay host account will become fully active.
              You'll then be ready to list your property and start welcoming
              guests!
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              We believe in a fair and transparent earning model. Our commission
              structure is simple:
            </p>
            <ul className="list-disc text-gray-800 font-normal text-base pl-8 mb-6">
              <li>
                70% to You, the Host: You'll receive the majority of the booking
                fee.
              </li>
              <li>
                30% to Easy Stay: This commission helps us operate the platform,
                provide customer support, handle marketing, and continuously
                develop features to benefit our hosts.
              </li>
            </ul>
            <p className="text-gray-800 font-normal text-base mb-6">
              Join Easy Stay today and turn your property into a source of
              income!
            </p>
            <p className="text-gray-800 font-normal text-base mb-6">
              Terms & Conditions Apply
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

      <FooterComp />
    </main>
  );
}
