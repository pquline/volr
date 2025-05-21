import { toast } from 'sonner';

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

export const validateInput = (data: unknown, schema: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new AppError('Invalid input data', 400);
  }
};
