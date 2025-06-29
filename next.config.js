/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;