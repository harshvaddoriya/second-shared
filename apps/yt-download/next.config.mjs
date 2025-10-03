import NextFederationPlugin from '@module-federation/nextjs-mf';
import pwa from 'next-pwa';

const withPWA = pwa.default || pwa;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
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
        name: 'ytDownload',

        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          //shared: `shared@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
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

  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
        ],
      },
      {
        source: '/sitemap-:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
        ],
      }, {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
    ];
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
})(nextConfig);

