// src/types.ts

export interface RifugioType {
  _id: string;
  name: string;
  description: string;
  location: {
    region: string;
    coordinates: {
      lat: number;
      lng: number;
      altitude_meters: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  amenities: string[];
  pricing: {
    bed_per_night_eur: number;
    half_board_eur: number;
  };
  capacity: {
    total_beds: number;
    rooms: number;
  };
  open_season: {
    start: string;
    end: string;
  };
  image: string;
}
