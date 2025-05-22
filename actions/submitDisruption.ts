'use server';

import { z } from 'zod';

const formSchema = z.object({
  city: z.string().min(1),
  line: z.string().min(1),
  station: z.string().min(1),
  comment: z.string().max(40).optional(),
});

export async function submitDisruption(data: z.infer<typeof formSchema>) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/disruptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: data.city.charAt(0).toUpperCase() + data.city.slice(1),
        lineName: data.line,
        station: data.station,
        comment: data.comment
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error response:', errorData);
      throw new Error(errorData?.error || 'Failed to submit disruption');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting disruption:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to submit disruption' };
  }
}
