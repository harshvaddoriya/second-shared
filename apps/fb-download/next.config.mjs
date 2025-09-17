import NextFederationPlugin from '@module-federation/nextjs-mf';
import pwa from 'next-pwa';

const withPWA = pwa.default || pwa;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });

    config.plugins.push(
      new NextFederationPlugin({
        name: 'fbdownload',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shared: `shared@https://second-shared-shared.vercel.app/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );

    return config;
  },

  experimental: {
    esmExternals: false,
  },

  output: 'standalone',
  staticPageGenerationTimeout: 300,
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/second-shared-fb-download\.vercel\.app\/api\/facebook/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-facebook-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/second-shared-fb-download\.vercel\.app\/_next\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
})(nextConfig);
