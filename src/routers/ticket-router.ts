import { Router } from "express";
import { authenticateToken } from "../middlewares";
import ticketsController from "../controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
.get("/types", authenticateToken, ticketsController.getTicketsTypes)
.get("/", authenticateToken, ticketsController.getTicketsUser)
.post("/", authenticateToken, ticketsController.createTicket)

export { ticketsRouter };