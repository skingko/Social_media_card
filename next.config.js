/** @type {import('next').NextConfig} */
const nextConfig = {
  // 支持动态功能，使用 .next 目录部署
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 添加实验性功能支持
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig

