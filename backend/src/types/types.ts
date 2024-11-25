export type DriveProps = {
  customer_id: string;
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: number;
  driver: {
    id: string;
    name: string;
  };
  value: number;
};
