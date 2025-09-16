/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'export' 以支持动态功能
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

