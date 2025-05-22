import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

async function cleanupLowAccuracyDisruptions() {
  try {
    // Delete disruptions with accuracy <= -10
    const result = await prisma.entry.deleteMany({
      where: {
        votes: {
          lte: -10
        }
      }
    });

    logger.info(`Cleaned up ${result.count} low accuracy disruptions`);
    return { success: true, count: result.count };
  } catch (error) {
    logger.error('Error cleaning up low accuracy disruptions:', error);
    return { success: false, error: 'Failed to clean up low accuracy disruptions' };
  }
}

async function cleanupOldDisruptions() {
  try {
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

    // Delete disruptions older than 4 hours
    const result = await prisma.entry.deleteMany({
      where: {
        updatedAt: {
          lt: fourHoursAgo
        }
      }
    });

    logger.info(`Cleaned up ${result.count} old disruptions`);
    return { success: true, count: result.count };
  } catch (error) {
    logger.error('Error cleaning up old disruptions:', error);
    return { success: false, error: 'Failed to clean up old disruptions' };
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  const type = process.argv[2];
  const cleanup = type === 'old' ? cleanupOldDisruptions : cleanupLowAccuracyDisruptions;

  cleanup()
    .then(result => {
      if (result.success) {
        console.log(`Successfully cleaned up ${result.count} disruptions`);
      } else {
        console.error('Failed to clean up disruptions:', result.error);
      }
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

export { cleanupLowAccuracyDisruptions, cleanupOldDisruptions };
