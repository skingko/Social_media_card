import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sm-card.com'
  
  // 支持的语言代码
  const languages = [
    'zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'it', 'pt', 
    'ru', 'ar', 'hi', 'th', 'vi', 'id', 'ms', 'tr', 'pl', 'nl', 'sv', 
    'da', 'no', 'fi'
  ]
  
  // 基础页面
  const basePages = [
    '',
    '/about',
    '/faq', 
    '/guide',
    '/privacy',
    '/terms',
    '/contact'
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // 为每个页面创建URL条目
  basePages.forEach(page => {
    // 默认页面（中文）
    sitemap.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8
    })
    
    // 为每种语言创建对应的URL
    languages.forEach(lang => {
      if (lang !== 'zh-CN') { // 避免重复添加默认语言
        sitemap.push({
          url: `${baseUrl}${page}?lang=${lang}`,
          lastModified: new Date(),
          changeFrequency: page === '' ? 'daily' : 'weekly',
          priority: page === '' ? 0.9 : 0.7
        })
      }
    })
  })
  
  return sitemap
}
