import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { validateName } from '../../utils/validate-name-util';
import { apiKeyUtil } from '../../utils/security-util';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const apiKeyResult = apiKeyUtil(event);
    if (apiKeyResult) {
      return apiKeyResult; // Return the unauthorized response if API key is missing
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const name = body?.name;

    // Validate the name using the helper function
    const validationResult = validateName(name);
    if (validationResult) {
      return validationResult;
    }

    const decodedName = decodeURIComponent(name);
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
