import { PrismaClient } from '@prisma/client';
import lines from '../lines.json';
import { logger } from '../lib/logger';

const prisma = new PrismaClient();

async function importLines() {
  try {
    logger.info('Starting lines import...');

    // Clear existing lines
    await prisma.line.deleteMany();
    logger.info('Cleared existing lines');

    // Import new lines
    const importedLines = await prisma.line.createMany({
      data: lines.map(line => ({
        city: line.city,
        name: line.name.toString(),
        order: line.order.toString(),
        type: line.type,
        stations: line.stations,
        terminus: line.terminus
      }))
    });

    logger.info(`Successfully imported ${importedLines.count} lines`);
  } catch (error) {
    logger.error('Error importing lines:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importLines()
  .then(() => {
    logger.info('Import completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Import failed:', error);
    process.exit(1);
  });
