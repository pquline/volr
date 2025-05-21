import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per window

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, ''); // Remove data: protocol
}

// Rate limiting middleware
export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    logger.warn(`Rate limit exceeded for IP: ${ip}`);
    return false;
  }

  entry.count++;
  return true;
}

// API route protection middleware
export function protectApiRoute(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      // Get client IP
      const ip = req.headers.get('x-forwarded-for') || 'unknown';

      // Check rate limit
      if (!rateLimit(ip)) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }

      // Sanitize query parameters
      const url = new URL(req.url);
      for (const [key, value] of url.searchParams.entries()) {
        url.searchParams.set(key, sanitizeInput(value));
      }

      // Sanitize request body for POST requests
      if (req.method === 'POST') {
        const body = await req.json();
        const sanitizedBody = Object.entries(body).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: typeof value === 'string' ? sanitizeInput(value) : value,
          }),
          {}
        );
        req = new NextRequest(url, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(sanitizedBody),
        });
      }

      // Call the original handler
      return await handler(req);
    } catch (error) {
      logger.error('API route protection error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);
