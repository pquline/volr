export const defaultLocale = 'en';
export const locales = ['en', 'fr'] as const;
export type ValidLocale = (typeof locales)[number];

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  fr: 'Français',
};

export const localeFlags: Record<ValidLocale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
};
