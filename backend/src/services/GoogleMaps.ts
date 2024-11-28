import {
  Client,
  DirectionsResponseData,
} from "@googlemaps/google-maps-services-js";
import { Driver } from "@prisma/client";
import BaseError from "../errors/BaseError";

type RidePros = {
  customer_id: number;
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
};

export class GoogleMapsService {
  constructor(private client: Client = new Client({})) {}

  async getEstimate(input: RidePros) {
    if (
      !input.origin.latitude ||
      !input.origin.longitude ||
      !input.destination.latitude ||
      !input.origin.longitude
    ) {
      throw new BaseError(400, "Missing origin or destination");
    }
    if (!input.customer_id) {
      throw new BaseError(400, "Missing customer_id");
    }

    if (
      input.origin.latitude === input.destination.latitude &&
      input.origin.longitude === input.destination.longitude
    ) {
      console.log("caiu no destino igual", input);
      throw new BaseError(400, "Origin and destination cannot be the same");
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

  async calculatePrice(drivers: Driver[], data: DirectionsResponseData) {
    const newDriver = drivers
      .map((driver) => {
        return {
          origin: data.routes[0].legs[0].start_location,
          destination: data.routes[0].legs[0].end_location,
          distance: data.routes[0].legs[0].distance.value,
          duration: data.routes[0].legs[0].duration.value,
          options: {
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.car,
            review: {
              rating: driver.rate,
              // comment: driver.,
            },
            value:
              (data.routes[0].legs[0].distance.value / 1000) *
              Number(driver.rate),
          },
        };
      })
      .sort((a, b) => a.options.value - b.options.value);
    return newDriver;
  }
}
