/** @type {import("next").NextConfig} */
module.exports = {
  swcMinify: true,
  basePath: '/research',
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
};
