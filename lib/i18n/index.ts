// 国际化主配置文件
import { Translation, LanguageCode, supportedLanguages } from './types'
import { zhCN } from './locales/zh-CN'
import { en } from './locales/en'
import { ja } from './locales/ja'
import { ko } from './locales/ko'
import { es } from './locales/es'
import { fr } from './locales/fr'
import { de } from './locales/de'
import { it } from './locales/it'
import { pt } from './locales/pt'
import { ru } from './locales/ru'
import { ar } from './locales/ar'
import { hi } from './locales/hi'
import { th } from './locales/th'
import { vi } from './locales/vi'

// 翻译文本映射
const translations: Record<LanguageCode, Translation> = {
  'zh-CN': zhCN,
  'zh-TW': zhCN, // 暂时使用简体中文，后续可以添加繁体中文
  'en': en,
  'ja': ja,
  'ko': ko,
  'es': es,
  'fr': fr,
  'de': de,
  'it': it,
  'pt': pt,
  'ru': ru,
  'ar': ar,
  'hi': hi,
  'th': th,
  'vi': vi,
}

// 根据浏览器语言检测默认语言
export function detectBrowserLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'zh-CN'
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'zh-CN'
  
  // 检查是否有完全匹配的语言代码
  for (const lang of supportedLanguages) {
    if (browserLang.startsWith(lang.code)) {
      return lang.code
    }
  }
  
  // 如果没有找到匹配的，返回默认语言
  return 'zh-CN'
}

// 获取翻译文本的 Hook
export function useTranslation(languageCode: LanguageCode = 'zh-CN'): Translation {
  return translations[languageCode] || translations['zh-CN']
}

// 保存语言设置到 localStorage
export function saveLanguagePreference(languageCode: LanguageCode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', languageCode)
  }
}

// 从 localStorage 读取语言设置
export function loadLanguagePreference(): LanguageCode {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-language') as LanguageCode
    if (saved && supportedLanguages.some(lang => lang.code === saved)) {
      return saved
    }
  }
  return detectBrowserLanguage()
}

// 导出类型和常量
export { supportedLanguages } from './types'
export type { LanguageCode, Translation } from './types'
