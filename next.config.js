/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure proper asset handling for static export
  distDir: 'out',
}

module.exports = nextConfig

