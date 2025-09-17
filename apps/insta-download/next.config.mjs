import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net", // match ALL fbcdn.net subdomains
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com", // also covers instagram cdn
      },
    ],
  },
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'instaDownload',

        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          // shared: `shared@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
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
  output: 'standalone',
  staticPageGenerationTimeout: 300,
};

export default nextConfig;

