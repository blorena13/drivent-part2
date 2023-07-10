import { prisma } from '@/config';
import { TicketType, Ticket } from '@prisma/client';

async function getByTypes(){
    return await prisma.ticketType.findMany();
}

async function getTicketsById(id: number){
    return await prisma.ticket.findUnique({
        where: {id: id}
    });
}

async function getTicketsUser(id: number){
    const userTicket = await prisma.ticket.findFirst({
        where:{
            Enrollment:{
                userId: id
            }
        },
        include:{
            TicketType: true
        }
    });

        return {
            id: userTicket.id,
            status: userTicket.status,
            ticketTypeId: userTicket.ticketTypeId,
            enrollmentId: userTicket.enrollmentId,
            TicketType: {
                id: userTicket.TicketType.id,
                name:userTicket.TicketType.name,
                price: userTicket.TicketType.price,
                isRemote: userTicket.TicketType.isRemote,
                includesHotel: userTicket.TicketType.includesHotel,
                createdAt: userTicket.TicketType.createdAt,
                updatedAt: userTicket.TicketType.updatedAt
            },
            createdAt: userTicket.createdAt,
            updatedAt: userTicket.updatedAt
        };

}


async function createTicket(ticketTypeId: number, enrollmentId: number){


        const createdTicket = await prisma.ticket.create({
            data: {
                ticketTypeId: ticketTypeId,
                enrollmentId: enrollmentId,
                status: 'RESERVED'
            },
            include:{
                TicketType: true
            }
        });

        return {
            id: createdTicket.id,
            status: createdTicket.status,
            ticketTypeId: createdTicket.ticketTypeId,
            enrollmentId: createdTicket.enrollmentId,
            TicketType: {
                id: createdTicket.TicketType.id,
                name:createdTicket.TicketType.name,
                price: createdTicket.TicketType.price,
                isRemote: createdTicket.TicketType.isRemote,
                includesHotel: createdTicket.TicketType.includesHotel,
                createdAt: createdTicket.TicketType.createdAt,
                updatedAt: createdTicket.TicketType.updatedAt
            },
            createdAt: createdTicket.createdAt,
            updatedAt: createdTicket.updatedAt
        }
        
}

async function verifyTicket(ticketId: number){
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId
        },
        include:{
            TicketType: true
        }
    })
}

const ticketRepository = {
    getByTypes,
    getTicketsUser,
    createTicket,
    getTicketsById,
    verifyTicket
}

export default ticketRepository;