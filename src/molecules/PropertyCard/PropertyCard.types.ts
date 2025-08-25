export type PropertyCardProps = {
  id: string | number;
  images: string[];
  title: string;
  location: string;
  price: number; // number for easy math/formatting
  rating: number; // 0-5
  bedrooms?: number;
  onSave?: (id: string | number, saved: boolean) => void;
  className?: string;
  isSaved?: boolean;
  isWishlist?: boolean;
};
