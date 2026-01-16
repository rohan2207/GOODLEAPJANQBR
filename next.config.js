/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bfldr.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
