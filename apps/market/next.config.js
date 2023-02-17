/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: '/markets',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
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

module.exports = nextConfig;
