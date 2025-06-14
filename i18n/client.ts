import { locales } from '@/lib/i18n/config';
import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });
