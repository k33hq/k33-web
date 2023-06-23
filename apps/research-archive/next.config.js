const path = require('path');

/** @type {import("next").NextConfig} */
module.exports = {
  swcMinify: true,
  basePath: '/research/archive',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  transpilePackages: ['core', 'platform-js', 'antd'],
  reactStrictMode: true,
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
  staticPageGenerationTimeout: 300,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
