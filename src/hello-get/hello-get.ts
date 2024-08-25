import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { validateName } from '../../utils/validate-name';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const name = event.pathParameters?.name;

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
