import { prisma } from '../lib/prisma';
import { logger } from '../lib/logger';

export async function cleanup() {
  try {
    logger.info('Starting cleanup process');

    // Calculate the timestamp for 2 hours ago
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    logger.debug(`Deleting entries older than ${twoHoursAgo.toISOString()}`);

    // Delete entries that were edited more than 2 hours ago
    const deletedEntries = await prisma.entry.deleteMany({
      where: {
        updatedAt: {
          lt: twoHoursAgo
        }
      }
    });

    logger.info(`Successfully deleted ${deletedEntries.count} old entries`);
  } catch (error) {
    logger.error('Error during cleanup process', error);
  } finally {
    await prisma.$disconnect();
    logger.info('Cleanup process completed');
  }
}

// Only run cleanup if this file is run directly
if (require.main === module) {
  cleanup();
}
