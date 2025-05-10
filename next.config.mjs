import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'], // Add AVIF support
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    styledComponents: true,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production'
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Add Webpack config for bundle size optimization
  webpack: (config, { dev, isServer }) => {
    // Only run in production client-side build
    if (!dev && !isServer) {
      // Enable tree shaking for MUI and other large packages
      config.resolve.alias = {
        ...config.resolve.alias,
        // Add any specific aliases for tree shaking
      };
    }

    return config;
  },
  // Enable content security policy in production
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Configure compression
  compress: true,
  // Generate static HTML files when possible
  output: 'standalone',
  poweredByHeader: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    // Add this when you're ready to support multiple languages:
    // locales: ['en', 'fr', 'es'],
    // Domains for localization (optional)
    domains: [
      {
        domain: 'pratyumjagan.in',
        defaultLocale: 'en',
      },
      // Add other domains for other languages when needed
    ],
  },
}
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)