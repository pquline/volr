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
        updatedAt: new Date()
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

    // First get the entry to check if it's associated with a custom line
    const entry = await prisma.entry.findUnique({
      where: { id },
      select: {
        lineId: true,
        line: {
          select: {
            isCustom: true,
          }
        }
      }
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    // Delete the entry
    await prisma.entry.delete({
      where: { id }
    });

    // If the line is custom, check if it has any remaining entries
    if (entry.line && entry.line.isCustom) {
      const remainingEntries = await prisma.entry.count({
        where: {
          lineId: entry.lineId
        }
      });

      // If no entries remain, delete the custom line
      if (remainingEntries === 0) {
        await prisma.line.delete({
          where: {
            id: entry.lineId
          }
        });
      }
    }

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

    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: {
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
