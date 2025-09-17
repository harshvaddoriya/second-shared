import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "shared",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./common": "./src/common/index.js",
            "./layout": "./src/layout/index.js",
            "./components": "./src/components/index.js",
            "./other": "./src/other/index.js",
            "./icons": "./src/icons/index.js",
            "./hooks": "./src/hooks/index.js",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: false
            },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
              eager: false
            },
            next: {
              singleton: true,
              requiredVersion: false,
              eager: false
            },
          },
        })
      );
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: false,
          vendors: false,
        },
      },
    };

    return config;
  },
  sassOptions: {
    additionalData: `@use "../../styles/variable" as *;`,
  },
  output: "standalone",

  experimental: {
    esmExternals: false,
  },

  transpilePackages: ["@module-federation/nextjs-mf"],

};

export default nextConfig;
