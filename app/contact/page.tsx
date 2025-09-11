'use client'

import { useState, useEffect } from 'react'
import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import { SEOHead } from '../../components/ui/seo-head'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Github, Mail, Clock, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    const savedLanguage = loadLanguagePreference()
    const detectedLanguage = detectBrowserLanguage()
    const language = savedLanguage || detectedLanguage
    setCurrentLanguage(language)
  }, [])

  const contactMethods = [
    {
      id: 'wechat',
      title: t.seo?.contact?.methods?.wechat?.title || '微信联系',
      description: t.seo?.contact?.methods?.wechat?.description || '添加微信号 skingko 获得即时支持和反馈。我们也欢迎您关注我们的微信公众号获取最新动态。',
      icon: MessageCircle,
      action: '微信号: skingko',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-600'
    },
    {
      id: 'github',
      title: t.seo?.contact?.methods?.github?.title || 'GitHub项目',
      description: t.seo?.contact?.methods?.github?.description || '访问我们的开源项目 github.com/skingko/Social_media_card，提交问题、建议或贡献代码。',
      icon: Github,
      action: '访问 GitHub',
      link: 'https://github.com/skingko/Social_media_card',
      color: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-gray-900'
    },
    {
      id: 'email',
      title: t.seo?.contact?.methods?.email?.title || '邮件支持',
      description: t.seo?.contact?.methods?.email?.description || '通过GitHub项目页面的issue系统或discussion功能联系我们，我们会及时回复您的问题。',
      icon: Mail,
      action: '发送邮件',
      link: 'https://github.com/skingko/Social_media_card/issues',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-600'
    }
  ]

  return (
    <>
      <SEOHead
        title={`${t.seo?.contact?.title || '联系我们'} - 社交媒体生成器`}
        description={t.seo?.contact?.description || '联系我们获取帮助和支持'}
        keywords={`${t.seo?.contact?.title || '联系我们'},客服,支持,帮助,技术支持`}
        canonicalUrl="https://www.sm-card.com/contact"
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.contact?.title || '联系我们'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.seo?.contact?.description || '通过多种方式与我们取得联系，获得帮助和支持'}
            </p>
          </div>

          {/* 联系方式 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method) => (
              <div key={method.id} className="text-center">
                <div className={`w-16 h-16 ${method.color.replace('hover:', '')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4 min-h-[3rem]">
                  {method.description}
                </p>
                {method.link ? (
                  <a 
                    href={method.link}
                    className={`inline-flex items-center gap-2 ${method.color} text-white px-4 py-2 rounded-lg transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {method.action}
                  </a>
                ) : (
                  <div className={`inline-flex items-center gap-2 ${method.color} text-white px-4 py-2 rounded-lg`}>
                    {method.action}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 支持信息 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">响应时间</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>微信消息</span>
                  <span className="font-medium">通常 2-6 小时</span>
                </div>
                <div className="flex justify-between">
                  <span>GitHub Issue</span>
                  <span className="font-medium">通常 1-3 天</span>
                </div>
                <div className="flex justify-between">
                  <span>功能建议</span>
                  <span className="font-medium">通常 1-7 天</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">支持语言</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>中文（简体/繁体）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>English</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>其他语言（基础支持）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 常见问题快速链接 */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">联系前请查看</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/faq" 
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">❓</div>
                <h3 className="font-semibold text-gray-900 mb-2">常见问题</h3>
                <p className="text-gray-600 text-sm">查看常见问题解答</p>
              </Link>
              <Link 
                href="/guide" 
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">📖</div>
                <h3 className="font-semibold text-gray-900 mb-2">使用指南</h3>
                <p className="text-gray-600 text-sm">详细的使用教程</p>
              </Link>
              <Link 
                href="/about" 
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">ℹ️</div>
                <h3 className="font-semibold text-gray-900 mb-2">关于我们</h3>
                <p className="text-gray-600 text-sm">了解项目详情</p>
              </Link>
            </div>
          </div>

          {/* 二维码展示 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="text-center bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">微信公众号</h3>
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509110044079.jpg"
                  alt="微信公众号二维码"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-gray-600 text-sm">扫码关注获取最新动态</p>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">添加作者微信</h3>
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509102242338.png"
                  alt="作者微信二维码"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-gray-600 text-sm">扫码添加获得即时支持</p>
            </div>
          </div>

          {/* 开源信息 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">开源项目</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              社交媒体名片生成器是一个完全开源的项目，我们欢迎社区的贡献和反馈。
              如果您是开发者，欢迎参与项目开发！
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/skingko/Social_media_card"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
                查看源码
              </a>
              <a 
                href="https://github.com/skingko/Social_media_card/issues"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                提交 Issue
              </a>
            </div>
          </div>
        </div>
      </main>

        <Footer language={currentLanguage} />
      </div>
    </>
  )
}
