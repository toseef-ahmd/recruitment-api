import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './hello-get';
import { StatusCodes } from 'http-status-codes';

describe('Testing Lambda - hello-get', () => {
  it('should return a 200 status and greeting message when name is provided', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: { name: 'Toseef Ahmed' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify({ message: 'Hello Toseef Ahmed' }));
  });

  it('should return a 400 status and error message when name is missing', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {},
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toBe(JSON.stringify({ message: 'Bad Request' }));
  });

  it('should return a 400 status and error message when name is an empty string', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: { name: '' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toBe(JSON.stringify({ message: 'Bad Request' }));
  });

  it('should return a 400 status and error message when name is a number', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: { name: ['Toseef'] }, //Sending an array instead of string
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toBe(JSON.stringify({ message: 'Bad Request' }));
  });

  it('should return a 400 status and error message when name is not a string', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: { name: 1234 as unknown as string }, // Type casting to simulate an invalid input
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toBe(JSON.stringify({ message: 'Bad Request' }));
  });
});
