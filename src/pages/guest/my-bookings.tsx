import PageSkeletons from "@/components/PageSkeletons";
import useSessionDetails from "@/hooks/useSessionDetails";
import BookingComp from "@/molecules/BookingComp";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const router = useRouter();
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const [mounted, setMounted] = useState(false);
  const [thisPageLoads, setThisPageLoads] = useState(true);
  const isLoggedIn = status === "authenticated";
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

  const points = 100;

  const isLoading = !mounted || status === "loading";

  if (isLoading) return <PageSkeletons />;

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10 ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        lastName={lastName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
        isMobile={isMobile}
      />
      <div className="flex w-[90%] md:w-[80%] justify-center mt-12 gap-6 mx-auto ">
        <BookingComp isMobile={isMobile} />
      </div>
    </section>
  );
}
