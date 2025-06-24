import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드(배포) 시 ESLint 오류 무시
  },
};

export default nextConfig;
