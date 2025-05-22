'use server';

export async function voteDisruption(id: string, voteType: 'up' | 'down' | 'remove', previousVote?: 'up' | 'down') {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/disruptions/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType, previousVote }),
    });

    if (!response.ok) {
      throw new Error('Failed to vote on disruption');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error voting on disruption:', error);
    return { success: false, error: 'Failed to vote on disruption' };
  }
}
