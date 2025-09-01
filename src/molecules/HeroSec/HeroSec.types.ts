export type HeroSecProps = {
  isLoggedIn?: boolean;
  firstName?: string;
  lastName?: string;
  points?: number;

  // 👇 new optional props
  initialLocation?: string;
  initialCheckin?: Date | null;
  initialCheckout?: Date | null;
  initialGuests?: GuestCounts;
};

export type GuestCounts = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};
