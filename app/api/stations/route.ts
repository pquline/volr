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

        logger.debug(`Fetched ${line.stations.length} stations for line ${lineName}`);
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

      logger.debug(`Fetched ${uniqueStations.length} unique stations`);
      return NextResponse.json(uniqueStations);
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error) {
    logger.error('Error in stations API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = protectApiRoute(handler);
