import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const lineName = searchParams.get('line');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // If lineName is provided, get stations for that specific line
    if (lineName) {
      const line = await prisma.line.findFirst({
        where: {
          city,
          name: lineName
        },
        select: {
          stations: true
        }
      });

      if (!line) {
        return NextResponse.json(
          { error: 'Line not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(line.stations);
    }

    // If no lineName is provided, get all unique stations for the city
    const lines = await prisma.line.findMany({
      where: { city },
      select: { stations: true }
    });

    // Get unique stations across all lines
    const uniqueStations = Array.from(
      new Set(lines.flatMap(line => line.stations))
    );

    return NextResponse.json(uniqueStations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations' },
      { status: 500 }
    );
  }
}
