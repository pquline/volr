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

    // Capitalize the city name
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    const disruptions = await prisma.entry.findMany({
      where: {
        city: capitalizedCity,
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

    if (!city || !lineName || !station) {
      return NextResponse.json(
        { error: 'Missing required fields: city, lineName, and station are required' },
        { status: 400 }
      );
    }

    // Capitalize the city name
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    // First, find or create the line
    const line = await prisma.line.upsert({
      where: {
        city_name: {
          city: capitalizedCity,
          name: lineName
        }
      },
      update: {},
      create: {
        city: capitalizedCity,
        name: lineName,
        order: '', // You might want to handle this differently
        stations: [station]
      }
    });

    // Then create the disruption entry
    const disruption = await prisma.entry.create({
      data: {
        city: capitalizedCity,
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
      { error: error instanceof Error ? error.message : 'Failed to create disruption' },
      { status: 500 }
    );
  }
}
