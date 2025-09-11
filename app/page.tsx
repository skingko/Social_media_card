'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Download, Bot, Edit3, Palette, CheckCircle, Star, Users, Zap, GripVertical, Upload, X, Eye, EyeOff, RotateCw } from 'lucide-react'
import html2canvas from 'html2canvas'
import { ModernLogo } from '../components/ui/logo'
import { LanguageSwitcher } from '../components/ui/language-switcher'
import { Footer } from '../components/ui/footer'
import { ShareButton } from '../components/ui/share'
import { useToast, ToastContainer } from '../components/ui/toast'
import { SEOHead } from '../components/ui/seo-head'
import { 
  useTranslation, 
  LanguageCode, 
  loadLanguagePreference, 
  saveLanguagePreference,
  detectBrowserLanguage,
  supportedLanguages
} from '../lib/i18n/index'

// 使用阿里云OSS地址作为默认二维码，避免静态资源路径问题
const defaultQRCodePath = 'https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509102242338.png'

// 类型定义
interface ThemeConfig {
  name: string
  primary: string
  secondary: string
  accent: string
  text: string
  button: string
}

interface FeatureItem {
  text: string
  visible: boolean
}

interface ContentType {
  title: string
  subtitle: string
  description: string
  descriptionVisible: boolean
  features: FeatureItem[]
  benefits: string[]
  qrCodeUrl: string
}

type LayoutMode = 'vertical' | 'horizontal'
type ThemeKey = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'black'

// 新增主题类型
interface GridBackgroundProps {
  className?: string
}

// 格子背景组件
const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  return (
    <div 
      className={`absolute inset-0 opacity-30 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(200, 200, 200, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200, 200, 200, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
  )
}

// 动态元数据组件
const DynamicHead: React.FC<{ language: LanguageCode }> = ({ language }) => {
  const t = useTranslation(language)
  
  useEffect(() => {
    // 动态更新页面标题
    document.title = t.meta.title
    
    // 更新描述
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', t.meta.description)
    }
    
    // 更新关键词
    const keywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      keywords.setAttribute('content', t.meta.keywords)
    }
    
    // 更新语言属性
    document.documentElement.lang = language === 'zh-CN' ? 'zh-CN' : 
                                   language === 'zh-TW' ? 'zh-TW' : 
                                   language.split('-')[0]
  }, [language, t])
  
  return null
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('blue')
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const { toasts, showError, showSuccess, showWarning, showInfo, closeToast } = useToast()
  // 使用 ref 来避免在每次渲染时重新创建默认内容
  const getDefaultContent = (): ContentType => {
    const t = useTranslation(currentLanguage)
    return {
      title: t.defaultContent.title,
      subtitle: t.defaultContent.subtitle,
      description: t.defaultContent.description,
      descriptionVisible: true,
      features: [
        { text: t.defaultContent.feature1, visible: true },
        { text: t.defaultContent.feature2, visible: true },
        { text: t.defaultContent.feature3, visible: false },
        { text: t.defaultContent.feature4, visible: false }
      ],
      benefits: [
        'AI工具应用能力',
        '智能体构建技能',
        '持续更新的知识库',
        '真诚有观点的老友交流'
      ],
      qrCodeUrl: defaultQRCodePath
    }
  }

  const [content, setContent] = useState<ContentType>(getDefaultContent())
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical')

  // Responsive scale for poster preview (preserve aspect ratio)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [previewScale, setPreviewScale] = useState(1)
  const baseWidth = layoutMode === 'vertical' ? 384 : 672

  // 初始化语言设置
  useEffect(() => {
    const preferredLanguage = loadLanguagePreference()
    setCurrentLanguage(preferredLanguage)
  }, [])

  // 获取当前语言的翻译
  const t = useTranslation(currentLanguage)

  // 样式主题配置（使用翻译后的名称）
  const themes: Record<ThemeKey, ThemeConfig> = {
    blue: {
      name: t.themes.blue,
      primary: 'bg-[#3b82f6]',
      secondary: 'bg-blue-50',
      accent: 'bg-[#3b82f6]',
      text: 'text-[#3b82f6]',
      button: 'bg-[#3b82f6] hover:bg-[#2563eb]'
    },
    green: {
      name: t.themes.green,
      primary: 'bg-[#28ca71]',
      secondary: 'bg-green-50',
      accent: 'bg-[#28ca71]',
      text: 'text-[#28ca71]',
      button: 'bg-[#28ca71] hover:bg-[#20b864]'
    },
    purple: {
      name: t.themes.purple,
      primary: 'bg-[#d9b8fa]',
      secondary: 'bg-purple-50',
      accent: 'bg-[#d9b8fa]',
      text: 'text-[#d9b8fa]',
      button: 'bg-[#d9b8fa] hover:bg-[#d1a8f8]'
    },
    orange: {
      name: t.themes.orange,
      primary: 'bg-[#ff8c00]',
      secondary: 'bg-orange-50',
      accent: 'bg-[#ff8c00]',
      text: 'text-[#ff8c00]',
      button: 'bg-[#ff8c00] hover:bg-[#e67e00]'
    },
    red: {
      name: t.themes.red,
      primary: 'bg-[#ff3502]',
      secondary: 'bg-red-50',
      accent: 'bg-[#ff3502]',
      text: 'text-[#ff3502]',
      button: 'bg-[#ff3502] hover:bg-[#e52e02]'
    },
    yellow: {
      name: t.themes.yellow,
      primary: 'bg-[#dda52d]',
      secondary: 'bg-yellow-50',
      accent: 'bg-[#dda52d]',
      text: 'text-[#dda52d]',
      button: 'bg-[#dda52d] hover:bg-[#c89426]'
    },
    black: {
      name: t.themes.black,
      primary: 'bg-[rgb(33,33,34)]',
      secondary: 'bg-gray-50',
      accent: 'bg-[rgb(33,33,34)]',
      text: 'text-[rgb(33,33,34)]',
      button: 'bg-[rgb(33,33,34)] hover:bg-[rgb(23,23,24)]'
    }
  }

  React.useEffect(() => {
    const updateScale = () => {
      const el = containerRef.current
      const card = cardRef.current
      if (!el || !card) return
      const availableWidth = el.clientWidth
      const scale = Math.min(availableWidth / baseWidth, 1)
      setPreviewScale(scale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [baseWidth, isEditing])

  // 语言切换处理
  const handleLanguageChange = (language: LanguageCode) => {
    setCurrentLanguage(language)
    saveLanguagePreference(language)
  }

  // 当语言切换时，更新默认内容
  useEffect(() => {
    const newDefaultContent = getDefaultContent()
    setContent(newDefaultContent)
  }, [currentLanguage])

  const generateImage = async () => {
    // 如果在编辑模式且预览未展开，提示用户先完成编辑
    if (isEditing && !isPreviewExpanded) {
      showWarning(t.ui.completeEditFirst)
      return
    }
    
    setIsGenerating(true)
    try {
      // 查找卡片元素（不包含外层容器）
      const cardElement = document.querySelector('.poster-card') as HTMLElement
      if (cardElement) {
        // 为远程二维码添加crossOrigin属性以支持CORS（本地上传的二维码不需要）
        const qrImages = cardElement.querySelectorAll('img[alt="二维码"]') as NodeListOf<HTMLImageElement>
        const originalCrossOrigins: (string | null)[] = []
        const isRemoteQR = content.qrCodeUrl.startsWith('http') && !content.qrCodeUrl.startsWith('data:')
        
        if (qrImages.length > 0 && isRemoteQR) {
          qrImages.forEach((img, index) => {
            originalCrossOrigins[index] = img.crossOrigin
            img.crossOrigin = 'anonymous'
          })
          // 等待图片重新加载
          await new Promise(resolve => setTimeout(resolve, 200))
        }

        // 保存原始class和样式
        const originalClassName = cardElement.className
        const originalStyles = {
          transform: cardElement.style.transform,
          transformOrigin: cardElement.style.transformOrigin,
          width: cardElement.style.width,
          maxWidth: cardElement.style.maxWidth
        }
        
        // 重置为固定尺寸，移除所有响应式类和transform
        cardElement.className = 'poster-card shadow-xl overflow-hidden relative mx-auto'
        cardElement.style.transform = 'none'
        cardElement.style.transformOrigin = 'initial'
        cardElement.style.width = layoutMode === 'vertical' ? '384px' : '672px'
        cardElement.style.maxWidth = layoutMode === 'vertical' ? '384px' : '672px'
        cardElement.style.minWidth = layoutMode === 'vertical' ? '384px' : '672px'
        cardElement.style.height = 'auto'
        
        // 临时修复文字对齐问题，覆盖Button组件的flexbox样式
        const buttons = cardElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        const titles = cardElement.querySelectorAll('h1') as NodeListOf<HTMLHeadingElement>
        const originalButtonStyles: CSSStyleDeclaration[] = []
        const originalTitleStyles: CSSStyleDeclaration[] = []
        
        // 保存并修改按钮样式
        buttons.forEach((button, index) => {
          originalButtonStyles[index] = { ...button.style } as CSSStyleDeclaration
          button.style.display = 'block'
          button.style.textAlign = 'center'
          button.style.alignItems = 'normal'
          button.style.justifyContent = 'normal'
          button.style.lineHeight = '1'
        })
        
        // 保存并修改标题样式
        titles.forEach((title, index) => {
          originalTitleStyles[index] = { ...title.style } as CSSStyleDeclaration
          title.style.textAlign = 'center'
          title.style.lineHeight = '1.2'
          title.style.margin = '0'
          title.style.padding = '0'
        })
        
        // 等待字体加载，避免基线偏移
        if ((document as any).fonts?.ready) {
          try { await (document as any).fonts.ready } catch {}
        }
        // 等待样式应用
        await new Promise(resolve => setTimeout(resolve, 150))
        
        // 使用元素实际尺寸，避免因transform或滚动导致为0
        const rect = cardElement.getBoundingClientRect()
        // 在捕获范围内再保险：确保图片为 inline
        cardElement.querySelectorAll('img').forEach((el) => {
          try { (el as HTMLImageElement).style.display = 'inline-block' } catch {}
        })
        const canvas = await html2canvas(cardElement, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          logging: false,
          width: layoutMode === 'vertical' ? 384 : 672,
          allowTaint: true,
          foreignObjectRendering: false,
          onclone: (doc) => {
            try {
              // 确保克隆文档中的二维码具备CORS属性
              doc.querySelectorAll('img[alt="二维码"]').forEach((el) => {
                try { 
                  const img = el as HTMLImageElement
                  img.crossOrigin = 'anonymous'
                  img.style.display = 'block'
                  img.style.width = 'auto'
                  img.style.height = 'auto'
                } catch {}
              })
              
              // 修复按钮和标题的样式
              doc.querySelectorAll('.capture-cta').forEach((el) => {
                const node = el as HTMLElement
                node.style.display = 'flex'
                node.style.alignItems = 'center'
                node.style.justifyContent = 'center'
                node.style.textAlign = 'center'
                node.style.lineHeight = '1.2'
                node.style.fontWeight = '500'
              })
              
              doc.querySelectorAll('.capture-title').forEach((el) => {
                const node = el as HTMLElement
                node.style.display = 'block'
                node.style.textAlign = 'center'
                node.style.lineHeight = '1.2'
                node.style.fontWeight = 'bold'
                node.style.margin = '0'
                node.style.padding = '0'
              })
              
              // 确保所有文本元素正确对齐
              doc.querySelectorAll('h1, h2, h3, p, div').forEach((el) => {
                const node = el as HTMLElement
                if (node.classList.contains('capture-title') || node.classList.contains('capture-cta')) {
                  return // 已经处理过
                }
                node.style.lineHeight = '1.4'
              })
              
            } catch (error) {
              console.error('Clone processing error:', error)
            }
          }
        })
        
        // 恢复原始class和样式
        cardElement.className = originalClassName
        cardElement.style.transform = originalStyles.transform
        cardElement.style.transformOrigin = originalStyles.transformOrigin
        cardElement.style.width = originalStyles.width
        cardElement.style.maxWidth = originalStyles.maxWidth
        
        // 恢复二维码图片的crossOrigin属性
        if (originalCrossOrigins.length > 0 && qrImages.length > 0) {
          qrImages.forEach((img, index) => {
            if (originalCrossOrigins[index] === null) {
              img.removeAttribute('crossOrigin')
            } else {
              img.crossOrigin = originalCrossOrigins[index]!
            }
          })
        }
        
        // 恢复按钮和标题的原始样式
        buttons.forEach((button, index) => {
          if (originalButtonStyles[index]) {
            Object.assign(button.style, originalButtonStyles[index])
          }
        })
        
        titles.forEach((title, index) => {
          if (originalTitleStyles[index]) {
            Object.assign(title.style, originalTitleStyles[index])
          }
        })
        
        const link = document.createElement('a')
        link.download = `${content.title}-${themes[currentTheme].name}.png`
        link.href = canvas.toDataURL('image/png', 1.0)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        showError(t.ui.cardNotFound || '未找到卡片元素，请稍后重试')
      }
    } catch (error) {
      console.error('生成图片失败:', error)
      showError(t.ui.generateImageFailed || '生成图片失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const updateContent = (field: keyof ContentType, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateArrayContent = (field: 'features' | 'benefits', index: number, value: string) => {
    if (field === 'features') {
      setContent(prev => ({
        ...prev,
        features: prev.features.map((item, i) => 
          i === index ? { ...item, text: value } : item
        )
      }))
    } else {
      setContent(prev => ({
        ...prev,
        [field]: prev[field].map((item, i) => i === index ? value : item)
      }))
    }
  }

  const toggleFeatureVisibility = (index: number) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((item, i) => 
        i === index ? { ...item, visible: !item.visible } : item
      )
    }))
  }

  const toggleDescriptionVisibility = () => {
    setContent(prev => ({
      ...prev,
      descriptionVisible: !prev.descriptionVisible
    }))
  }

  const addArrayItem = (field: 'features' | 'benefits') => {
    if (field === 'features') {
      setContent(prev => ({
        ...prev,
        features: [...prev.features, { text: '新项目', visible: true }]
      }))
    } else {
      setContent(prev => ({
        ...prev,
        [field]: [...prev[field], '新项目']
      }))
    }
  }

  const removeArrayItem = (field: 'features' | 'benefits', index: number) => {
    setContent(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // 拖拽排序相关状态和函数
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const newFeatures = [...content.features]
    const draggedItem = newFeatures[draggedIndex]
    newFeatures.splice(draggedIndex, 1)
    newFeatures.splice(dropIndex, 0, draggedItem)

    setContent(prev => ({ ...prev, features: newFeatures }))
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // 二维码上传相关状态和函数
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadProgress(0)
      const reader = new FileReader()
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100)
        }
      }
      
      reader.onload = (e) => {
        const result = e.target?.result as string
        updateContent('qrCodeUrl', result)
        setUploadProgress(100)
        setTimeout(() => setUploadProgress(0), 1000)
      }
      
      reader.readAsDataURL(file)
    } else {
      showError(t.ui.selectValidImageFile || '请选择有效的图片文件')
    }
  }

  const handleDragOverUpload = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeaveUpload = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDropUpload = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const clearQRCode = () => {
    updateContent('qrCodeUrl', defaultQRCodePath)
  }

  const theme = themes[currentTheme]

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.meta.title,
    "description": t.meta.description,
    "url": "https://www.sm-card.com",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "多主题风格",
      "拖拽排序",
      "实时预览", 
      "多语言支持",
      "高质量输出",
      "完全免费"
    ],
    "author": {
      "@type": "Person",
      "name": "skingko"
    },
    "inLanguage": supportedLanguages.map(lang => lang.code),
    "sameAs": [
      "https://github.com/skingko/Social_media_card"
    ]
  }

  return (
    <>
      <DynamicHead language={currentLanguage} />
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-100">
        {/* 顶部导航栏 */}
        <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
            {/* 移动端和桌面端不同布局 */}
            <div className="flex items-center justify-between">
              {/* Logo区域 - 移动端缩小 */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <ModernLogo 
                  className="w-10 h-10 sm:w-12 sm:h-12" 
                  showDomain={true} 
                  size={40} 
                  language={currentLanguage} 
                />
              </div>
              
              {/* 右侧按钮组 - 优化移动端显示 */}
              <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                {/* 分享按钮 - 移动端简化 */}
                <div className="flex-shrink-0">
                  <ShareButton language={currentLanguage} />
                </div>
                
                {/* GitHub 链接 - 移动端只显示图标 */}
                <a
                  href="https://github.com/skingko/Social_media_card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="hidden sm:inline text-sm">GitHub</span>
                </a>
                
                {/* 语言切换器 */}
                <div className="flex-shrink-0">
                  <LanguageSwitcher 
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 - 新布局：左侧风格选择，右侧功能区 */}
        <div className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* 左侧：风格选择区 */}
              <div className="w-full lg:w-80 space-y-4">
                {/* 主题风格选择 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      {t.ui.selectTheme}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(themes).map(([key, themeConfig]) => (
                        <Button
                          key={key}
                          variant={currentTheme === key ? "default" : "outline"}
                          onClick={() => setCurrentTheme(key as ThemeKey)}
                          className="justify-start"
                          size="sm"
                        >
                          <div className={`w-4 h-4 rounded-full mr-2 ${themeConfig.primary}`}></div>
                          {themeConfig.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 布局模式选择 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <RotateCw className="w-5 h-5" />
                      {t.ui.layoutMode}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant={layoutMode === 'vertical' ? "default" : "outline"}
                      onClick={() => setLayoutMode('vertical')}
                      className="w-full justify-start"
                      size="sm"
                    >
                      📱 {t.nav.vertical}
                    </Button>
                    <Button
                      variant={layoutMode === 'horizontal' ? "default" : "outline"}
                      onClick={() => setLayoutMode('horizontal')}
                      className="w-full justify-start"
                      size="sm"
                    >
                      💻 {t.nav.horizontal}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：功能区和预览 */}
              <div className="flex-1">
                {/* 功能按钮区 */}
                <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "default" : "outline"}
                      className="flex-1 sm:flex-none sm:min-w-[140px]"
                    >
                      <Edit3 className="mr-2 h-4 w-4" />
                      {isEditing ? t.nav.finishEdit : t.nav.editContent}
                    </Button>
                    <Button 
                      onClick={generateImage} 
                      disabled={isGenerating}
                      className={`flex-1 sm:flex-none sm:min-w-[140px] text-white ${theme.button}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isGenerating ? t.nav.generating : t.nav.generateImage}
                    </Button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    {/* 预览面板 - 可折叠 */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{t.ui.previewEffect}</CardTitle>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                            className="flex items-center gap-2"
                          >
                            {isPreviewExpanded ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                {t.ui.collapsePreview}
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                {t.ui.expandPreview}
                              </>
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      {isPreviewExpanded && (
                        <CardContent>
                          <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
                            <div ref={containerRef} className="bg-white flex items-center justify-center p-4 overflow-visible">
                              <div
                                ref={cardRef}
                                className={`poster-card shadow-xl overflow-hidden relative mx-auto`}
                                style={{ width: `${baseWidth}px`, transform: `scale(${previewScale})`, transformOrigin: 'top left' }}
                              >
                                {/* 边框背景层 */}
                                <div className="absolute inset-0 flex">
                                  <div className={`w-1/3 ${theme.primary} relative`}>
                                    <GridBackground />
                                  </div>
                                  <div className="w-2/3 bg-gray-300 relative">
                                    <GridBackground />
                                  </div>
                                </div>
                                
                                {/* 白色内容层 */}
                                <div className="relative bg-white m-2 p-2">
                                  <div className={layoutMode === 'vertical' ? 'flex flex-col' : 'flex flex-row'}>
                                    {/* 内容区域 */}
                                    <div className={`flex flex-col items-center justify-center text-center ${
                                      layoutMode === 'vertical' ? 'flex-1 p-4' : 'flex-1 p-6'
                                    }`}>
                                      {/* 蓝色标题栏 */}
                                      <div className={`${theme.primary} text-white mb-3 w-full ${
                                        layoutMode === 'vertical' ? 'py-2 px-3' : 'py-3 px-4'
                                      }`}>
                                        <h1 className={`font-bold leading-none capture-title ${
                                          layoutMode === 'vertical' ? 'text-lg' : 'text-xl'
                                        }`}>{content.title}</h1>
                                      </div>
                                      
                                      {/* 副标题 */}
                                      <div className="mb-3">
                                        <h2 className={`text-black font-semibold ${
                                          layoutMode === 'vertical' ? 'text-base' : 'text-lg'
                                        }`}>{content.subtitle}</h2>
                                      </div>
                                      
                                      {/* 服务项目列表 */}
                                      <div className="space-y-1 w-full">
                                        {content.descriptionVisible && (
                                          <div className="py-1">
                                            <h3 className={`font-medium text-black ${
                                              layoutMode === 'vertical' ? 'text-sm' : 'text-base'
                                            }`}>{content.description}</h3>
                                          </div>
                                        )}
                                        {/* 每两个特性一行 */}
                                        {Array.from({ length: Math.ceil(content.features.filter(f => f.visible).length / 2) }, (_, rowIndex) => {
                                          const visibleFeatures = content.features.filter(f => f.visible && f.text.trim())
                                          const startIndex = rowIndex * 2
                                          const rowFeatures = visibleFeatures.slice(startIndex, startIndex + 2).map(f => f.text)
                                          return rowFeatures.length > 0 ? (
                                            <div key={rowIndex} className="py-1">
                                              <h3 className={`font-medium text-black ${
                                                layoutMode === 'vertical' ? 'text-sm' : 'text-base'
                                              }`}>{rowFeatures.join(' | ')}</h3>
                                            </div>
                                          ) : null
                                        })}
                                      </div>
                                    </div>
                                    
                                    {/* 二维码和按钮区域 */}
                                    <div className={`bg-gray-50 flex items-center space-y-3 ${
                                      layoutMode === 'vertical' 
                                        ? 'p-3 flex-col' 
                                        : 'p-4 flex-col justify-center w-40'
                                    }`}>
                                      {/* 二维码 */}
                                      <div className={`bg-white border border-gray-400 flex items-center justify-center overflow-hidden ${
                                        layoutMode === 'vertical' ? 'w-20 h-20' : 'w-24 h-24'
                                      }`}>
                                        <img 
                                          src={content.qrCodeUrl}
                                          alt="二维码"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      
                                      {/* 点击了解按钮（使用div避免flex导致的基线偏移） */}
                                      <div
                                        role="button"
                                        className={`w-full text-white font-medium text-center rounded-md capture-cta ${theme.button} ${
                                          layoutMode === 'vertical' ? 'py-2 text-xs' : 'py-2 text-sm'
                                        }`}
                                      >
                                        {t.poster.clickToLearn}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                    
                    {/* 编辑面板 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.editor.editContent}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">{t.editor.title}</label>
                          <input
                            type="text"
                            value={content.title}
                            onChange={(e) => updateContent('title', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">{t.editor.subtitle}</label>
                          <input
                            type="text"
                            value={content.subtitle}
                            onChange={(e) => updateContent('subtitle', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">{t.editor.description}</label>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={toggleDescriptionVisibility}
                              className={`px-2 py-1 text-xs ${
                                content.descriptionVisible 
                                  ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {content.descriptionVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            </Button>
                          </div>
                          <textarea
                            value={content.description}
                            onChange={(e) => updateContent('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded resize-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">{t.editor.features}</label>
                          {content.features.map((feature, index) => (
                            <div 
                              key={index} 
                              className={`mb-2 flex gap-2 items-center p-2 rounded transition-all duration-200 ${
                                draggedIndex === index ? 'opacity-50 scale-95' : ''
                              } ${
                                dragOverIndex === index ? 'bg-blue-50 border-blue-200 border-2 border-dashed' : 'bg-white border border-gray-200'
                              }`}
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, index)}
                              onDragEnd={handleDragEnd}
                            >
                              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing flex-shrink-0" />
                              <input
                                type="text"
                                value={feature.text}
                                onChange={(e) => updateArrayContent('features', index, e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded border-0"
                                placeholder={`功能 ${index + 1}`}
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleFeatureVisibility(index)}
                                className={`px-2 py-1 text-xs flex-shrink-0 ${
                                  feature.visible 
                                    ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {feature.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => removeArrayItem('features', index)}
                                className="px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => addArrayItem('features')}
                            className="mt-2 text-xs w-full"
                          >
                            {t.editor.addFeature}
                          </Button>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">{t.editor.qrCode}</label>
                          <div className="space-y-3">
                            {/* URL 输入 */}
                            <input
                              type="text"
                              value={content.qrCodeUrl}
                              onChange={(e) => updateContent('qrCodeUrl', e.target.value)}
                              placeholder="输入二维码图片的URL地址"
                              className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                            />
                            
                            {/* 拖拽上传区域 */}
                            <div 
                              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 cursor-pointer ${
                                isDragOver 
                                  ? 'border-blue-400 bg-blue-50' 
                                  : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                              }`}
                              onDragOver={handleDragOverUpload}
                              onDragLeave={handleDragLeaveUpload}
                              onDrop={handleDropUpload}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className={`w-8 h-8 mx-auto mb-2 ${
                                isDragOver ? 'text-blue-500' : 'text-gray-400'
                              }`} />
                              <p className={`text-sm ${
                                isDragOver ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                {isDragOver ? '释放以上传图片' : t.editor.dragUpload}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{t.editor.uploadSupport}</p>
                              
                              {/* 上传进度条 */}
                              {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="mt-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                      style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">{t.editor.uploading} {Math.round(uploadProgress)}%</p>
                                </div>
                              )}
                            </div>
                            
                            {/* 隐藏的文件输入 */}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            
                            {/* 图片预览和操作 */}
                            {content.qrCodeUrl && content.qrCodeUrl !== defaultQRCodePath && (
                              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                                <img 
                                  src={content.qrCodeUrl} 
                                  alt="二维码预览" 
                                  className="w-12 h-12 object-cover rounded border"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{t.editor.qrUploaded}</p>
                                  <p className="text-xs text-gray-500">{t.editor.clickRemove}</p>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={clearQRCode}
                                  className="px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* 非编辑模式 - 居中显示 */
                  <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4 min-h-[500px]">
                    <div id="poster-content" ref={containerRef} className="bg-white flex items-center justify-center p-4 overflow-visible">
                      <div
                        ref={cardRef}
                        className={`poster-card shadow-xl overflow-hidden relative mx-auto`}
                        style={{ width: `${baseWidth}px`, transform: `scale(${previewScale})`, transformOrigin: 'top left' }}
                      >
                        {/* 边框背景层 */}
                        <div className="absolute inset-0 flex">
                          <div className={`w-1/3 ${theme.primary} relative`}>
                            <GridBackground />
                          </div>
                          <div className="w-2/3 bg-gray-300 relative">
                            <GridBackground />
                          </div>
                        </div>
                        
                        {/* 白色内容层 */}
                        <div className="relative bg-white m-2 p-2">
                          <div className={layoutMode === 'vertical' ? 'flex flex-col' : 'flex flex-row'}>
                            {/* 内容区域 */}
                            <div className={`flex flex-col items-center justify-center text-center ${
                              layoutMode === 'vertical' ? 'flex-1 p-4' : 'flex-1 p-6'
                            }`}>
                              {/* 蓝色标题栏 */}
                              <div className={`${theme.primary} text-white mb-3 w-full ${
                                layoutMode === 'vertical' ? 'py-2 px-3' : 'py-3 px-4'
                              }`}>
                                <h1 className={`font-bold leading-none capture-title ${
                                  layoutMode === 'vertical' ? 'text-lg' : 'text-xl'
                                }`}>{content.title}</h1>
                              </div>
                              
                              {/* 副标题 */}
                              <div className="mb-3">
                                <h2 className={`text-black font-semibold ${
                                  layoutMode === 'vertical' ? 'text-base' : 'text-lg'
                                }`}>{content.subtitle}</h2>
                              </div>
                              
                              {/* 服务项目列表 */}
                              <div className="space-y-1 w-full">
                                {content.descriptionVisible && (
                                  <div className="py-1">
                                    <h3 className={`font-medium text-black ${
                                      layoutMode === 'vertical' ? 'text-sm' : 'text-base'
                                    }`}>{content.description}</h3>
                                  </div>
                                )}
                                {/* 每两个特性一行 */}
                                {Array.from({ length: Math.ceil(content.features.filter(f => f.visible).length / 2) }, (_, rowIndex) => {
                                  const visibleFeatures = content.features.filter(f => f.visible && f.text.trim())
                                  const startIndex = rowIndex * 2
                                  const rowFeatures = visibleFeatures.slice(startIndex, startIndex + 2).map(f => f.text)
                                  return rowFeatures.length > 0 ? (
                                    <div key={rowIndex} className="py-1">
                                      <h3 className={`font-medium text-black ${
                                        layoutMode === 'vertical' ? 'text-sm' : 'text-base'
                                      }`}>{rowFeatures.join(' | ')}</h3>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                            
                            {/* 二维码和按钮区域 */}
                            <div className={`bg-gray-50 flex items-center space-y-3 ${
                              layoutMode === 'vertical' 
                                ? 'p-3 flex-col' 
                                : 'p-4 flex-col justify-center w-40'
                            }`}>
                              {/* 二维码 */}
                              <div className={`bg-white border border-gray-400 flex items-center justify-center overflow-hidden ${
                                layoutMode === 'vertical' ? 'w-20 h-20' : 'w-24 h-24'
                              }`}>
                                <img 
                                  src={content.qrCodeUrl}
                                  alt="二维码"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* 点击了解按钮（使用div避免flex导致的基线偏移） */}
                              <div
                                role="button"
                                className={`w-full text-white font-medium text-center rounded-md capture-cta ${theme.button} ${
                                  layoutMode === 'vertical' ? 'py-2 text-xs' : 'py-2 text-sm'
                                }`}
                              >
                                {t.poster.clickToLearn}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <Footer language={currentLanguage} />
      </div>

      {/* Toast 通知容器 */}
      <ToastContainer toasts={toasts} onClose={closeToast} />
    </>
  )
}