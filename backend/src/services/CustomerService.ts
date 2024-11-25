import { prisma } from "../database";

export class CustomerService {
  constructor() {}

  public async getCustomerById(customerId: number, driverId?: number) {
    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    let customers = [];
    if (driverId) {
      const validDriver = await prisma.driver.findUnique({
        where: { id: driverId },
      });
      if (!validDriver) {
        throw new Error("No rides found");
      }
      customers = await prisma.customer.findMany({
        where: {
          id: customerId,
        },
        include: {
          Races: {
            where: { driverId: driverId },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      return customers;
    }

    customers = await prisma.customer.findMany({
      where: { id: customerId },
      include: {
        Races: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return customers;
  }
}
