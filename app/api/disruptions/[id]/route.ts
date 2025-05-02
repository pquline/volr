import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const disruption = await prisma.entry.findUnique({
      where: { id: parseInt(params.id) },
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
    console.error('Error fetching disruption:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disruption' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { station, comment } = body;

    const disruption = await prisma.entry.update({
      where: { id: parseInt(params.id) },
      data: {
        station,
        comment,
        edits: { increment: 1 }
      },
      include: { line: true }
    });

    return NextResponse.json(disruption);
  } catch (error) {
    console.error('Error updating disruption:', error);
    return NextResponse.json(
      { error: 'Failed to update disruption' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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
    console.error('Error deleting disruption:', error);
    return NextResponse.json(
      { error: 'Failed to delete disruption' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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
    console.error('Error updating disruption:', error);
    return NextResponse.json(
      { error: 'Failed to update disruption' },
      { status: 500 }
    );
  }
}
