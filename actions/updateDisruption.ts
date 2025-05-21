'use server';

export async function updateDisruption(id: string, edits: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/disruptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ edits }),
    });

    if (!response.ok) {
      throw new Error('Failed to update disruption');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating disruption:', error);
    return { success: false, error: 'Failed to update disruption' };
  }
}
