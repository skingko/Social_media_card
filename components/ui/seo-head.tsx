'use client'

import Head from 'next/head'
import { useEffect } from 'react'
import { LanguageCode } from '../../lib/i18n/index'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  language?: LanguageCode
}

export function SEOHead({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.png',
  canonicalUrl,
  language = 'zh-CN'
}: SEOHeadProps) {
  useEffect(() => {
    // 动态更新页面标题
    document.title = title
    
    // 动态更新meta标签
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // 更新基础meta标签
    updateMetaTag('description', description)
    if (keywords) updateMetaTag('keywords', keywords)
    
    // 更新Open Graph标签
    updatePropertyTag('og:title', ogTitle || title)
    updatePropertyTag('og:description', ogDescription || description)
    updatePropertyTag('og:image', ogImage)
    updatePropertyTag('og:type', 'website')
    
    // 更新Twitter标签
    updateMetaTag('twitter:title', ogTitle || title)
    updateMetaTag('twitter:description', ogDescription || description)
    updateMetaTag('twitter:image', ogImage)
    updateMetaTag('twitter:card', 'summary_large_image')
    
    // 更新canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonicalUrl
    }
    
    // 更新html lang属性
    document.documentElement.lang = language
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, language])

  return null
}
