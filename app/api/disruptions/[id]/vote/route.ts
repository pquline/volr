import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const voteSchema = z.object({
  voteType: z.enum(['up', 'down', 'remove']),
  previousVote: z.enum(['up', 'down']).optional()
});

interface RouteContext {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validationResult = voteSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid accuracy update type' },
        { status: 400 }
      );
    }

    const { voteType, previousVote } = validationResult.data;
    let voteValue = 0;

    if (voteType === 'up') {
      if (previousVote === 'down') {
        // Changing from downvote to upvote: remove -1 and add +1 = +2
        voteValue = 2;
      } else {
        voteValue = 1;
      }
    } else if (voteType === 'down') {
      if (previousVote === 'up') {
        // Changing from upvote to downvote: remove +1 and add -1 = -2
        voteValue = -2;
      } else {
        voteValue = -1;
      }
    } else if (voteType === 'remove' && previousVote) {
      // If removing a vote, decrement by the opposite of the previous vote
      voteValue = previousVote === 'up' ? -1 : 1;
    }

    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: {
        votes: {
          increment: voteValue
        },
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    logger.error('Error voting on disruption:', error);
    return NextResponse.json(
      { error: 'Failed to update accuracy' },
      { status: 500 }
    );
  }
}
