import { NextResponse } from 'next/server';
import { cleanupLowAccuracyDisruptions, cleanupOldDisruptions } from '@/scripts/cleanup-disruptions';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Get the type of cleanup from the URL
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    let result;
    if (type === 'old') {
      result = await cleanupOldDisruptions();
    } else {
      result = await cleanupLowAccuracyDisruptions();
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Cleaned up ${result.count} ${type === 'old' ? 'old' : 'low accuracy'} disruptions`
      });
    } else {
      logger.error('Cleanup failed:', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('Unexpected error in cleanup cron:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
