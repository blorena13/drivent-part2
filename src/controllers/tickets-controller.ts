import httpStatus from "http-status";
import { Request, Response } from "express";
import ticketService from "../services/ticket-service";

async function getTicketsTypes(req: Request, res: Response){
    const tickets =  await ticketService.getTicketsTypes();
    res.status(httpStatus.OK).send(tickets);
}

async function getTicketsUser(req: Request, res: Response){
    const id = parseInt(req.params.id);

    const ticketsUser = await ticketService.getTicketsUser(id);
    res.status(httpStatus.OK).send(ticketsUser);
}

async function createTicket(req: Request, res: Response){

}

const ticketsController = {
    getTicketsTypes,
    getTicketsUser,
    createTicket
}

export default ticketsController;