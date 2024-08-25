import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './hello-get';
import { StatusCodes } from 'http-status-codes';

describe('Testing Lambda - hello-get', () => {
    it('should return a 200 status and greeting message when name is provided', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { name: 'Toseef' },
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.OK);
        expect(result.body).toBe(JSON.stringify({ message: 'Hello Toseef' }));
    });

    it('should return a 400 status and error message when name is missing', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {},
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Missing name parameter' }));
    });

    it('should return a 400 status and error message when name is an empty string', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { name: '' },
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name cannot be an empty string' }));
    });

    it('should return a 400 status and error message when name is a number', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { name: '1234' },
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name cannot be a number' }));
    });
    
    it('should return a 400 status and error message when name is not a string', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { name: 1234 as any }, // Type casting to simulate an invalid input
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name must be a string' }));
    });
});
