import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './hello-post';
import { StatusCodes } from 'http-status-codes';

describe('Testing Lambda - hello-post', () => {
  it('should return a 200 status and greeting message when name is provided in the request body', async () => {
    const event: APIGatewayProxyEvent = {
      headers: { 'x-api-key': 'valid-api-key' },
      body: JSON.stringify({ name: 'Toseef' }),
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify({ message: 'Hello Toseef' }));
  });

  it('should return a 400 status and error message when request body is empty', async () => {
    const event: APIGatewayProxyEvent = {
      headers: { 'x-api-key': 'valid-api-key' },
      body: JSON.stringify({}),
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toBe(JSON.stringify({ message: 'Bad Request' }));
  });

  it('should return a 401 status and error message when API key is missing', async () => {
    const event: APIGatewayProxyEvent = {
      headers: {},
      body: JSON.stringify({ name: 'Toseef' }),
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toBe(
      JSON.stringify({ message: 'Unauthorized: Missing API key' }),
    );
  });

  it('should return a 401 status and error message when API key is an empty string', async () => {
    const event: APIGatewayProxyEvent = {
      headers: { 'x-api-key': '' },
      body: JSON.stringify({ name: 'Toseef' }),
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toBe(
      JSON.stringify({ message: 'Unauthorized: Missing API key' }),
    );
  });
});
