import { notFoundError, requestError, unauthorizedError } from '../../errors';
import { badRequestError } from '../../errors/bad-request-error';
import { CardInfo } from '../../protocols';
import enrollmentRepository from '../../repositories/enrollment-repository';
import paymentRepository from '../../repositories/payment-repository';
import ticketRepository from '../../repositories/tickets-repository';

async function getPayment(id: number, userId: number) {
  if (!id) {
    throw badRequestError();
  }

  const existsTicket = await ticketRepository.getTicketsById(id);
  if (!existsTicket) {
    throw notFoundError();
  }

  const isTicketOwnerByUser =  await enrollmentRepository.checkTicketOwners(id, userId);
  if(!isTicketOwnerByUser){
    throw unauthorizedError();
  }

  const payment = await paymentRepository.getPayment(id);
  if(!payment){
    throw notFoundError();
  }

  return payment;
}

async function createPayment(ticketId: number, cardData: CardInfo){

    if(!ticketId || !cardData){
        throw badRequestError();
    }

    const existsTicket = await ticketRepository.getTicketsById(ticketId);
    if(!existsTicket){
        throw notFoundError();
    }

    const verifyTicket = await ticketRepository.verifyTicket(ticketId);
    if(!verifyTicket){
        throw notFoundError();
    }

    const ticketType = verifyTicket.TicketType;
    const value = ticketType.price;


    return await paymentRepository.postPayment(ticketId, cardData, value);
}

const paymentService = {
  getPayment,
  createPayment
};

export default paymentService;
