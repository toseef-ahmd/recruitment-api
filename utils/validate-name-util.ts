import { StatusCodes } from "http-status-codes";

export const validateName = (name?: string) => {
    if (!name || name===undefined || typeof name !== 'string' || name.trim() === '') {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: JSON.stringify({ message: 'Bad Request' }),
        };
    }
    return null;
};
