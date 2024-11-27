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

export type RaceProps = {
  id: number;
  driverName: string;
  createdAt: Date;
  destiny: string;
  destinyName: string;
  origin: string;
  originName: string;
  totalPrice: number;
  distance: number;
  duration: number;
};
