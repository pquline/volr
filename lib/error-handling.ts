import { toast } from 'sonner';
import { z } from 'zod';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return { error: error.message, statusCode: error.statusCode };
  }

  if (error instanceof Error) {
    toast.error('An unexpected error occurred');
    return { error: error.message, statusCode: 500 };
  }

  toast.error('An unexpected error occurred');
  return { error: 'An unexpected error occurred', statusCode: 500 };
};

export const validateInput = <T>(data: unknown, schema: z.ZodSchema<T>): T => {
  try {
    return schema.parse(data);
  } catch {
    throw new AppError('Invalid input data', 400);
  }
};
