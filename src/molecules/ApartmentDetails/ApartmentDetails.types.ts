export type Review = {
  id: string | number;
  user: {
    name: string;
    profileImage: string; // URL to user profile picture
  };
  rating: number; // e.g., 1–5
  comment: string;
  date: string; // ISO date string (e.g., "2025-08-21T14:30:00Z")
};

export type RatingBreakdown = {
  cleanliness: number;
  checkin: number;
  location: number;
  value: number;
  communication: number;
};

export type Rating = {
  overall: number;
  breakdown: RatingBreakdown;
};

export type ApartmentDetailsProps = {
  isLoggedIn?: boolean;

  apartment: {
    id: number | string;
    title: string;
    images: string[];
    description: string;
    address: string;
    comment: string[];
    isSaved: boolean;

    rating: Rating;
    amount: number;
    numberOfReviews: number;
    apartmentType: number;
    rooms: number;
    numberOfGuest: number;
    amenities: string[];
    rules: string;
    checkinTime: string;
    checkoutTime: string;
    refundPolicy: string;
    reviews: Review[];
  };
};
