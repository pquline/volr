import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never'
});

// Match all pathnames except for
// - api routes
// - static files
// - _next internals
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
