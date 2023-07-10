import httpStatus from "http-status";
import { Request, Response } from "express";
import paymentService from "../services/payment-service";

async function getPayment(req: Request, res: Response){
    const ticketId = req.params;

    const payment = await paymentService.getPayment(Number(ticketId));
    res.status(httpStatus.OK).send(payment);
}

async function createPayment(req: Request, res: Response){
    const { ticketId, cardData } = req.body;
    const payment = await paymentService.createPayment(ticketId, cardData);
    res.status(httpStatus.OK).send(payment);
}

const paymentController = {
    getPayment,
    createPayment
}

export default paymentController;