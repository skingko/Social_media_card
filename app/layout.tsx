import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI社交媒体名片生成器 - 专业名片设计工具',
  description: '免费的社交媒体名片生成器，支持20+多语言、多种主题风格、拖拽排序、实时预览，一键生成高质量社交媒体名片',
  keywords: '社交媒体名片,名片生成器,社交名片,名片设计,AI名片,在线名片制作,多语言名片生成器',
  authors: [{ name: 'skingko' }],
  creator: 'skingko',
  publisher: 'skingko',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://social-card.skingko.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-CN',
      'zh-TW': '/zh-TW',
      'en': '/en',
      'ja': '/ja',
      'ko': '/ko',
      'es': '/es',
      'fr': '/fr',
      'de': '/de',
      'it': '/it',
      'pt': '/pt',
      'ru': '/ru',
      'ar': '/ar',
      'hi': '/hi',
      'th': '/th',
      'vi': '/vi',
      'id': '/id',
      'ms': '/ms',
      'tr': '/tr',
      'pl': '/pl',
      'nl': '/nl',
      'sv': '/sv',
      'da': '/da',
      'no': '/no',
      'fi': '/fi',
    },
  },
  openGraph: {
    title: 'AI社交媒体名片生成器 - 专业名片设计工具',
    description: '免费的社交媒体名片生成器，支持20+多语言、多种主题风格、拖拽排序、实时预览，一键生成高质量社交媒体名片',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://social-card.skingko.com',
    siteName: 'AI社交媒体名片生成器',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI社交媒体名片生成器',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI社交媒体名片生成器 - 专业名片设计工具',
    description: '免费的社交媒体名片生成器，支持20+多语言、多种主题风格、拖拽排序、实时预览，一键生成高质量社交媒体名片',
    creator: '@skingko',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

