/** @type {import("next").NextConfig} */
module.exports = {
  basePath: '/research',
  transpilePackages: ['core', 'platform-js'],
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
};
