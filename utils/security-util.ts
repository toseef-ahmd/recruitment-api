import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export const apiKeyUtil = (event: APIGatewayProxyEvent): APIGatewayProxyResult | null => {
    const apiKey = event.headers?.['x-api-key'];
    
    if (!apiKey || apiKey == 'undefined') {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            body: JSON.stringify({ message: 'Unauthorized: Missing API key' }),
        };
    }

    return null;
};
