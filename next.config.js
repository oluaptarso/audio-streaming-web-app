/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deactivate strict mode to resolve an incompatibility with react-beautiful-dnd
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone'
};

module.exports = nextConfig;
