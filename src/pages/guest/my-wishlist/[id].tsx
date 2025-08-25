import PageSkeletons from "@/components/PageSkeletons";
import useSessionDetails from "@/hooks/useSessionDetails";
import ApartmentDetails from "@/molecules/ApartmentDetails";
import {
  Rating,
  Review,
} from "@/molecules/ApartmentDetails/ApartmentDetails.types";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import FooterComp from "@/organisms/FooterComp";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

type Apartment = {
  id: number | string;
  title: string;
  images: string[];
  description: string;
  price: number;
  comment: string[];
  isSaved: boolean;
  rating: Rating;
  amount: number;
  numberOfReviews: number;
  apartmentType: number;
  rooms: number;
  numberOfGuest: number;
  amenities: string[];
  address: string;
  rules: string;
  checkinTime: string;
  checkoutTime: string;
  refundPolicy: string;
  reviews: Review[];
};

type ApartmentPageProps = {
  apartment: Apartment;
};

const mockApartment = [
  {
    id: 1,
    images: [
      "/images/sample-image.png",
      "/images/abuja.png",
      "/images/img-svg.svg",
    ],
    title: "Cozy Apartment in Lagos",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    description:
      "Brand new renovated beachfront studio with amazing sea and lions head views. Fully equipped and serviced. Features include white Egyptian cotton linen, washer, drier and dishwasher, centrally located walking distance to the best sea point restaurants, Woolworths, Spar and other shops. 44 square metres. Walking distance to Saunders rockpool and Queens beach.",
    location: "Lagos, Nigeria",
    amount: 50000,
    rating: {
      overall: 4.5,
      breakdown: {
        cleanliness: 4.7,
        location: 4.8,
        checkin: 4.6,
        value: 4.3,
        communication: 4.5,
      },
    },
    apartmentType: 2,
    rooms: 2,
    isSaved: true,
    numberOfReviews: 54,
    numberOfGuest: 2,
    amenities: [
      "Garden",
      "Bath-tub",
      "Swimming Pool",
      "Table Tennis",
      "PS5",
      "Free WIFI",
      "Snoker",
    ],
    rules:
      "Guests are required to show a photo ID and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. A damage deposit of USD 100 is required on arrival. This will be collected as a cash payment. You should be reimbursed on check-out. Your deposit will be refunded in full in cash, subject to an inspection of the property.",
    checkinTime: "11:00",
    checkoutTime: "16:00",
    refundPolicy: "Free cancellation for 24 hours",
    reviews: [
      {
        id: 1,
        user: {
          name: "John Doe",
          profileImage: "/images/Avatar.png",
        },
        rating: 5.0,
        comment: "Loved this place! Very clean and well-located.",
        date: "2025-08-19T14:20:00Z",
      },
      {
        id: 2,
        user: {
          name: "Jane Smith",
          profileImage: "/images/Avatar.png",
        },
        rating: 4.0,
        comment: "Great stay but check-in took a while.",
        date: "2025-08-20T10:00:00Z",
      },
      {
        id: 3,
        user: {
          name: "Jane Smith",
          profileImage: "/images/Avatar.png",
        },
        rating: 4.2,
        comment: "Great stay but check-in took a while.",
        date: "2025-08-20T10:00:00Z",
      },
      {
        id: 4,
        user: {
          name: "Jane Smith",
          profileImage: "/images/Avatar.png",
        },
        rating: 3.7,
        comment: "Great stay but check-in took a while.",
        date: "2025-08-20T10:00:00Z",
      },
      {
        id: 5,
        user: {
          name: "Kofo Tulumbu",
          profileImage: "/images/Avatar.png",
        },
        rating: 3.7,
        comment: "Great stay but check-in took a while.",
        date: "2025-08-20T10:00:00Z",
      },
      {
        id: 6,
        user: {
          name: "Jane Smith",
          profileImage: "/images/Avatar.png",
        },
        rating: 4.7,
        comment: "Great stay but check-in took a while.",
        date: "2025-08-20T10:00:00Z",
      },
    ],
  },
];

export default function ApartmentDetailsPage({
  apartment,
}: ApartmentPageProps) {
  const { status } = useSession();
  const { firstName } = useSessionDetails();
  const isLoggedIn = status === "authenticated";

  //  Show skeleton while NextAuth is checking
  if (status === "loading") {
    return <PageSkeletons />;
  }

  return (
    <section className="min-h-screen ">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        firstName={firstName}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />

      <ApartmentDetails apartment={apartment} isLoggedIn={isLoggedIn} />
      <FooterComp />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Always get apartment with id 1
  const apartment = mockApartment.find((apt) => apt.id === 1) || null;

  return {
    props: { apartment },
  };
};
