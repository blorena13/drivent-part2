import httpStatus from "http-status";
import { Request, Response } from "express";
import ticketService from "../services/ticket-service";

async function getTicketsTypes(req: Request, res: Response){
    const tickets =  await ticketService.getTicketsTypes();
    res.status(httpStatus.OK).send(tickets);
}

async function getTicketsUser(req: Request , res: Response){
    const id = res.locals.userId;

    const ticketsUser = await ticketService.getTicketsUser(Number(id));
    res.status(httpStatus.OK).send(ticketsUser);
}

async function createTicket(req: Request, res: Response){
    const id = res.locals.userId;
    const { ticketTypeId } = req.body;
    
    const newTicket = await ticketService.createTicket(ticketTypeId, id);
    res.status(httpStatus.CREATED).send(newTicket);

}

const ticketsController = {
    getTicketsTypes,
    getTicketsUser,
    createTicket
}

export default ticketsController;