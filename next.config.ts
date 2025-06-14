import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const config = withNextIntl(
  withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })({
    images: {
      domains: ['images.unsplash.com'],
    },
  })
);

export default config;
