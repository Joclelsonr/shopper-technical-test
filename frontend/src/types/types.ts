export type DriverPros = {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  distance: string;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    value: number;
    vehicle: string;
    review: {
      rating: string;
    };
  };
};
