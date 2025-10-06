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

export type PropertyTypeFilter = {
  id: number;
  property_type: string;
  count: number;
};

export type AmenitiezFilter = {
  id: number;
  amenity: string;
  count: number;
};

export type RatingzFilter = {
  id: number;
  rating: number;
  count: number;
};

export type LocationzFilter = {
  id: number;
  location: string;
  count: number;
};

export type PropertyType = {
  id: number;
  name: string;
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

export type PaymentStatus =
  | "paid"
  | "failed"
  | "pending"
  | "completed"
  | "approved"
  | "rejected";

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

export type HostBooking = {
  id: string;
  guestName: string;
  apartmentType: string;
  title: string;
  location: string;
  dateBooked: string; // ISO date
  bookingDates: string;
  status: BookingStatus;
  ratePerNight: number;
  numberOfDays: number;
  activities?: {
    id: number;
    text: string;
    guest: string;
    timeBooked: string;
  }[];
};

export type HostPayment = {
  id: string;
  guestName: string;
  apartmentType: string;
  amountPaid: number;
  title: string;
  location: string;
  dateBooked?: string; // ISO date
  status: PaymentStatus;
  history?: {
    id: number;
    dateRefunded: string;
    amountRefunded: number;
  }[];
};

export type HostCommission = {
  id: string;
  comEarned: number;
  comRate: string;
  bookingAmount: number;
  dateBooked?: string; // ISO date
  status: PaymentStatus;
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

export const HOST_MOCK_BOOKINGS: HostBooking[] = [
  {
    id: "H1",
    title: "Modern Loft in Lekki",
    location: "Lekki, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-09-15",
    status: "upcoming",
    guestName: "John Doe",
    ratePerNight: 100000,
    bookingDates: "07/02/2025 - 14/05/2025",
    numberOfDays: 4,
  },
  {
    id: "b2",
    title: "Cozy Studio in VI",
    location: "Victoria Island, Lagos",
    apartmentType: "1 bedroom",
    dateBooked: "2025-09-04",
    bookingDates: "07/02/2025 - 24/05/2025",
    status: "active",
    guestName: "Jane Smith",
    ratePerNight: 220000,
    numberOfDays: 3,
  },
  {
    id: "b3",
    title: "Beachfront Apartment",
    location: "Oniru, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-07-05",
    status: "past",
    bookingDates: "07/02/2025 - 14/05/2025",
    guestName: "Alice Johnson",
    ratePerNight: 480000,
    numberOfDays: 2,
    activities: [
      {
        id: 1,
        text: "Checked In",
        guest: "Admin",
        timeBooked: "07/05/2025 09:17AM",
      },
    ],
  },
  {
    id: "b4",
    title: "Penthouse with City View",
    location: "Ikoyi, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    bookingDates: "07/02/2025 - 14/05/2025",
    status: "cancelled",
    guestName: "Bob Brown",
    ratePerNight: 0,
    numberOfDays: 3,
  },
  {
    id: "B44",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    numberOfDays: 3,
    bookingDates: "07/02/2025 - 14/05/2025",
    status: "active",
    guestName: "Charlie Davis",
    ratePerNight: 250000,
  },
];

export const HOST_MOCK_PAYMENTS: HostPayment[] = [
  {
    id: "H1",
    title: "Modern Loft in Lekki",
    location: "Lekki, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-09-15",
    status: "paid",
    guestName: "John Doe",
    amountPaid: 100000,
  },
  {
    id: "b2",
    title: "Cozy Studio in VI",
    location: "Victoria Island, Lagos",
    apartmentType: "1 bedroom",
    dateBooked: "2025-09-04",
    status: "pending",
    guestName: "Jane Smith",
    amountPaid: 220000,
  },
  {
    id: "b3",
    title: "Beachfront Apartment",
    location: "Oniru, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-07-05",
    status: "paid",
    guestName: "Alice Johnson",
    amountPaid: 480000,
  },
  {
    id: "b4",
    title: "Penthouse with City View",
    location: "Ikoyi, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",

    status: "failed",
    guestName: "Bob Brown",
    amountPaid: 0,
  },
  {
    id: "B44",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    status: "pending",
    guestName: "Charlie Davis",
    amountPaid: 250000,
  },
  {
    id: "B54",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    status: "failed",
    guestName: "Charlie Davis",
    amountPaid: 250000,
  },
];

export const HOST_MOCK_REFUNDS: HostPayment[] = [
  {
    id: "H1",
    title: "Modern Loft in Lekki",
    location: "Lekki, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-09-15",
    status: "completed",
    guestName: "John Doe",
    amountPaid: 100000,
    history: [
      {
        id: 1,
        dateRefunded: "07/07/2025 09:35AM",
        amountRefunded: 120000,
      },
    ],
  },
  {
    id: "b2",
    title: "Cozy Studio in VI",
    location: "Victoria Island, Lagos",
    apartmentType: "1 bedroom",
    dateBooked: "2025-09-04",
    status: "pending",
    guestName: "Jane Smith",
    amountPaid: 220000,
  },
  {
    id: "b3",
    title: "Beachfront Apartment",
    location: "Oniru, Lagos",
    apartmentType: "studio",
    dateBooked: "2025-07-05",
    status: "completed",
    guestName: "Alice Johnson",
    amountPaid: 480000,
  },
  {
    id: "b4",
    title: "Penthouse with City View",
    location: "Ikoyi, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    status: "approved",
    guestName: "Bob Brown",
    amountPaid: 0,
    history: [
      {
        id: 1,
        dateRefunded: "07/07/2025 09:35AM",
        amountRefunded: 120000,
      },
      {
        id: 2,
        dateRefunded: "07/07/2025 09:35AM",
        amountRefunded: 120000,
      },
    ],
  },
  {
    id: "B44",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    status: "pending",
    guestName: "Charlie Davis",
    amountPaid: 250000,
  },
  {
    id: "B54",
    title: "Penthouse with City View",
    location: "Ikeja, Lagos",
    apartmentType: "2 bedroom",
    dateBooked: "2025-08-22",
    status: "rejected",
    guestName: "Charlie Davis",
    amountPaid: 250000,
  },
];

export const HOST_MOCK_COMMISSIONS: HostCommission[] = [
  {
    id: "H1",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05/2025",
    status: "paid",
    bookingAmount: 100000,
  },
  {
    id: "b2",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05/2025",
    status: "pending",

    bookingAmount: 220000,
  },
  {
    id: "b3",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05/2025",
    status: "paid",

    bookingAmount: 480000,
  },
  {
    id: "b4",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05/2025",

    status: "pending",

    bookingAmount: 0,
  },
  {
    id: "B44",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05//2025",
    status: "pending",

    bookingAmount: 250000,
  },
  {
    id: "B54",
    comEarned: 55000,
    comRate: "70%",
    dateBooked: "09/05//2025",
    status: "pending",

    bookingAmount: 250000,
  },
];
