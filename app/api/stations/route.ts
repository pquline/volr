import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { protectApiRoute } from '@/lib/security';

async function handler(request: Request) {
  try {
    if (request.method === 'GET') {
      const { searchParams } = new URL(request.url);
      const city = searchParams.get('city');
      const lineName = searchParams.get('line');

      if (!city) {
        return NextResponse.json(
          { error: 'City parameter is required' },
          { status: 400 }
        );
      }

      // Format city name to match database format (capitalize first letter)
      const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

      // If lineName is provided, get stations for that specific line
      if (lineName) {
        const line = await prisma.line.findFirst({
          where: {
            city: formattedCity,
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
        where: { city: formattedCity },
        select: { stations: true }
      });

      // Get unique stations across all lines
      const uniqueStations = Array.from(
        new Set(lines.flatMap((line: { stations: string[] }) => line.stations))
      );

      return NextResponse.json(uniqueStations);
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = protectApiRoute(handler);
