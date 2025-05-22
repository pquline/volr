import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config();

const prisma = new PrismaClient();

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

    console.log(`[${new Date().toISOString()}] Cleaned up ${result.count} low accuracy disruptions`);
    return { success: true, count: result.count };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error cleaning up low accuracy disruptions:`, error);
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

    console.log(`[${new Date().toISOString()}] Cleaned up ${result.count} old disruptions`);
    return { success: true, count: result.count };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error cleaning up old disruptions:`, error);
    return { success: false, error: 'Failed to clean up old disruptions' };
  }
}

async function main() {
  try {
    // Run both cleanup functions
    const [lowAccuracyResult, oldResult] = await Promise.all([
      cleanupLowAccuracyDisruptions(),
      cleanupOldDisruptions()
    ]);

    if (!lowAccuracyResult.success || !oldResult.success) {
      console.error('Some cleanup operations failed');
      process.exit(1);
    }

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main();
