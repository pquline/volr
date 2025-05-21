import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT = 100; // requests
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

// In-memory store for rate limiting
const ipRequests = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // Get client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'anonymous';
  const now = Date.now();

  // Rate limiting
  const requestData = ipRequests.get(ip);
  if (requestData) {
    if (now > requestData.resetTime) {
      // Reset if window has passed
      ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else if (requestData.count >= RATE_LIMIT) {
      // Rate limit exceeded
      return new NextResponse('Too Many Requests', { status: 429 });
    } else {
      // Increment request count
      requestData.count++;
    }
  } else {
    // First request from this IP
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  // Security headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
