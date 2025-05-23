const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Simple logger implementation
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string, error?: any) => console.error(`[ERROR] ${message}`, error || '')
};

async function importLines() {
  try {
    logger.info('Starting lines import...');

    // Read and parse lines.json
    const linesPath = path.join(__dirname, '..', 'lines.json');
    const lines = JSON.parse(fs.readFileSync(linesPath, 'utf8'));

    // Clear existing data in the correct order (delete dependent records first)
    logger.info('Clearing existing entries...');
    await prisma.entry.deleteMany();
    logger.info('Cleared existing entries');

    logger.info('Clearing existing lines...');
    await prisma.line.deleteMany();
    logger.info('Cleared existing lines');

    // Import new lines
    const importedLines = await prisma.line.createMany({
      data: lines.map((line: any) => ({
        city: line.city,
        name: line.name.toString(),
        order: parseInt(line.order, 10),
        type: line.type || 'bus',
        stations: line.stations
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
