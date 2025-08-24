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
  rooms: { id: number; name: string };
  status: { id: number; name: string };
  photo: string;
};
