import PageSkeletons from "@/components/PageSkeletons";
import useSessionDetails from "@/hooks/useSessionDetails";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import NoSaved from "@/molecules/NoSaved";
import WishListGrid from "@/molecules/WishListGrid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isMonthDisabled } from "react-datepicker/dist/date_utils";

export default function MyWishList() {
  const router = useRouter();
  const { status } = useSession();
  const { firstName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  //  This will come from backend in real case
  const [savedApartments, setSavedApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Example: simulate fetching wishlist
  useEffect(() => {
    // Simulate async fetch
    setLoading(true);
    const fetchWishlist = async () => {
      // Example data (replace with real API call)
      const data = [
        {
          id: 1,
          photo: ["/images/sample-image.png", "/images/abuja.png"],
          name: "Cozy Apartment in Lagos",
          location: "Lagos, Nigeria",
          price: 50000,
          rating: 4.5,
          bedrooms: 2,
        },
        {
          id: 2,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 1,
        },
        {
          id: 3,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 4,
        },
        {
          id: 4,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 4,
        },
        {
          id: 5,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 4,
        },
        {
          id: 6,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 4,
        },
        {
          id: 7,
          images: ["/images/sample-image.png", "/images/lagos.png"],
          title: "Modern 1 Bedroom Flat",
          location: "Abuja, Nigeria",
          price: 35000,
          rating: 4.2,
          bedrooms: 4,
        },
      ];
      setLoading(false);
      // setSavedApartments(data); // comment this out to test NoSaved
    };

    fetchWishlist();
  }, []);

  const handleRemove = (id: string | number) => {
    setSavedApartments((prev) => prev.filter((item) => item.id !== id));
  };

  //  Show skeleton while NextAuth is checking
  if (status === "loading") {
    return <PageSkeletons />;
  }

  console.log("savedApartment", savedApartments);

  return (
    <section className="min-h-screen bg-gray-50 w-full pb-10">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
        isMobile={isMobile}
      />

      {/* Wishlist title with count */}
      <div className="w-[90%] md:w-[80%] flex flex-col mx-auto mt-7  ">
        {!loading && (
          <p className=" text-base font-medium text-gray-800 mt-6 flex justify-start ">
            Wishlist ({savedApartments.length})
          </p>
        )}

        <div className="flex gap-6 w-full justify-center mx-auto flex-wrap  mt-6">
          {loading ? (
            <p>Loading......</p>
          ) : savedApartments.length === 0 ? (
            <NoSaved />
          ) : (
            <WishListGrid
              savedApartments={savedApartments}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>
    </section>
  );
}
