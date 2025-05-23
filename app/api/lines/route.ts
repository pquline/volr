import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { protectApiRoute } from '@/lib/security';

async function handler(request: Request) {
  try {
    if (request.method === 'GET') {
      const { searchParams } = new URL(request.url);
      const city = searchParams.get('city');
      const name = searchParams.get('name');

      logger.debug(`Received request for city: ${city}, name: ${name}`);

      if (!city) {
        return NextResponse.json(
          { error: 'City parameter is required' },
          { status: 400 }
        );
      }

      // Format city name to match database format (capitalize first letter)
      const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      logger.debug(`Formatted city from "${city}" to "${formattedCity}"`);

      const lines = await prisma.line.findMany({
        where: {
          city: formattedCity,
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

      logger.debug(`Fetched lines: ${JSON.stringify(lines, null, 2)}`);
      return NextResponse.json(lines);
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { city, name, order, stations } = body;

      if (!city || !name || !order || !stations) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

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

      logger.info(`Created new line: ${line.id}`);
      return NextResponse.json(line, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error) {
    logger.error('Error in lines API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = protectApiRoute(handler);
export const POST = protectApiRoute(handler);
