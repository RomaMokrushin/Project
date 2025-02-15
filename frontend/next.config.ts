import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "roma-project.vercel.app",
        "roma-project-2li8nun65-eugenemokrushins-projects.vercel.app",
      ],
    },
  },
};

export default nextConfig;
