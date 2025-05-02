import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const lineName = searchParams.get('line');
    const station = searchParams.get('station');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    const disruptions = await prisma.entry.findMany({
      where: {
        city,
        ...(lineName && { lineName }),
        ...(station && { station })
      },
      include: {
        line: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(disruptions);
  } catch (error) {
    console.error('Error fetching disruptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disruptions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, lineName, station, comment } = body;

    // First, find or create the line
    const line = await prisma.line.upsert({
      where: {
        city_name: {
          city,
          name: lineName
        }
      },
      update: {},
      create: {
        city,
        name: lineName,
        order: '', // You might want to handle this differently
        stations: [station]
      }
    });

    // Then create the disruption entry
    const disruption = await prisma.entry.create({
      data: {
        city,
        lineName,
        station,
        comment,
        lineId: line.id
      },
      include: {
        line: true
      }
    });

    return NextResponse.json(disruption, { status: 201 });
  } catch (error) {
    console.error('Error creating disruption:', error);
    return NextResponse.json(
      { error: 'Failed to create disruption' },
      { status: 500 }
    );
  }
}
