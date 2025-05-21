'use server';

export async function deleteDisruption(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/disruptions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete disruption');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error deleting disruption:', error);
    return { success: false, error: 'Failed to delete disruption' };
  }
}
