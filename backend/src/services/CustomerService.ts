import { Customer } from "@prisma/client";
import prisma from "../database";
import BaseError from "../errors/BaseError";

export class CustomerService {
  constructor() {}

  public async getCustomerById(
    customerId: number,
    driverId?: number
  ): Promise<Customer[]> {
    if (!customerId) {
      throw new BaseError(400, "Customer ID is required");
    }

    let customers = [];
    if (driverId) {
      const validDriver = await prisma.driver.findUnique({
        where: { id: driverId },
      });
      if (!validDriver) {
        throw new BaseError(404, "No rides found");
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
      throw new BaseError(400, "Customer name is required");
    }
    if (!customer.email) {
      throw new BaseError(400, "Customer email is required");
    }
    const customerExists = await prisma.customer.findUnique({
      where: { email: customer.email },
    });
    if (customerExists) {
      throw new BaseError(404, "Customer already exists");
    }

    const createdCustomer = await prisma.customer.create({
      data: customer,
    });
    return createdCustomer;
  }
}
