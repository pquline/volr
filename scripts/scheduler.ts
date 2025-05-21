import { cleanup } from './cleanup';
import { logger } from '../lib/logger';

// Run cleanup every hour
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

logger.info('Starting cleanup scheduler...');

// Run cleanup immediately on startup
cleanup();

// Schedule regular cleanup
setInterval(() => {
  logger.info('Running scheduled cleanup');
  cleanup();
}, CLEANUP_INTERVAL);

// Handle process termination
process.on('SIGTERM', () => {
  logger.info('Scheduler shutting down (SIGTERM)...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Scheduler shutting down (SIGINT)...');
  process.exit(0);
});
