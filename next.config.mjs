import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude user-access routes from static generation
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default withNextIntl(nextConfig);
