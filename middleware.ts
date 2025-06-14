import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, ValidLocale } from './lib/i18n/config';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value as ValidLocale | undefined;

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: storedLocale && locales.includes(storedLocale) ? storedLocale : defaultLocale,
    localePrefix: 'always'
  });

  return handleI18nRouting(request);
}

// Match all pathnames except for
// - api routes
// - static files
// - _next internals
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
