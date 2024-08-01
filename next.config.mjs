import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', ''],
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('.');
    return config;
  },
};

export default nextConfig;
