import { defaultLocale } from '@/lib/i18n/config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootLayout() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');
  const locale = acceptLanguage?.split(',')[0].split('-')[0] || defaultLocale;

  redirect(`/${locale}`);
}
