import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError } from '@/lib/error-handling';
import { clearCache } from '@/lib/data-fetching';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    logger.info('Starting API cleanup process');

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

    // Clear all disruption caches since we've deleted entries
    clearCache('disruptions');
    logger.info(`Successfully deleted ${deletedEntries.count} old entries`);

    return NextResponse.json({
      message: `Successfully deleted ${deletedEntries.count} old entries`,
      deletedCount: deletedEntries.count
    });
  } catch (error) {
    logger.error('Error during API cleanup process', error);
    const { error: errorMessage, statusCode } = handleError(error);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
