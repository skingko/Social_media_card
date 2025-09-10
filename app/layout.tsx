import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social_media_card_社交媒体名片生成',
  description: '社交媒体名片生成器 - 专业的名片设计工具，支持多种主题风格、拖拽排序、实时预览，一键生成高质量社交媒体名片',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

