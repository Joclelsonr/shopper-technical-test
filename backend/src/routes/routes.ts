import { Router } from "express";
import RideController from "../controllers/RideController";
import CustomerController from "../controllers/CustomerController";

const router = Router();

router.get("/ride/:customerId", RideController.index);
router.post("/ride/estimate", RideController.estimate);
router.patch("/ride/confirm", RideController.confirm);

router.post("/customer", CustomerController.create);

export default router;
