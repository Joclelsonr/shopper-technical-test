import { Client } from "@googlemaps/google-maps-services-js";
// import { DriverService } from "./DriverService";

interface Ride {
  customer_id: number;
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

export class GoogleMapsService {
  constructor(
    private client: Client = new Client({}) // private driverService: DriverService = new DriverService()
  ) {}

  async getEstimate(input: Ride) {
    if (!input.origin || !input.destination) {
      throw new Error("Missing origin or destination");
    }
    if (!input.customer_id) {
      throw new Error("Missing customer_id");
    }

    if (
      input.origin.latitude === input.destination.latitude &&
      input.origin.longitude === input.destination.longitude
    ) {
      throw new Error("Origin and destination cannot be the same");
    }

    const response = await this.client.directions({
      params: {
        origin: input.origin,
        destination: input.destination,
        alternatives: true,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    return response.data;
  }
}
