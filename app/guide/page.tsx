'use client'

import { useState, useEffect } from 'react'
import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import { SEOHead } from '../../components/ui/seo-head'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function GuidePage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    const savedLanguage = loadLanguagePreference()
    const detectedLanguage = detectBrowserLanguage()
    const language = savedLanguage || detectedLanguage
    setCurrentLanguage(language)
  }, [])

  const steps = [
    {
      id: 'step1',
      title: t.seo?.guide?.steps?.step1?.title || '选择主题风格',
      content: t.seo?.guide?.steps?.step1?.content || '我们提供多种精美的主题风格，包括简约、商务、创意、科技等不同风格。每种主题都经过精心设计，适合不同的使用场景。您可以在左侧面板中预览并选择最适合您的主题。',
      icon: '🎨'
    },
    {
      id: 'step2',
      title: t.seo?.guide?.steps?.step2?.title || '填写个人信息',
      content: t.seo?.guide?.steps?.step2?.content || '在右侧编辑区域填写您的个人信息，包括姓名、职位、公司、联系方式等。所有字段都支持自定义，您可以根据需要添加或删除信息项。系统会实时保存您的输入。',
      icon: '✏️'
    },
    {
      id: 'step3',
      title: t.seo?.guide?.steps?.step3?.title || '自定义布局和功能',
      content: t.seo?.guide?.steps?.step3?.content || '通过拖拽功能调整各个模块的显示顺序，包括个人信息、联系方式、二维码、特色功能等。您还可以选择不同的布局模式，如卡片式、列表式等，找到最适合的展示方式。',
      icon: '🔧'
    },
    {
      id: 'step4',
      title: t.seo?.guide?.steps?.step4?.title || '实时预览效果',
      content: t.seo?.guide?.steps?.step4?.content || '在编辑过程中，您可以随时查看预览效果。预览功能支持展开和收起，让您能够清楚地看到最终的名片效果。预览会实时反映您的所有修改。',
      icon: '👀'
    },
    {
      id: 'step5',
      title: t.seo?.guide?.steps?.step5?.title || '生成和下载名片',
      content: t.seo?.guide?.steps?.step5?.content || '完成编辑后，点击"生成图片"按钮即可生成高质量的名片图片。图片会自动下载到您的设备，您可以直接用于社交媒体、印刷或其他用途。',
      icon: '📱'
    }
  ]

  return (
    <>
      <SEOHead
        title={`${t.seo?.guide?.title || '使用指南'} - 社交媒体生成器`}
        description={t.seo?.guide?.description || '学习如何使用社交媒体名片生成器'}
        keywords={`${t.seo?.guide?.title || '使用指南'},教程,指南,帮助,社交媒体名片制作`}
        canonicalUrl="https://www.sm-card.com/guide"
        language={currentLanguage}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* 导航栏 */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">{t.seo?.common?.backToHome || '返回首页'}</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <ModernLogo className="w-8 h-8" showDomain={false} size={32} />
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.guide?.title || '使用指南'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.seo?.guide?.description || '详细的使用指南，帮助您快速掌握社交媒体名片生成器的所有功能'}
            </p>
          </div>

          {/* 快速开始 */}
          <div className="mb-12 bg-blue-50 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-900">{t.seo?.common?.quickStart || '快速开始'}</h2>
            </div>
            <p className="text-gray-700 mb-4">
              {t.seo?.guide?.simpleSteps || '只需5个简单步骤，即可创建专业的社交媒体名片：'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      步骤 {index + 1}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 提示和技巧 */}
          <div className="mt-12 bg-yellow-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">💡 {t.seo?.common?.tipsAndTricks || '提示和技巧'}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">最佳实践</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>保持信息简洁明了，避免过于复杂</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>选择与个人或品牌风格匹配的主题</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>使用高质量的头像和二维码图片</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">常用功能</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>实时预览功能可以随时查看效果</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>拖拽排序让布局更加个性化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>支持多种图片格式上传</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 开始使用 */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.seo?.common?.readyToStart || '准备好开始了吗？'}</h2>
            <p className="text-gray-600 mb-6">
              {t.seo?.guide?.startCreatingNow || '现在就开始创建您的专业社交媒体名片吧！'}
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              立即开始制作
            </Link>
          </div>
        </div>
      </main>

        <Footer language={currentLanguage} />
      </div>
    </>
  )
}
