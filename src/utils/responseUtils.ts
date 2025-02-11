import { ApiResponse } from '../types/response';

export const successResponse = <T>(
  message: string,
  data: T
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message: string,
  error?: string
): ApiResponse<null> => ({
  success: false,
  message,
  error,
});
