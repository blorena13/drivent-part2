import { Router } from "express";
import { authenticateToken } from "../middlewares";

const paymentRouter = Router();

paymentRouter.get("/:ticketId", authenticateToken);
paymentRouter.post("/process", authenticateToken);

export { paymentRouter };