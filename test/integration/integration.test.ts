import axios, { AxiosError } from 'axios';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// console.log('Loaded environment variables:', process.env);
const _appUrl = process.env.APP_URL;
const _apiKey = process.env.API_KEY;

describe('Integration Tests for Recruitment API', () => {
  it('should return 400 Bad Request for missing name in POST request', async () => {
    try {
      await axios.post(
        `${_appUrl}/hello/`,
        {},
        {
          headers: {
            'x-api-key': _apiKey,
          },
        },
      );
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      expect(axiosError.response?.status).toBe(400);
      expect(axiosError.response?.data).toEqual({ message: 'Bad Request' });
    }
  });

  it('should return 401 Unauthorized for missing API key in POST request', async () => {
    try {
      await axios.post(`${_appUrl}/hello/`, { name: 'toseef ahmed' });
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      expect(axiosError.response?.status).toBe(401);
      expect(axiosError.response?.data).toEqual({
        message: 'Unauthorized: Missing API key',
      });
    }
  });
});
