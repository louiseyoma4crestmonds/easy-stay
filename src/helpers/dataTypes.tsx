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
  price: number;
  rooms: number;
  to_date_available: any;
  from_date_available: any;
  number_off_allowed_adults: number;
  number_off_allowed_infants: number;
  number_off_allowed_pets: number;
  number_off_allowed_children: number;
  type: { id: number; name: string };
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

export type HostDocs = {
  id: number;
  doc: string;
  propertyId: number;
  propertyAdd: string;
  dateSub: string;
};

export type HostCommission = {
  id: string;
  comEarned: number;
  comRate: string;
  bookingAmount: number;
  dateBooked?: string; // ISO date
  status: PaymentStatus;
};

export type HostRefundPercent = {
  id: number;
  hours: string;
  refundType: string;
  percentage: number;
  date: string;
};

export type HostIssues = {
  id: number;
  message: string;
  timing?: number;
  property: {
    id: number;
    address: string;
    status: "pending" | "approved" | "rejected";
    number_of_aprts: number;
    apartments?: {
      id: number;
      apartmentType: string;
      status: "pending" | "approved" | "rejected";
    }[];
  };
};

export type Booking = {
  id: number;
  checkin_date: string;
  checkout_date: string;
  property: {
    address: string;
    expected_checkin_time: string;
    expected_checkout_time: string;
    price: number;
    type: { name: string };
    location: { name: string };
    name: string;
    neighbourhood: { name: string };
    number_off_allowed_adults: number;
    number_off_allowed_children: number;
    number_off_allowed_guests: number;
    number_off_allowed_infants: number;
    number_off_allowed_pets: number;
    host: {
      account: {
        email: string;
        phone: string;
        first_name: string;
        last_name: string;
      };
    };
  };
  status: string;
  transaction_reference: string;
  created_at: string;
};

const SHARED_ISSUE_MESSAGE =
  "1 apartment and 1 property requires additional documentation before it can be approved. Please review and resubmit the required documents. within specified timing.";
const SHARED_ISSUE_TIMING = 48;

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

/*
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
*/

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

export const HOST_MOCK_DOCS: HostDocs[] = [
  {
    id: 1,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of occupancy",
    dateSub: "04/05/2025",
  },
  {
    id: 2,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of occupancy",
    dateSub: "04/05/2025",
  },
  {
    id: 3,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of ownership",
    dateSub: "04/05/2025",
  },
  {
    id: 4,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of occupancy",
    dateSub: "04/05/2025",
  },
  {
    id: 5,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of occupancy",
    dateSub: "04/05/2025",
  },
  {
    id: 6,
    propertyAdd: "17, Kaizen Road, Victoria Island, Lagos",
    propertyId: 24,
    doc: "Certificate of occupancy",
    dateSub: "04/05/2025",
  },
];

export const HOST_MOCK_REFUNDS_PERCENT: HostRefundPercent[] = [
  {
    id: 1,
    hours: "2 hours",
    refundType: "No Refund",
    percentage: 0,
    date: "04/05/2025",
  },
  {
    id: 2,
    hours: "8 hours",
    refundType: "Partial Refund",
    percentage: 20,
    date: "04/05/2025",
  },
  {
    id: 3,
    hours: "24 hours",
    refundType: "Partial Refund",
    percentage: 50,
    date: "04/05/2025",
  },
  {
    id: 4,
    hours: "48 hours above",
    refundType: "Full Refund",
    percentage: 90,
    date: "04/05/2025",
  },
];

export const HOST_MOCK_ISSUES: HostIssues[] = [
  {
    id: 1,
    message: SHARED_ISSUE_MESSAGE,
    timing: SHARED_ISSUE_TIMING,
    property: {
      id: 1,
      address: "23 Lekki Phase 1, Lagos",
      status: "approved",
      number_of_aprts: 3,
      apartments: [
        {
          id: 101,
          apartmentType: "2 Bedroom Apartment",
          status: "approved",
        },
        {
          id: 102,
          apartmentType: "Studio",
          status: "rejected",
        },
        {
          id: 103,
          apartmentType: "1 Bedroom Apartment",
          status: "approved",
        },
      ],
    },
  },
  {
    id: 2,
    message: SHARED_ISSUE_MESSAGE,
    timing: SHARED_ISSUE_TIMING,
    property: {
      id: 2,
      address: "17 Kaizen Road, Victoria Island, Lagos",
      status: "rejected",
      number_of_aprts: 4,
    },
  },
  {
    id: 3,
    message: SHARED_ISSUE_MESSAGE,
    timing: SHARED_ISSUE_TIMING,
    property: {
      id: 3,
      address: "10 Allen Avenue, Ikeja, Lagos",
      status: "approved",
      number_of_aprts: 2,
      apartments: [
        {
          id: 202,
          apartmentType: "Studio Apartment",
          status: "rejected",
        },
      ],
    },
  },
];
