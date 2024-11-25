import { prisma } from "../database";

export class DriverService {
  constructor() {}

  public async getAllDrivers() {
    const drivers = await prisma.driver.findMany();
    return drivers;
  }
}
