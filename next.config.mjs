/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '192.199.120.91',
    'vineyard-flaky-reliant.ngrok-free.dev'
  ]
}


export default nextConfig


