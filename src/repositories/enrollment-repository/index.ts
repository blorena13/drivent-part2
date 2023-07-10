import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findUser(userId: number){
  return prisma.enrollment.findFirst({
    where:{
      userId: userId
    }
  });
}

async function checkTicketOwners(ticketId: number, userId: number){
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      Ticket: {
        some: {
          id: ticketId
        }
      }
    }
  })
  return !!enrollment;
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findUser,
  checkTicketOwners
};

export default enrollmentRepository;
