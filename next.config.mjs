import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '', 'azonix.liara.run'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('.');
    return config;
  },
};

export default nextConfig;
