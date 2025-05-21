const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

interface LineData {
  city: string;
  order: number;
  name: string | number;
  type: string;
  stations: string[];
  terminus: string[];
}

async function importLines() {
  try {
    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'lines.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as LineData[];

    // Process each line
    for (const lineData of jsonData) {
      console.log(`Processing line ${lineData.name} for city ${lineData.city}...`);

      // Create or update the line
      await prisma.line.upsert({
        where: {
          city_name: {
            city: lineData.city,
            name: lineData.name.toString()
          }
        },
        update: {
          order: lineData.order.toString(),
          stations: lineData.stations
        },
        create: {
          city: lineData.city,
          name: lineData.name.toString(),
          order: lineData.order.toString(),
          stations: lineData.stations
        }
      });

      console.log(`Successfully processed line ${lineData.name}`);
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing lines:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importLines();
