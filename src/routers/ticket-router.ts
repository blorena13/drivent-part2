import { Router } from "express";
import { authenticateToken } from "../middlewares";
import ticketsController from "../controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter.get("/tickets/types", authenticateToken, ticketsController.getTicketsTypes);
ticketsRouter.get("/tickets", authenticateToken, ticketsController.getTicketsUser);
ticketsRouter.post("/tickets", authenticateToken, ticketsController.createTicket);

export { ticketsRouter };