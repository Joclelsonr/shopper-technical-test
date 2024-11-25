import { Router } from "express";
import RideController from "../controllers/RideController";

const router = Router();

router.post("/ride/estimate", RideController.estimate);
router.patch("/ride/confirm", RideController.confirm);

export default router;
