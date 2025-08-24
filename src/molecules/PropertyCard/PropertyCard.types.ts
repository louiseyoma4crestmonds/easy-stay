export type PropertyCardProps = {
  id: string | number;
  photo: string;
  name: string;
  neighbourhood: string;
  rate: string; // number for easy math/formatting
  rating: number; // 0-5
  status?: string;
  rooms: string;
  onSave?: (id: string | number, saved: boolean) => void;
  className?: string;
};
