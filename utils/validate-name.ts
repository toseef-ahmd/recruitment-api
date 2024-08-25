import { APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export const validateName = (name: any): APIGatewayProxyResult | null => {
    if (name === undefined || name === null) {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: JSON.stringify({ message: 'Missing name parameter' }),
        };
    }

    if (typeof name !== 'string') {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: JSON.stringify({ message: 'Name must be a string' }),
        };
    }

    if (name.trim() === '') {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: JSON.stringify({ message: 'Name cannot be an empty string' }),
        };
    }

    if (!isNaN(Number(name))) {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: JSON.stringify({ message: 'Name cannot be a number' }),
        };
    }

    return null; // Name is valid
};
