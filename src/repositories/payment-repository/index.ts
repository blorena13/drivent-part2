import { prisma } from '@/config';
import { TicketType, Ticket, Payment } from '@prisma/client';

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

async function postPayment(){

}

const paymentRepository = {
    getPayment,
    postPayment
}

export default paymentRepository;