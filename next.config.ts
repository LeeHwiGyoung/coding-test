import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dev-patho.s3.ap-northeast-2.amazonaws.com',
          port: '', // 포트가 없으면 빈 문자열
          pathname: '/micro/**', // 또는 '/micro/*' 특정 폴더 아래 모두 허용
        },
      ]
    }
};

export default nextConfig;
