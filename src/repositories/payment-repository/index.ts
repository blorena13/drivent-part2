import { prisma } from '@/config';
import { TicketType, Ticket, Payment } from '@prisma/client';
import { CardInfo } from '../../protocols';

async function getPayment(ticketId: number){

    const payment = await prisma.payment.findFirst({
        where: {ticketId: ticketId}
    });

    return {
        id: payment.id,
        ticketId: payment.ticketId,
        value: payment.value,
        cardIssuer: payment.cardIssuer,
        cardLastDigits: payment.cardLastDigits,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt
    }
}

async function postPayment(ticketId: number, cardData: CardInfo, value: number){
    
    const payment = await prisma.payment.create({
        data: {
            ticketId: ticketId,
            value: value,
            cardIssuer: cardData.issuer,
            cardLastDigits: cardData.number.toString().slice(-4),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });

    return {
        id: payment.id,
        ticketId: payment.ticketId,
        value: payment.value,
        cardIssuer: payment.cardIssuer,
        cardLastDigits: payment.cardLastDigits,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt
    }
}

const paymentRepository = {
    getPayment,
    postPayment
}

export default paymentRepository;