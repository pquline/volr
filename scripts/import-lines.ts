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
    const jsonPath = path.join(process.cwd(), 'lines.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as LineData[];

    for (const lineData of jsonData) {
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

      console.log(`+ ${lineData.name} @ ${lineData.city}`);
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing lines:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importLines();
