import httpStatus from "http-status";
import { Request, Response } from "express";
import ticketService from "../services/ticket-service";

async function getTicketsTypes(req: Request, res: Response){
    const tickets =  await ticketService.getTicketsTypes();
    res.status(200).send(tickets);
}

async function getTicketsUser(req: Request, res: Response){
    const id = parseInt(req.params.id);

    const ticketsUser = await ticketService.getTicktesUser(id);
    res.status(200).send(ticketsUser);
}

async function createTicket(req: Request, res: Response){

}

const ticketsController = {
    getTicketsTypes,
    getTicketsUser,
    createTicket
}

export default ticketsController;