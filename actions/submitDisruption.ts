'use server';

import { z } from 'zod';

const formSchema = z.object({
  line: z.string().min(1),
  station: z.string().min(1),
  comment: z.string().max(180).optional(),
});

export async function submitDisruption(data: z.infer<typeof formSchema>) {
  try {
    // Simulate API call to a fake endpoint
    const response = await fetch('https://api.example.com/disruptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit disruption');
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting disruption:', error);
    return { success: false, error: 'Failed to submit disruption' };
  }
}
