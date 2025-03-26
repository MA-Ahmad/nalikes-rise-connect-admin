import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'risechain-uploads.s3.us-east-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
