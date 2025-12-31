import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon.icepanel.io",
        pathname: "/Technology/**",
      },
    ],
  },
};

export default nextConfig;
