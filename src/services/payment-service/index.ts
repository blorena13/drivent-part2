import { notFoundError, requestError } from '../../errors';
import { badRequestError } from '../../errors/bad-request-error';
import paymentRepository from '../../repositories/payment-repository';
import ticketRepository from '../../repositories/tickets-repository';

async function getPayment(id: number) {
  if (!id) {
    throw badRequestError();
  }

  const existsTicket = await ticketRepository.getTicketsById(id);
  if (!existsTicket) {
    throw notFoundError();
  }

  return await paymentRepository.getPayment(id);


}

const paymentService = {
  getPayment,
};

export default paymentService;
