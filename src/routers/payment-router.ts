import { Router } from "express";
import { authenticateToken } from "../middlewares";
import paymentController from "../controllers/payments-controller";

const paymentRouter = Router();

paymentRouter.get("/:ticketId", authenticateToken, paymentController.getPayment);
paymentRouter.post("/process", authenticateToken, paymentController.createPayment);

export { paymentRouter };