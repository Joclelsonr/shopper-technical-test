import { Request, Response } from "express";
import { GoogleMapsService } from "../services/GoogleMaps";
import { DriverService } from "../services/DriverService";

class RideController {
  constructor(
    private googleMapsService: GoogleMapsService = new GoogleMapsService(),
    private driverService: DriverService = new DriverService()
  ) {}

  public estimate = async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const reqGoogleService = await this.googleMapsService.getEstimate(body);

      const getDrivers = await this.driverService.getAllDrivers();

      const drivers = getDrivers
        .map((driver) => {
          return {
            origin: reqGoogleService.routes[0].legs[0].start_location,
            destination: reqGoogleService.routes[0].legs[0].end_location,
            distance: reqGoogleService.routes[0].legs[0].distance.text,
            duration: reqGoogleService.routes[0].legs[0].duration.text,
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
                (reqGoogleService.routes[0].legs[0].distance.value / 1000) *
                Number(driver.rate),
            },
          };
        })
        .sort((a, b) => a.options.value - b.options.value);

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

      res.status(200).json(confirmRide);
    } catch (error) {
      res
        .status(400)
        .json({ error_code: 400, error_description: error.message });
    }
  };
}

export default new RideController();
