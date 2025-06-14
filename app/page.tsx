import { defaultLocale } from '@/lib/i18n/config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  const locale = acceptLanguage?.split(',')[0].split('-')[0] || defaultLocale;

  redirect(`/${locale}`);
}
