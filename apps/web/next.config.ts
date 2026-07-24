import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farmgym-products.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
}

export default nextConfig


