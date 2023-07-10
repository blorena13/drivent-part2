import { ApplicationError } from "../protocols";

export function badRequestError(message = 'Bad Request'): ApplicationError{
    return {
        name: 'BadRequestError',
        message: message
    }
}