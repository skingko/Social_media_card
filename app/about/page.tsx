'use client'

import { useState, useEffect } from 'react'
import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    const savedLanguage = loadLanguagePreference()
    const detectedLanguage = detectBrowserLanguage()
    const language = savedLanguage || detectedLanguage
    setCurrentLanguage(language)
  }, [])

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.about?.title || '关于社交媒体名片生成器'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.seo?.about?.description || '了解我们的使命、团队和技术，为用户提供最优质的社交媒体名片生成服务'}
            </p>
          </div>

          {/* 内容区域 */}
          <div className="space-y-12">
            {/* 介绍 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">项目介绍</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t.seo?.about?.content?.introduction || '社交媒体名片生成器是一个专业的在线工具，致力于为全球用户提供高质量的社交媒体名片制作服务。我们支持20多种语言，拥有丰富的主题风格和强大的自定义功能。'}
              </p>
            </section>

            {/* 使命 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">我们的使命</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t.seo?.about?.content?.mission || '我们的使命是让每个人都能轻松创建专业、美观的社交媒体名片，提升个人和品牌形象。通过简单易用的界面和强大的功能，帮助用户在社交媒体上脱颖而出。'}
              </p>
            </section>

            {/* 功能特色 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">功能特色</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">多主题风格</h3>
                      <p className="text-gray-600">提供多种精美主题，适合不同场景使用</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">拖拽排序</h3>
                      <p className="text-gray-600">自由调整功能模块显示顺序</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">实时预览</h3>
                      <p className="text-gray-600">所见即所得的编辑体验</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">多语言支持</h3>
                      <p className="text-gray-600">支持20多种语言，服务全球用户</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">高质量输出</h3>
                      <p className="text-gray-600">一键生成高分辨率名片图片</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">完全免费</h3>
                      <p className="text-gray-600">所有功能免费使用，无需注册</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 技术栈 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">技术架构</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {t.seo?.about?.content?.technology || '我们使用最新的Web技术构建，包括Next.js、React、TypeScript和Tailwind CSS，确保最佳的用户体验和性能。'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <div key={tech} className="bg-gray-50 rounded-lg p-4 text-center">
                    <span className="font-medium text-gray-900">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 团队 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">开发团队</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t.seo?.about?.content?.team || '我们的团队由经验丰富的开发者和设计师组成，致力于持续改进产品，为用户提供更好的服务。'}
              </p>
            </section>

            {/* 联系我们 */}
            <section className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">联系我们</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {t.seo?.about?.content?.contact || '如有任何问题或建议，欢迎通过微信、GitHub或邮件联系我们。我们重视每一个用户的反馈。'}
              </p>
              <div className="flex flex-wrap gap-4">
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
            </section>
          </div>
        </div>
      </main>

      <Footer language={currentLanguage} />
    </div>
  )
}
