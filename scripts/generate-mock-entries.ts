const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Simple logger implementation
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string, error?: any) => console.error(`[ERROR] ${message}`, error || '')
};

// Mock data for each city
const mockData = {
  paris: {
    lines: [
      { name: '1', stations: ['La Défense', 'Charles de Gaulle - Étoile', 'Châtelet'] },
      { name: '2', stations: ['Porte Dauphine', 'Charles de Gaulle - Étoile', 'Nation'] },
    ]
  },
  marseille: {
    lines: [
      { name: '1', stations: ['La Rose', 'Saint-Charles', 'La Fourragère'] },
      { name: '2', stations: ['Gèze', 'Saint-Charles', 'Sainte-Marguerite'] },
    ]
  },
  rennes: {
    lines: [
      { name: 'a', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'C2', stations: ['Saint-Jacques', 'Gares', 'Cesson'] },
    ]
  }
};

async function generateMockEntries() {
  try {
    // Get all lines for each city
    for (const [cityKey, data] of Object.entries(mockData)) {
      // Convert city name to match database format (e.g., "paris" -> "Paris")
      const city = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
      logger.info(`Processing city: ${city}`);

      const lines = await prisma.line.findMany({
        where: { city },
        include: { entries: true }
      });
      logger.info(`Found ${lines.length} lines for ${city}`);

      // For each line, create mock entries
      for (const line of lines) {
        logger.info(`Processing line: ${line.name} in ${city}`);
        const lineData = data.lines.find((l: any) => l.name === line.name);
        if (!lineData) {
          logger.info(`No mock data found for line ${line.name} in ${city}`);
          // If no mock data found, use the stations from the database
          const stations = line.stations || [];
          logger.info(`Using ${stations.length} stations from database for line ${line.name}`);

          // Create 2-5 mock entries per station
          for (const station of stations) {
            const numEntries = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5

            for (let i = 0; i < numEntries; i++) {
              const edits = Math.floor(Math.random() * 5); // Random number between 0 and 4
              const comment = Math.random() > 0.5 ? `Mock entry ${i + 1} for ${station}` : null;

              try {
                await prisma.entry.create({
                  data: {
                    city,
                    lineName: line.name,
                    station,
                    comment,
                    edits,
                    lineId: line.id
                  }
                });
              } catch (error) {
                logger.error(`Error creating entry for ${station} on line ${line.name}:`, error);
              }
            }
          }
          continue;
        }

        const stations = Array.isArray(lineData.stations) ? lineData.stations : [lineData.stations];
        logger.info(`Creating entries for ${stations.length} stations in line ${line.name}`);

        // Create 2-5 mock entries per station
        for (const station of stations) {
          const numEntries = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5

          for (let i = 0; i < numEntries; i++) {
            const edits = Math.floor(Math.random() * 5); // Random number between 0 and 4
            const comment = Math.random() > 0.5 ? `Mock entry ${i + 1} for ${station}` : null;

            try {
              await prisma.entry.create({
                data: {
                  city,
                  lineName: line.name,
                  station,
                  comment,
                  edits,
                  lineId: line.id
                }
              });
            } catch (error) {
              logger.error(`Error creating entry for ${station} on line ${line.name}:`, error);
            }
          }
        }
      }
    }

    const totalEntries = await prisma.entry.count();
    logger.info(`Successfully generated ${totalEntries} mock entries`);

    // Log some sample entries to verify
    const sampleEntries = await prisma.entry.findMany({
      take: 5,
      include: {
        line: true
      }
    });
    logger.info('Sample entries:', sampleEntries);
  } catch (error) {
    logger.error('Error generating mock entries:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateMockEntries()
  .then(() => {
    logger.info('Mock entries generation completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Mock entries generation failed:', error);
    process.exit(1);
  });
