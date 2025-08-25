import useSessionDetails from "@/hooks/useSessionDetails";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const router = useRouter();
  const { status } = useSession();
  const { firstName, lastName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  const points = 100;

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10 ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        lastName={lastName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />
      <div className="flex w-[90%] justify-center mt-12 gap-6 mx-auto ">
        <p>HELLO MY BOOKINGS</p>
      </div>
    </section>
  );
}
