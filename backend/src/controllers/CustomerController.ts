import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";

class CustomerController {
  constructor(
    private customerService: CustomerService = new CustomerService()
  ) {}

  public create = async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const customer = await this.customerService.createCustomer(body);
      res.status(200).json({ ...customer, sucsess: true });
    } catch (error) {
      res.status(error.statusCode).json({
        error_code: error.statusCode,
        error_description: error.message,
      });
    }
  };
}

export default new CustomerController();
