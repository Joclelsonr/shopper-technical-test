import prisma from "../database";
import { Driver } from "@prisma/client";
import { DriveProps } from "../types/types";
import BaseError from "../errors/BaseError";

export class DriverService {
  constructor() {}

  public async getAllDrivers(): Promise<Driver[]> {
    const drivers = await prisma.driver.findMany();
    return drivers;
  }

  public async confirmRide(input: DriveProps): Promise<boolean> {
    if (
      !input.origin.latitude ||
      !input.origin.longitude ||
      !input.destination.latitude ||
      !input.destination.longitude
    ) {
      throw new BaseError(400, "Origin and destination are required");
    }
    if (!input.customer_id) {
      throw new BaseError(400, "Customer ID is required");
    }
    if (
      input.origin.latitude === input.destination.latitude ||
      input.origin.longitude === input.destination.longitude
    ) {
      throw new BaseError(400, "Origin and destination cannot be the same");
    }
    const driver = await prisma.driver.findFirst({
      where: { id: Number(input.driver.id) },
    });
    if (!driver) {
      throw new BaseError(404, "Driver not found");
    }
    if (input.distance < Number(driver.kmMin)) {
      throw new BaseError(
        406,
        "Driver does not meet the minimum distance requirement"
      );
    }

    await prisma.race.create({
      data: {
        origin: `${input.origin.latitude}, ${input.origin.longitude}`,
        originName: input.originName,
        destiny: `${input.destination.latitude}, ${input.destination.longitude}`,
        destinyName: input.destinationName,
        distance: input.distance,
        duration: input.duration,
        driverId: Number(input.driver.id),
        driverName: input.driver.name,
        totalPrice: input.value,
        customerId: Number(input.customer_id),
      },
    });
    return true;
  }
}
