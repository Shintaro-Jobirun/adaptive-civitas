import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ESLint の設定を追記
  eslint: {
    ignoreDuringBuilds: true, // ビルド時の ESLint チェックを無効化
  },
};

export default nextConfig;
