import { prisma } from "../database";

interface DriveProps {
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
}

export class DriverService {
  constructor() {}

  public async getAllDrivers() {
    const drivers = await prisma.driver.findMany();
    return drivers;
  }

  public async confirmRide(input: DriveProps) {
    if (
      !input.origin.latitude ||
      !input.origin.longitude ||
      !input.destination.latitude ||
      !input.destination.longitude
    ) {
      throw new Error("Origin and destination are required");
    }
    if (!input.customer_id) {
      throw new Error("Customer ID is required");
    }
    if (
      input.origin.latitude === input.destination.latitude ||
      input.origin.longitude === input.destination.longitude
    ) {
      throw new Error("Origin and destination cannot be the same");
    }
    const driver = await prisma.driver.findFirst({
      where: { id: Number(input.driver.id) },
    });
    if (!driver) {
      throw new Error("Driver not found");
    }
    if (input.distance < Number(driver.kmMin)) {
      throw new Error("Driver does not meet the minimum distance requirement");
    }

    await prisma.race.create({
      data: {
        origin: `${input.origin.latitude}, ${input.origin.longitude}`,
        destiny: `${input.destination.latitude}, ${input.destination.longitude}`,
        distanceKm: input.distance,
        distance: input.duration,
        driverId: Number(input.driver.id),
        driverName: input.driver.name,
        totalPrice: input.value,
        customerId: Number(input.customer_id),
      },
    });
    return { success: true };
  }
}
