import { notFoundError, requestError } from "../../errors";
import ticketRepository from "../../repositories/tickets-repository";

export async function getTicketsTypes(){
return await ticketRepository.getByTypes();
}

export async function getTicktesUser(id: number){
const ticketsUser = await ticketRepository.getTicketsUser(id);
if (!ticketsUser){
    throw notFoundError();
}

return ticketsUser;
}

export async function createTicket(ticketTypeId: number, enrollmentId: number){

    if(!ticketTypeId){
        throw requestError(400, 'falta ticketType na requisição');
    }
    return await ticketRepository.createTicket(ticketTypeId, enrollmentId);

}

const ticketService = {
    getTicketsTypes,
    getTicktesUser,
    createTicket
}

export default ticketService;