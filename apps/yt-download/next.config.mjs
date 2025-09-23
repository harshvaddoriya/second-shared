import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // optional, for other thumbnails
      },
    ],
  },
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'ytDownload',

        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shared: `shared@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
          //shared: `shared@https://second-shared-shared.vercel.app/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
  output: 'standalone',
  staticPageGenerationTimeout: 300,
};

export default nextConfig;

