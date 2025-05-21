import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, context: any) {
  try {
    const disruption = await prisma.entry.findUnique({
      where: { id: parseInt(context.params.id) },
      include: { line: true }
    });

    if (!disruption) {
      return NextResponse.json(
        { error: 'Disruption not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(disruption);
  } catch (error) {
    logger.error('Error fetching disruption:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disruption' },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: NextRequest, context: any) {
  try {
    const body = await request.json();
    const { station, comment } = body;

    const disruption = await prisma.entry.update({
      where: { id: parseInt(context.params.id) },
      data: {
        station,
        comment,
        edits: { increment: 1 }
      },
      include: { line: true }
    });

    return NextResponse.json(disruption);
  } catch (error) {
    logger.error('Error updating disruption:', error);
    return NextResponse.json(
      { error: 'Failed to update disruption' },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: NextRequest, context: any) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    await prisma.entry.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting disruption:', error);
    return NextResponse.json(
      { error: 'Failed to delete disruption' },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: NextRequest, context: any) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { edits } = body;

    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: {
        edits: edits + 1,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    logger.error('Error updating disruption:', error);
    return NextResponse.json(
      { error: 'Failed to update disruption' },
      { status: 500 }
    );
  }
}
