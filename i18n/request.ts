import { defaultLocale, locales, ValidLocale } from '@/lib/i18n/config';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locales.includes(locale as ValidLocale) ? locale : defaultLocale) as string;

  try {
    return {
      messages: (await import(`../messages/${validLocale}.json`)).default,
      locale: validLocale
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validLocale}`, error);
    return {
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
      locale: defaultLocale
    };
  }
});
