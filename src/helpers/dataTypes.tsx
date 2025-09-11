export type location = {
  id: number;
  name: string;
  cover_text: string;
  image_cover: string;
  longitude: number;
  lattitude: number;
};

export type property = {
  id: number;
  name: string;
  neighbourhood: {
    id: number;
    name: string;
    longitude: string;
    latitude: string;
  };
  location: { name: string; id: number };
  longitude: number;
  latitude: number;
  rating: number;
  rate: string;
  rooms: { id: number; name: string; number: number };
  status: { id: number; name: string };
  photo: string;
  address: string;
  description: string;
  expected_checkin_time: string;
  expected_checkout_time: string;
  number_off_allowed_guests: number;
  rules: string;
  refund_policy: string;
  isLoggedIn?: boolean;
  isSaved?: boolean;
  isWishlist?: boolean;
};

export type LocationType = {
  name: string;
  count: number;
};

export type ApartmentType = {
  name: string;
  count: number;
};

export type Amenity = {
  name: string;
  count: number;
};

export type Rating = {
  stars: number;
  count: number;
};

export type Pricing = {
  min: number;
  max: number;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type BookingStatus = "active" | "upcoming" | "past" | "cancelled";

export type Booking = {
  id: string;
  apartmentType: string;
  title: string;
  location: string;
  date: string; // ISO date
  status: BookingStatus;
  imageUrl: string;
  amount: number;
  numberOfDays: number;
};

// Define FAQs for Guests and Hosts
export const guestFAQs: FAQ[] = [
  {
    id: 1,
    question: "What is Easy Stay?",
    answer:
      "Easy Stay is a short-let platform connecting guests with temporary accommodations and empowering property owners to host.",
  },
  {
    id: 2,
    question: "How does Easy Stay ensure safety and trust? ",
    answer:
      "We implement identity and property verification processes for hosts, secure payment systems, and provide clear communication channels.",
  },
  {
    id: 3,
    question: "How do I book an apartment?",
    answer:
      "Browse listings, select your dates, review the details, and proceed to book. You'll need to sign in or sign up first.",
  },
  {
    id: 4,
    question: "What types of properties are available?",
    answer:
      "We offer a diverse range of properties, from apartments and studios to larger homes, depending on host listings.",
  },
  {
    id: 5,
    question: "How do I contact my host?",
    answer:
      "Once your booking is confirmed, you'll find contact details for your host within your booking confirmation on the platform.",
  },
];

export const hostFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I list my property?",
    answer: "Fill out the host registration form.",
  },
  {
    id: 2,
    question: "Do I get paid directly?",
    answer: "Yes, payouts are made securely.",
  },
  {
    id: 3,
    question: "Can I manage multiple listings?",
    answer: "Yes, you can manage all your listings in one dashboard.",
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    title: "Modern Loft in Lekki",
    location: "Lekki, Lagos",
    apartmentType: "studio",
    date: "2025-09-15",
    status: "upcoming",
    imageUrl: "/images/sample-image.png",
    amount: 100000,
    numberOfDays: 4,
  },
  {
    id: "b2",
    title: "Cozy Studio in VI",
    location: "Victoria Island, Lagos",
    apartmentType: "1 bedroom",
    date: "2025-09-04",
    status: "active",
    imageUrl: "/images/sample-image.png",
    amount: 220000,
    numberOfDays: 3,
  },
  {
    id: "b3",
    title: "Beachfront Apartment",
    location: "Oniru, Lagos",
    apartmentType: "studio",
    date: "2025-07-05",
    status: "past",
    imageUrl: "/images/sample-image.png",
    amount: 480000,
    numberOfDays: 2,
  },
  {
    id: "b4",
    title: "Penthouse with City View",
    location: "Ikoyi, Lagos",
    apartmentType: "2 bedroom",
    date: "2025-08-22",
    status: "cancelled",
    imageUrl: "/images/sample-image.png",
    amount: 0,
    numberOfDays: 3,
  },
  {
    id: "B44",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    date: "2025-08-22",
    numberOfDays: 3,
    status: "active",
    imageUrl: "/images/sample-image.png",
    amount: 250000,
  },
];
