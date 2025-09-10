'use client'

import React, { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Download, Bot, Edit3, Palette, CheckCircle, Star, Users, Zap, GripVertical, Upload, X, Eye, EyeOff, RotateCw } from 'lucide-react'
import html2canvas from 'html2canvas'
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

// 样式主题配置
const themes: Record<ThemeKey, ThemeConfig> = {
  blue: {
    name: '蓝青',
    primary: 'bg-[#28ca71]',
    secondary: 'bg-blue-50',
    accent: 'bg-[#28ca71]',
    text: 'text-[#28ca71]',
    button: 'bg-[#28ca71] hover:bg-[#20b864]'
  },
  green: {
    name: '萌绿',
    primary: 'bg-[#28ca71]',
    secondary: 'bg-green-50',
    accent: 'bg-[#28ca71]',
    text: 'text-[#28ca71]',
    button: 'bg-[#28ca71] hover:bg-[#20b864]'
  },
  purple: {
    name: '蔷薇紫',
    primary: 'bg-[#d9b8fa]',
    secondary: 'bg-purple-50',
    accent: 'bg-[#d9b8fa]',
    text: 'text-[#d9b8fa]',
    button: 'bg-[#d9b8fa] hover:bg-[#d1a8f8]'
  },
  orange: {
    name: '橙心',
    primary: 'bg-[#ff8c00]',
    secondary: 'bg-orange-50',
    accent: 'bg-[#ff8c00]',
    text: 'text-[#ff8c00]',
    button: 'bg-[#ff8c00] hover:bg-[#e67e00]'
  },
  red: {
    name: '画手',
    primary: 'bg-[#ff3502]',
    secondary: 'bg-red-50',
    accent: 'bg-[#ff3502]',
    text: 'text-[#ff3502]',
    button: 'bg-[#ff3502] hover:bg-[#e52e02]'
  },
  yellow: {
    name: '山吹',
    primary: 'bg-[#dda52d]',
    secondary: 'bg-yellow-50',
    accent: 'bg-[#dda52d]',
    text: 'text-[#dda52d]',
    button: 'bg-[#dda52d] hover:bg-[#c89426]'
  },
  black: {
    name: '极客黑',
    primary: 'bg-[rgb(33,33,34)]',
    secondary: 'bg-gray-50',
    accent: 'bg-[rgb(33,33,34)]',
    text: 'text-[rgb(33,33,34)]',
    button: 'bg-[rgb(33,33,34)] hover:bg-[rgb(23,23,24)]'
  }
}

// SVG Logo 组件
const SocialMediaLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 外圆背景 */}
    <circle cx="50" cy="50" r="45" fill="url(#gradient)" stroke="#fff" strokeWidth="2"/>
    {/* 社交图标 */}
    <rect x="25" y="35" width="15" height="10" rx="2" fill="#fff" opacity="0.9"/>
    <rect x="45" y="35" width="15" height="10" rx="2" fill="#fff" opacity="0.7"/>
    <rect x="65" y="35" width="10" height="10" rx="2" fill="#fff" opacity="0.5"/>
    {/* 名片边框 */}
    <rect x="20" y="30" width="60" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6"/>
    {/* 渐变定义 */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
  </svg>
)

// 默认内容配置
const defaultContent: ContentType = {
  title: 'AI软件测评说',
  subtitle: '专业AI软件定制 | 智能化转型咨询',
  description: 'AI软件定制 | 办公自动化 | 企业转型 | 付费社群',
  descriptionVisible: true,
  features: [
    { text: 'AI软件定制服务 面议', visible: true },
    { text: 'AI办公自动化 ¥299起', visible: true },
    { text: '企业AI转型咨询 ¥999起', visible: true },
    { text: '付费社群服务 ¥9.9', visible: true }
  ],
  benefits: [
    'AI工具应用能力',
    '智能体构建技能',
    '持续更新的知识库',
    '真诚有观点的老友交流'
  ],
  qrCodeUrl: defaultQRCodePath
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('blue')
  const [content, setContent] = useState<ContentType>(defaultContent)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical')

  const generateImage = async () => {
    setIsGenerating(true)
    try {
      // 查找卡片元素（不包含外层容器）
      const cardElement = document.querySelector('.poster-card')
      if (cardElement) {
        const canvas = await html2canvas(cardElement as HTMLElement, {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
          allowTaint: false,
          logging: false,
          width: cardElement.scrollWidth,
          height: cardElement.scrollHeight
        })
        
        const link = document.createElement('a')
        link.download = `${content.title}-${themes[currentTheme].name}.png`
        link.href = canvas.toDataURL('image/png', 1.0)
        link.click()
      } else {
        alert('未找到卡片元素，请稍后重试')
      }
    } catch (error) {
      console.error('生成图片失败:', error)
      alert('生成图片失败，请重试')
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
      alert('请选择有效的图片文件')
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* 第一行：Logo + 主要操作按钮 + 布局切换 */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <SocialMediaLogo className="w-8 h-8" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">社交媒体名片生成</h1>
              </div>
            </div>
            
            <div className="flex gap-2 flex-1">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
                className="flex-1 sm:flex-none sm:min-w-[120px]"
                size="sm"
              >
                <Edit3 className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">{isEditing ? '完成编辑' : '编辑内容'}</span>
                <span className="sm:hidden">{isEditing ? '完成' : '编辑'}</span>
              </Button>
              <Button 
                onClick={generateImage} 
                disabled={isGenerating}
                className={`flex-1 sm:flex-none sm:min-w-[120px] text-white ${theme.button}`}
                size="sm"
              >
                <Download className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">{isGenerating ? '生成中...' : '生成图片'}</span>
                <span className="sm:hidden">{isGenerating ? '生成...' : '生成'}</span>
              </Button>
              <Button
                onClick={() => setLayoutMode(layoutMode === 'vertical' ? 'horizontal' : 'vertical')}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
              >
                <RotateCw className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">{layoutMode === 'vertical' ? '横版' : '竖版'}</span>
              </Button>
            </div>
          </div>
          
          {/* 第二行：主题选择 */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {Object.entries(themes).map(([key, themeConfig]) => (
              <Button
                key={key}
                size="sm"
                variant={currentTheme === key ? "default" : "outline"}
                onClick={() => setCurrentTheme(key as ThemeKey)}
                className="text-xs whitespace-nowrap flex-shrink-0"
              >
                <Palette className="mr-1 h-3 w-3" />
                {themeConfig.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要内容 - 左右分栏：左编辑，右预览 */}
      <div className="pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {isEditing ? (
            <div className="flex flex-col lg:flex-row gap-4 min-h-[calc(100vh-8rem)]">
              {/* 左侧编辑面板 */}
              <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg overflow-y-auto p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">编辑内容</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">标题</label>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">副标题</label>
                  <input
                    type="text"
                    value={content.subtitle}
                    onChange={(e) => updateContent('subtitle', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">描述内容</label>
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
                  <label className="text-sm font-medium text-gray-700 mb-2 block">功能特性（可拖拽排序）</label>
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
                    + 添加功能
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">二维码图片</label>
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
                        {isDragOver ? '释放以上传图片' : '拖拽图片到此处或点击上传'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">支持 PNG、JPG、GIF 格式</p>
                      
                      {/* 上传进度条 */}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">上传中... {Math.round(uploadProgress)}%</p>
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
                          <p className="text-sm font-medium text-gray-900">二维码已上传</p>
                          <p className="text-xs text-gray-500">点击右侧按钮可清除</p>
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
              </div>
            </div>
            
              {/* 右侧预览面板 */}
              <div className="w-full lg:w-1/2 bg-gray-50 rounded-lg overflow-y-auto flex items-center justify-center p-6">
              {/* 海报预览 */}
              <div className="bg-white flex items-center justify-center p-4">
                <div className={`poster-card w-full shadow-xl overflow-hidden relative ${
                    layoutMode === 'vertical' ? 'max-w-sm' : 'max-w-2xl'
                  }`}>
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
                          <h1 className={`font-bold ${
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
                          <img src={content.qrCodeUrl} alt="二维码" className="w-full h-full object-cover" />
                        </div>
                        
                        {/* 点击了解按钮 */}
                        <Button className={`w-full text-white font-medium ${theme.button} ${
                          layoutMode === 'vertical' ? 'py-2 text-xs' : 'py-2 text-sm'
                        }`}>
                          点击了解
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ) : (
            /* 非编辑模式 - 居中显示 */
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
              <div id="poster-content" className="bg-white flex items-center justify-center p-4">
                <div className={`poster-card w-full shadow-xl overflow-hidden relative ${
                  layoutMode === 'vertical' ? 'max-w-sm' : 'max-w-2xl'
                }`}>
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
                        <h1 className={`font-bold ${
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
                        <img src={content.qrCodeUrl} alt="二维码" className="w-full h-full object-cover" />
                      </div>
                      
                      {/* 点击了解按钮 */}
                      <Button className={`w-full text-white font-medium ${theme.button} ${
                        layoutMode === 'vertical' ? 'py-2 text-xs' : 'py-2 text-sm'
                      }`}>
                        点击了解
                      </Button>
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
  )
}
