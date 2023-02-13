/** @type {import("next").NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/register',
        basePath: false,
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth',
        basePath: false,
        permanent: true,
      },
    ];
  },
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
