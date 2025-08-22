import useSessionDetails from "@/hooks/useSessionDetails";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import NoSaved from "@/molecules/NoSaved";
import { useSession } from "next-auth/react";

export default function MyWishList() {
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10 ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />
      <div className="flex w-[70%] justify-center mt-12 gap-6 mx-auto ">
        <NoSaved />
      </div>
    </section>
  );
}
