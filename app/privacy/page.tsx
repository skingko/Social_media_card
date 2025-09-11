'use client'

import { useState, useEffect } from 'react'
import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Cookie, Mail } from 'lucide-react'

export default function PrivacyPage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    const savedLanguage = loadLanguagePreference()
    const detectedLanguage = detectBrowserLanguage()
    const language = savedLanguage || detectedLanguage
    setCurrentLanguage(language)
  }, [])

  const sections = [
    {
      id: 'overview',
      title: t.seo?.privacy?.sections?.overview?.title || '概述',
      content: t.seo?.privacy?.sections?.overview?.content || '我们非常重视用户的隐私权。本隐私政策说明了我们如何收集、使用和保护您在使用社交媒体名片生成器时的信息。我们承诺保护您的隐私，并遵守相关的数据保护法律法规。',
      icon: Shield
    },
    {
      id: 'dataCollection',
      title: t.seo?.privacy?.sections?.dataCollection?.title || '信息收集',
      content: t.seo?.privacy?.sections?.dataCollection?.content || '我们的服务设计为本地运行，这意味着您输入的个人信息（如姓名、职位、联系方式等）都在您的浏览器本地处理，不会上传到我们的服务器。我们只收集基本的网站使用统计信息，如页面访问量、用户地理位置（国家级别）和设备类型，用于改善服务质量。',
      icon: Eye
    },
    {
      id: 'dataUsage',
      title: t.seo?.privacy?.sections?.dataUsage?.title || '信息使用',
      content: t.seo?.privacy?.sections?.dataUsage?.content || '我们收集的统计信息仅用于：1）分析网站性能和用户体验；2）了解用户需求，改进产品功能；3）生成匿名的使用报告；4）确保网站安全和稳定运行。我们不会将您的信息用于营销或出售给第三方。',
      icon: Eye
    },
    {
      id: 'dataSecurity',
      title: t.seo?.privacy?.sections?.dataSecurity?.title || '数据安全',
      content: t.seo?.privacy?.sections?.dataSecurity?.content || '我们采用行业标准的安全措施保护我们收集的信息。网站使用HTTPS加密传输，服务器部署在可靠的云平台上。由于大部分数据处理都在您的浏览器本地完成，您的个人信息得到了最大程度的保护。',
      icon: Lock
    },
    {
      id: 'cookies',
      title: t.seo?.privacy?.sections?.cookies?.title || 'Cookie使用',
      content: t.seo?.privacy?.sections?.cookies?.content || '我们使用Cookie和类似技术来改善您的浏览体验。这些Cookie主要用于：1）记住您的语言偏好；2）保存您的主题选择；3）统计网站访问数据。您可以通过浏览器设置管理Cookie偏好。',
      icon: Cookie
    },
    {
      id: 'contact',
      title: t.seo?.privacy?.sections?.contact?.title || '联系我们',
      content: t.seo?.privacy?.sections?.contact?.content || '如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：微信号：skingko，GitHub：github.com/skingko/Social_media_card，或通过网站的联系页面发送消息。',
      icon: Mail
    }
  ]

  return (
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
                <span className="text-sm font-medium">返回首页</span>
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.privacy?.title || '隐私政策'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              {t.seo?.privacy?.description || '我们如何保护您的隐私和处理您的数据'}
            </p>
            <p className="text-sm text-gray-500">
              最后更新：{t.seo?.privacy?.lastUpdated || '2025年1月10日'}
            </p>
          </div>

          {/* 重要提示 */}
          <div className="mb-12 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">隐私保护承诺</h3>
                <p className="text-green-800">
                  我们的服务完全在您的浏览器本地运行，不会收集、存储或传输您的个人信息到我们的服务器。
                  您的数据安全是我们的首要关注。
                </p>
              </div>
            </div>
          </div>

          {/* 隐私政策内容 */}
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.id} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* 数据处理详情 */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">数据处理详情</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  本地处理的数据
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 个人姓名和联系信息</li>
                  <li>• 上传的头像和二维码图片</li>
                  <li>• 名片内容和布局设置</li>
                  <li>• 主题和样式偏好</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  统计分析数据
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 页面访问量（匿名）</li>
                  <li>• 用户地理位置（国家级别）</li>
                  <li>• 设备类型和浏览器信息</li>
                  <li>• 功能使用统计</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 用户权利 */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">您的权利</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">知情权</h3>
                <p className="text-gray-700 text-sm">了解我们如何处理您的数据</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">控制权</h3>
                <p className="text-gray-700 text-sm">完全控制您的个人数据</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">联系权</h3>
                <p className="text-gray-700 text-sm">随时联系我们咨询问题</p>
              </div>
            </div>
          </div>

          {/* 联系信息 */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">有隐私问题？</h2>
            <p className="text-gray-600 mb-6">
              如果您对我们的隐私政策有任何疑问，请随时联系我们
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/skingko/Social_media_card" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub 项目
              </a>
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                微信: skingko
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={currentLanguage} />
    </div>
  )
}
