// 国际化类型定义
export interface Translation {
  title: string
  subtitle: string
  description: string
  nav: {
    editContent: string
    finishEdit: string
    generateImage: string
    generating: string
    horizontal: string
    vertical: string
    editMode: string
  }
  themes: {
    blue: string
    green: string
    purple: string
    orange: string
    red: string
    yellow: string
    black: string
  }
  editor: {
    editContent: string
    title: string
    subtitle: string
    description: string
    features: string
    addFeature: string
    qrCode: string
    dragUpload: string
    uploadSupport: string
    uploading: string
    qrUploaded: string
    clickRemove: string
  }
  poster: {
    clickToLearn: string
  }
  footer: {
    developer: string
    github: string
    wechat: string
    followUs: string
    author: string
    addAuthorWechat: string
    wechatPublic: string
    scanToFollow: string
    scanToAdd: string
    clickToEnlarge: string
    hoverToEnlarge: string
    websiteInfo: string
    domain: string
    websiteDescription: string
  }
  ui: {
    selectTheme: string
    layoutMode: string
    previewEffect: string
    collapsePreview: string
    expandPreview: string
    completeEditFirst: string
    share: string
    shareToSocialMedia: string
    copied: string
    copyLink: string
    email: string
    cardNotFound: string
    generateImageFailed: string
    selectValidImageFile: string
  }
  defaultContent: {
    title: string
    subtitle: string
    description: string
    feature1: string
    feature2: string
    feature3: string
    feature4: string
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
}

// 支持的语言列表
export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
] as const

export type LanguageCode = typeof supportedLanguages[number]['code']
