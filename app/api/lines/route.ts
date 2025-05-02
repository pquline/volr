import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const name = searchParams.get('name');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    const lines = await prisma.line.findMany({
      where: {
        city,
        ...(name && { name })
      },
      include: {
        entries: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(lines);
  } catch (error) {
    console.error('Error fetching lines:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lines' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, name, order, stations } = body;

    const line = await prisma.line.create({
      data: {
        city,
        name,
        order,
        stations
      },
      include: {
        entries: true
      }
    });

    return NextResponse.json(line, { status: 201 });
  } catch (error) {
    console.error('Error creating line:', error);
    return NextResponse.json(
      { error: 'Failed to create line' },
      { status: 500 }
    );
  }
}
