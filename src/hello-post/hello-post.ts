import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { validateName } from '../../utils/validate-name';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = JSON.parse(event.body || '{}');
    const name = body.name;

    // Validate the name using the helper function
    const validationResult = validateName(name);
    if (validationResult) {
        return validationResult;
    }

    return {
        statusCode: StatusCodes.OK,
        body: JSON.stringify({ message: `Hello ${name}` }),
    };
};
