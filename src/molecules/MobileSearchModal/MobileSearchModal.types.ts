import { GuestCounts } from "../HeroSec/HeroSec.types";

export type MobileSearchModalProps = {
  selectedLocation: string;
  setSelectedLocation: (arg: string) => void;
  checkinDate: Date | null;
  checkoutDate: Date | null;
  guestCounts: GuestCounts;
  onSearch: () => void;
  locationDropdownOpen?: boolean;
  setLocationDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  guestDropdownOpen?: boolean;
  setGuestDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkinOpen?: boolean;
  setCheckinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutOpen?: boolean;
  setCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckinDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCheckoutDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setGuestCounts: React.Dispatch<React.SetStateAction<GuestCounts>>;
  filteredLocations: string[];
};
