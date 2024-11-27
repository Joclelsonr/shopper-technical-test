export type DriveProps = {
  customer_id: string;
  origin: { latitude: number; longitude: number };
  originName: string;
  destination: { latitude: number; longitude: number };
  destinationName: string;
  distance: number;
  duration: number;
  value: number;
  driver: {
    id: string;
    name: string;
  };
};
