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
  neighbourhood: { name: string; longitude: string; latitude: string };
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
};
