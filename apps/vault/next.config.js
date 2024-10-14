/** @type {import('next').NextConfig} */
// comment basePath, output and distDir for local dev run
module.exports = {
  basePath: '/apps/vault',
  output: 'export',
  distDir: 'out/apps/vault',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transpilePackages: ['core', 'platform-js'],
  images: {
    unoptimized: true,
  },
};
