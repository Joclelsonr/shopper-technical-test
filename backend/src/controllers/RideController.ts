import { Request, Response } from "express";
import { GoogleMapsService } from "../services/GoogleMaps";
import { DriverService } from "../services/DriverService";
import { CustomerService } from "../services/CustomerService";

class RideController {
  constructor(
    private googleMapsService: GoogleMapsService = new GoogleMapsService(),
    private driverService: DriverService = new DriverService(),
    private customerService: CustomerService = new CustomerService()
  ) {}

  public index = async (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { driver_id } = req.query;
    try {
      const [customer] = await this.customerService.getCustomerById(
        Number(customerId),
        Number(driver_id)
      );

      res.status(200).json(customer);
    } catch (error) {
      res
        .status(404)
        .json({ error_code: 400, error_description: error.message });
    }
  };

  public estimate = async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const reqGoogleService = await this.googleMapsService.getEstimate(body);
      const getDrivers = await this.driverService.getAllDrivers();
      const drivers = await this.googleMapsService.calculatePrice(
        getDrivers,
        reqGoogleService
      );
      res.status(200).json({
        drivers,
        routeResponse: reqGoogleService,
      });
    } catch (error) {
      res
        .status(400)
        .json({ error_code: 400, error_description: error.message });
    }
  };

  public confirm = async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const confirmRide = await this.driverService.confirmRide(body);

      res.status(200).json({ success: confirmRide });
    } catch (error) {
      res
        .status(400)
        .json({ error_code: 400, error_description: error.message });
    }
  };
}

export default new RideController();
