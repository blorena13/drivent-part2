import { notFoundError } from '../../errors';
import { badRequestError } from '../../errors/bad-request-error';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketRepository from '../../repositories/tickets-repository';
import userRepository from '../../repositories/user-repository';

export async function getTicketsTypes() {
  return await ticketRepository.getByTypes();
}

export async function getTicketsUser(id: number) {
  const existsUser = await userRepository.findById(id);
  if (!existsUser) {
    throw notFoundError();
  }

  const ticketsUser = await ticketRepository.getTicketsUser(id);
  if (!ticketsUser) {
    throw notFoundError();
  }

  return ticketsUser;
}

export async function createTicket(ticketTypeId: number, enrollmentId: number) {
  if (!ticketTypeId) {
    throw badRequestError();
  }

  const existsUser = await enrollmentRepository.findUser(enrollmentId);
  if(!existsUser){
    throw notFoundError();
  }

  return await ticketRepository.createTicket(ticketTypeId, enrollmentId);
}

const ticketService = {
  getTicketsTypes,
  getTicketsUser,
  createTicket,
};

export default ticketService;
