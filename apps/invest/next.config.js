const withBuilderDevTools = require('@builder.io/dev-tools/next')();

/** @type {import("next").NextConfig} */
const nextConfig = withBuilderDevTools({
  basePath: '/apps/invest',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: 'asset/source',
    });
    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transpilePackages: ['core', 'platform-js'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
});

module.exports = nextConfig;
