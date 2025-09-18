import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/router";

type NoBookingProps = {
  isMobile?: boolean;
  type?: "host" | "guest";
};

function NoBooking({ isMobile, type }: NoBookingProps) {
  const router = useRouter();

  const goToHome = () => {
    router.push({
      pathname: "/",
    });
  };
  return (
    <div
      className={`flex flex-col mx-auto items-center justify-center  ${type === "host" ? "py-16  " : "py-8"}`}
    >
      <div>
        <Image
          src="/images/no-booking.png"
          alt="booking-img"
          width={isMobile ? 95 : 191}
          height={isMobile ? 64 : 128}
        />
      </div>
      <p className="text-gray-800 font-semibold text-base md:text-xl mt-6 ">
        No bookings yet
      </p>
      {type === "guest" ? (
        <p className="text-gray-500 text-sm md:text-base font-normal w-full md:w-[40%] text-center px-5 md:px-8 pt-1 pb-4 ">
          It looks like you have no booking yet. Explore our available
          apartments to book one
        </p>
      ) : (
        <p className="text-gray-500 text-sm md:text-base font-normal w-full md:w-[60%] text-center px-5 md:px-8 pt-1 pb-4 ">
          It looks like you have no booking yet. Ensure you have added an
          apartment.
        </p>
      )}
      {type === "guest" && (
        <Button variant="primary" onClick={goToHome}>
          Explore Apartments
        </Button>
      )}
    </div>
  );
}

export default NoBooking;
