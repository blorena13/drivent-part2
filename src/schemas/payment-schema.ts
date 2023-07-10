import Joi from "joi";

 export const paymentSchema = Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required()
})

export const createTicketSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: paymentSchema.required()
});
