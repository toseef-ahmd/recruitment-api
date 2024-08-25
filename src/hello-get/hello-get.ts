import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { validateName } from '../../utils/validate-name-util';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const name = event.pathParameters?.name;

    // Validate the name using the helper function
    const validationResult = validateName(name);
    if (validationResult) {
      return validationResult;
    }

    const decodedName = decodeURIComponent(name as string);
    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify({ message: `Hello ${decodedName}` }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: `Internal Server error` }),
    };
  }
};
