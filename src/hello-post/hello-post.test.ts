import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './hello-post';
import { StatusCodes } from 'http-status-codes';

describe('Testing Lambda - hello-post', () => {
    it('should return a 200 status and greeting message when name is valid', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: 'Toseef' }),
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.OK);
        expect(result.body).toBe(JSON.stringify({ message: 'Hello Toseef' }));
    });

    it('should return a 400 status and error message when name is missing', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({}),
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Missing name parameter' }));
    });

    it('should return a 400 status and error message when body is undefined', async () => {
        const event: APIGatewayProxyEvent = {
            body: undefined,
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Missing name parameter' }));
    });

    it('should return a 400 status and error message when name is an empty string', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: '' }),
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name cannot be an empty string' }));
    });

    it('should return a 400 status and error message when name is a number', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: '1234' }),
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name cannot be a number' }));
    });
    
    it('should return a 400 status and error message when name is not a string', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({ name: 1234 }),
        } as any;

        const result = await handler(event);

        expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(result.body).toBe(JSON.stringify({ message: 'Name must be a string' }));
    });
});
