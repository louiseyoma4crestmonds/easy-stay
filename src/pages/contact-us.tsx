import useSessionDetails from "@/hooks/useSessionDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLocations } from "./api/property";
import PageSkeletons from "@/components/PageSkeletons";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import FooterComp from "@/organisms/FooterComp";
import ContactComp from "@/molecules/ContactComp";
import Modal from "@/molecules/Modal";

function ContactUs() {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";
  const [mounted, setMounted] = useState(false);
  const [cities, setCities] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        lastName={lastName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
        isMobile={isMobile}
      />

      <section>
        <ContactComp setShowSuccessModal={setShowSuccessModal} />
      </section>

      <FooterComp data={cities} />

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent="max-w-sm flex flex-col justify-center px-4 py-6 items-center -mt-7"
        >
          <p className="text-lg font-semibold text-gray-900 my-2 md:my-4 ">
            Ticket Raised Successfully{" "}
          </p>
          <p className="text-gray-500 text-sm font-normal text-center ">
            {" "}
            Your ticket has been successfully logged. You will receive a
            follow-up email from our support team.
          </p>
        </Modal>
      )}
    </main>
  );
}

export default ContactUs;
