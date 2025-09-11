import PageSkeletons from "@/components/PageSkeletons";
import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLocations } from "./api/property";
import BottomHero from "@/molecules/BottomHero";
import FooterComp from "@/organisms/FooterComp";
import HeroBanner from "@/organisms/HeroBanner";

function CookiesPolicy() {
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
        backgroundImg="/images/cookies-bg.png"
        primaryText="Cookies Policy"
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        isMobile={isMobile}
      />

      <section className="bg-gray-50 px-5 md:px-24 py-12">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-5 md:p-10">
          <div className="w-full md:w-[70%] text-gray-800 text-base ">
            <p className="font-bold mb-4 ">Easy Stay Cookies Policy</p>
            <p className="mb-4 ">
              Welcome to Easy Stay, your premier short-let platform. This
              Privacy Policy describes how Easy Stay ("we," "us," or "our")
              collects, uses, processes, and discloses your information in
              connection with your access to and use of the Easy Stay platform
              and services (collectively, the "Services").
            </p>
            <p>
              By using our Services, you agree to the collection and use of
              information in accordance with this policy.
            </p>
            <p className="font-bold my-4"> 1. Information We Collect</p>
            We collect information to provide and improve our Services, and to
            ensure a safe and secure environment for both guests and hosts.{" "}
            <p className="font-bold my-4">
              1.1 Information You Provide to Us Directly
            </p>{" "}
            <ul className="list-disc pl-10 ">
              <li>
                {" "}
                Account Information: When you sign up for an Easy Stay account,
                we collect your full name, email address, phone number, and
                password.
              </li>{" "}
              <li>
                Profile Information: Depending on your role (Guest or Host), you
                may provide additional information such as your profile picture,
                preferred language, and other details.
              </li>{" "}
              <li>
                {" "}
                Identity Verification Information (Hosts & Guests): To ensure
                trust and safety, we may collect government-issued
                identification (e.g., passport, driver's license), date of
                birth, and other verification information.
              </li>
              <li>
                Property Details (Hosts): If you are a host, we collect detailed
                information about your property, including address, property
                type, amenities, photos, descriptions, availability, pricing,
                and specific house rules.
              </li>{" "}
              <li>
                Payment Information: To facilitate transactions, we collect
                payment details (e.g., credit card information, bank account
                details for payouts), billing address, and related financial
                information. This information is securely processed by our
                third-party payment processors.{" "}
              </li>{" "}
              <li>
                {" "}
                Communications: When you communicate with us, other users
                (guests or hosts), or use the messaging features on our
                platform, we collect the content of those communications.{" "}
              </li>
              <li>
                Support Interactions: If you contact our customer support, we
                collect information related to your inquiry.{" "}
              </li>{" "}
            </ul>
            <p className="font-bold my-4">
              {" "}
              1.2 Information We Collect Automatically from Your Use of the
              Services
            </p>{" "}
            <ul className="list-disc pl-10 ">
              <li>
                {" "}
                Usage Information: We collect information about your
                interactions with the Easy Stay platform, such as the pages or
                content you view, your searches for listings, bookings you make,
                and other actions on the platform.{" "}
              </li>{" "}
              <li>
                {" "}
                Log Data: We automatically collect log data when you use the
                Services, even if you have not created an account or logged in.
                This includes your IP address, access dates and times, hardware
                and software information, device event information, unique
                identifiers, and the pages you've viewed or engaged with before
                or after using the Services.
              </li>{" "}
              <li>
                Cookies and Similar Technologies: We use cookies and other
                similar technologies (such as web beacons, pixels, and mobile
                identifiers) to collect information. These technologies help us
                recognize you, remember your preferences, and personalize your
                experience. For more information, please refer to our [Cookie
                Policy - Link to be added if a separate policy exists].
              </li>{" "}
              <li>
                {" "}
                Device Information: We collect information about the device you
                use to access our Services, including the hardware model,
                operating system and version, unique device identifiers, and
                mobile network information.{" "}
              </li>{" "}
              <li>
                Location Information: Depending on your device settings and
                permissions, we may collect information about your precise or
                approximate location as determined by data such as your IP
                address or mobile device's GPS. This is used to help guests find
                nearby listings and for hosts to set accurate property
                locations.
              </li>
            </ul>
            <p className="font-bold my-4">
              {" "}
              1.3 Information We Collect from Third Parties
            </p>
            We may collect information from third-party services, such as:{" "}
            <ul className="list-disc pl-10 my-4 ">
              <li>
                Identity Verification Services: For fraud prevention and
                security, we may receive information from third-party identity
                verification services.
              </li>{" "}
              <li>
                {" "}
                Social Media Services: If you link, connect, or log in to your
                Easy Stay account with a third-party service (e.g., Google,
                Facebook), the third-party service may send us information such
                as your registration and profile information from that service.
              </li>{" "}
              <li>
                {" "}
                Payment Processors: We receive confirmation from our payment
                processors regarding successful transactions.
              </li>
            </ul>
            <p className="font-bold mb-4">
              2. How We Use the Information We Collect
            </p>
            We use the information we collect for various purposes, including:
            <ul className="list-disc pl-4 mt-4 ">
              <li> To Provide, Operate, and Improve Our Services:</li>{" "}
            </ul>{" "}
            <ul className="list-disc pl-10  ">
              {" "}
              <li>
                {" "}
                Enable you to access and use the Easy Stay platform.{" "}
              </li>{" "}
              <li>
                {" "}
                Process your bookings and payments (for guests) and payouts (for
                hosts).{" "}
              </li>{" "}
              <li>
                {" "}
                Allow hosts to list properties and manage bookings.{" "}
              </li>{" "}
              <li> Facilitate communication between guests and hosts.</li>{" "}
              <li>
                {" "}
                Personalize and customize your experience on the platform.{" "}
              </li>{" "}
              <li> Develop new features, products, and services. </li>{" "}
              <li>
                {" "}
                Perform analytics and research to understand usage patterns and
                improve our Services.
              </li>{" "}
            </ul>{" "}
            <ul className="list-disc pl-4  ">
              {" "}
              <li> For Safety, Security, and Fraud Prevention:</li>
            </ul>{" "}
            <ul className="list-disc pl-10  ">
              {" "}
              <li> Verify your identity and property details. </li>{" "}
              <li>
                {" "}
                Detect and prevent fraud, spam, abuse, security incidents, and
                other harmful activity.
              </li>{" "}
              <li> Conduct security investigations and risk assessments.</li>
              <li> Enforce our Terms of Service and other policies.</li>
            </ul>{" "}
            <ul className="list-disc pl-4  ">
              <li> For Communication and Marketing: </li>{" "}
            </ul>{" "}
            <ul className="list-disc pl-10 ">
              {" "}
              <li>
                {" "}
                Send you service messages, updates, security alerts, and account
                notifications.{" "}
              </li>{" "}
              <li>
                {" "}
                Send you promotional messages, marketing, advertising, and other
                information that may be of interest to you (you can opt-out of
                marketing communications).{" "}
              </li>{" "}
              <li> Respond to your inquiries and provide customer support.</li>
            </ul>{" "}
            <ul className="list-disc pl-4 ">
              <li> For Legal and Regulatory Compliance:</li>
            </ul>{" "}
            <ul className="list-disc pl-10 ">
              {" "}
              <li>Comply with our legal obligations. </li>{" "}
              <li>Resolve disputes with any of our users.</li>{" "}
              <li> Enforce our agreements with third parties. </li>
            </ul>
            <p className="font-bold my-4 ">3. How We Share Your Information</p>
            We may share your information with third parties in the following
            circumstances:
            <ul className="list-disc pl-4 mt-4">
              <li>Between Guests and Hosts:</li>
            </ul>
            <ul className="list-disc pl-10">
              <li>
                When a booking is confirmed, we share necessary information
                between the guest and the host (e.g., guest's name, booking
                dates, number of guests, and host's name, property address).
              </li>
              <li>
                Contact information is shared to facilitate communication
                regarding the booking.
              </li>
            </ul>
            <ul className="list-disc pl-4">
              <li>
                With Service Providers: We use various third-party service
                providers to help us provide services related to the platform.
                These providers may have access to or process your information
                as part of providing those services for us. Examples include:
              </li>
            </ul>
            <ul className="list-disc pl-10">
              <li>Payment processing.</li> <li>Identity verification.</li>{" "}
              <li> Cloud hosting and data storage.</li>{" "}
              <li>Customer support.</li> <li> Analytics and marketing.</li>
            </ul>
            <ul className="list-disc pl-4">
              <li>
                For Legal Reasons and to Prevent Harm: We may disclose your
                information to courts, law enforcement, governmental
                authorities, or authorized third parties if we are required or
                permitted to do so by law, or if we believe in good faith that
                such disclosure is reasonably necessary to:
              </li>
            </ul>
            <ul className="list-disc pl-10">
              <li>Comply with legal obligations or legal process.</li>
              <li>Respond to claims asserted against Easy Stay.</li>
              <li>
                Respond to valid requests relating to a criminal investigation
                or alleged or suspected illegal activity.
              </li>
              <li>
                Protect the rights, property, or personal safety of Easy Stay,
                its employees, users, or the public.
              </li>
            </ul>
            <ul className="list-disc pl-4">
              <li>
                Business Transfers: If Easy Stay is involved in any merger,
                acquisition, reorganization, sale of assets, bankruptcy, or
                insolvency event, we may sell, transfer, or share some or all of
                our assets, including your information, in connection with such
                transaction.
              </li>
            </ul>
            <ul className="list-disc pl-4">
              <li>
                With Your Consent: We may share your information in other ways
                when you have given us explicit consent to do so.
              </li>
            </ul>
            <p className="font-bold my-4 ">4. Data Security</p>
            We are committed to protecting your information. We implement and
            continuously update administrative, technical, and physical security
            measures to help protect your information against unauthorized
            access, loss, destruction, or alteration. However, no method of
            transmission over the Internet or method of electronic storage is
            100% secure.
            <p className="font-bold my-4 ">5. Data Retention</p>
            We retain your personal information for as long as necessary to
            provide the Services to you and others, and to comply with our legal
            obligations, resolve disputes, and enforce our policies.{" "}
            <p className="font-bold my-4 ">6. Your Rights</p>
            You have certain rights regarding your personal information, subject
            to applicable law:
            <ul className="list-disc pl-10 my-4 ">
              <li>
                Access: You have the right to request access to the personal
                information we hold about you.
              </li>
              <li>
                Correction: You have the right to request that we correct any
                inaccurate or incomplete personal information.
              </li>
              <li>
                Deletion: You have the right to request the deletion of your
                personal information, subject to certain exceptions (e.g., legal
                obligations, fraud prevention).
              </li>{" "}
              <li>
                {" "}
                Objection: You have the right to object to our processing of
                your personal information in certain circumstances.{" "}
              </li>{" "}
              <li>
                Data Portability: You have the right to request a copy of your
                personal information in a structured, commonly used, and
                machine-readable format.
              </li>{" "}
            </ul>
            To exercise any of these rights, please contact us using the details
            provided in the "Contact Us" section below.
            <p className="font-bold my-4">
              {" "}
              7. Cookies and Tracking Technologies{" "}
            </p>
            We use cookies and similar technologies to collect information about
            your browsing activities and to provide you with a personalized
            experience. You can manage your cookie preferences through your
            browser settings. For more detailed information, please refer to our
            [Cookie Policy - Link to be added if a separate policy exists].{" "}
            <p className="font-bold my-4 "> 8. Third-Party Links</p> Our
            Services may contain links to third-party websites or services that
            are not owned or controlled by Easy Stay. This Privacy Policy does
            not apply to such third-party services. We encourage you to review
            the privacy policies of any third-party services you access.{" "}
            <p className="font-bold my-4 "> 9. Children's Privacy</p> Our
            Services are not directed to individuals under the age of 18. We do
            not knowingly collect personal information from children under 18.
            If we become aware that a child under 18 has provided us with
            personal information, we will take steps to delete such information
            from our files.{" "}
            <p className="font-bold my-4 ">
              10. Changes to This Privacy Policy
            </p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you by email or by posting a
            prominent notice on our platform prior to the change becoming
            effective. We encourage you to review this Privacy Policy
            periodically for any changes.{" "}
            <p className="font-bold my-4 "> 11. Contact Us</p> If you have any
            questions or concerns about this Privacy Policy or our data
            practices, please contact us.
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

export default CookiesPolicy;
