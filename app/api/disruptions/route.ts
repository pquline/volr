import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { protectApiRoute } from '@/lib/security';

const disruptionSchema = z.object({
  city: z.string().min(1),
  lineName: z.string().min(1),
  station: z.string().min(1),
  comment: z.string().max(40).optional(),
});

const sanitizeText = (text: string) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

async function handler(request: Request) {
  try {
    if (request.method === 'POST') {
      const body = await request.json();
      logger.debug('Received POST request body:', body);

      const validationResult = disruptionSchema.safeParse(body);
      if (!validationResult.success) {
        logger.error('Validation error:', validationResult.error);
        return NextResponse.json(
          { error: 'Invalid input data', details: validationResult.error.format() },
          { status: 400 }
        );
      }

      const { city, lineName, station, comment } = validationResult.data;

      const sanitizedLineName = sanitizeText(lineName);
      const sanitizedStation = sanitizeText(station);

      let lineRecord = await prisma.line.findFirst({
        where: {
          city,
          name: sanitizedLineName,
        },
      });

      if (!lineRecord) {
        lineRecord = await prisma.line.create({
          data: {
            city,
            name: sanitizedLineName,
            type: 'custom',
            order: 999,
            stations: [sanitizedStation],
          },
        });
        logger.info(`Created new custom line: ${sanitizedLineName} for city: ${city}`);
      }

      const entry = await prisma.entry.create({
        data: {
          city,
          lineName: sanitizedLineName,
          station: sanitizedStation,
          comment: comment || '',
          lineId: lineRecord.id,
        },
      });

      logger.info(`Created new disruption entry: ${entry.id}`);
      return NextResponse.json(entry, { status: 201 });
    }

    if (request.method === 'GET') {
      const { searchParams } = new URL(request.url);
      const city = searchParams.get('city');
      const line = searchParams.get('line');
      const station = searchParams.get('station');

      if (!city) {
        return NextResponse.json(
          { error: 'City parameter is required' },
          { status: 400 }
        );
      }

      const entries = await prisma.entry.findMany({
        where: {
          city,
          ...(line && { lineName: line }),
          ...(station && { station }),
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      logger.debug(`Fetched ${entries.length} disruptions`);
      return NextResponse.json(entries);
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error) {
    logger.error('Error handling disruption:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = protectApiRoute(handler);
export const POST = protectApiRoute(handler);
