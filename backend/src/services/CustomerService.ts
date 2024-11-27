import { Customer } from "@prisma/client";
import { prisma } from "../database";

export class CustomerService {
  constructor() {}

  public async getCustomerById(
    customerId: number,
    driverId?: number
  ): Promise<Customer[]> {
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
          races: {
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
        races: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return customers;
  }

  public async createCustomer(customer: Customer): Promise<Customer> {
    if (!customer.name) {
      throw new Error("Customer name is required");
    }
    if (!customer.email) {
      throw new Error("Customer email is required");
    }
    const customerExists = await prisma.customer.findUnique({
      where: { email: customer.email },
    });
    if (customerExists) {
      throw new Error("Customer already exists");
    }

    const createdCustomer = await prisma.customer.create({
      data: customer,
    });
    return createdCustomer;
  }
}
