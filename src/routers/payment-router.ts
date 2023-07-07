import { Router } from "express";
import { authenticateToken } from "../middlewares";

const paymentRouter = Router();

paymentRouter.get("/payments?ticketId=1", authenticateToken);
paymentRouter.post("/payments/process", authenticateToken);

export { paymentRouter };