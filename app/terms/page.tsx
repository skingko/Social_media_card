'use client'

import { useState, useEffect } from 'react'
import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import Link from 'next/link'
import { ArrowLeft, FileText, Check, AlertTriangle, Settings, Mail } from 'lucide-react'

export default function TermsPage() {
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
      id: 'acceptance',
      title: t.seo?.terms?.sections?.acceptance?.title || '条款接受',
      content: t.seo?.terms?.sections?.acceptance?.content || '通过访问和使用社交媒体名片生成器（www.sm-card.com），您同意遵守本使用条款。如果您不同意这些条款，请不要使用我们的服务。我们保留随时修改这些条款的权利。',
      icon: Check
    },
    {
      id: 'usage',
      title: t.seo?.terms?.sections?.usage?.title || '服务使用',
      content: t.seo?.terms?.sections?.usage?.content || '我们的服务完全免费提供给所有用户。您可以：1）创建和下载社交媒体名片；2）将生成的名片用于个人或商业用途；3）分享我们的服务给其他人。您不得：1）尝试破坏或干扰网站运行；2）上传违法或有害内容；3）进行任何可能损害服务的行为。',
      icon: Check
    },
    {
      id: 'content',
      title: t.seo?.terms?.sections?.content?.title || '内容责任',
      content: t.seo?.terms?.sections?.content?.content || '您对上传和输入的所有内容负责，包括文字、图片等。您确保拥有使用这些内容的合法权利。我们不对用户生成的内容承担责任，也不对内容的准确性、完整性或合法性做出保证。',
      icon: FileText
    },
    {
      id: 'limitation',
      title: t.seo?.terms?.sections?.limitation?.title || '责任限制',
      content: t.seo?.terms?.sections?.limitation?.content || '在法律允许的最大范围内，我们不对因使用或无法使用服务而导致的任何直接、间接、偶然或后果性损害承担责任。服务按"现状"提供，我们不提供任何明示或暗示的保证。',
      icon: AlertTriangle
    },
    {
      id: 'modification',
      title: t.seo?.terms?.sections?.modification?.title || '服务修改',
      content: t.seo?.terms?.sections?.modification?.content || '我们保留随时修改、暂停或终止服务的权利，无需事先通知。我们会尽力保持服务的稳定性，但不保证服务不会中断。重要更新会通过网站公告或其他适当方式通知用户。',
      icon: Settings
    },
    {
      id: 'contact',
      title: t.seo?.terms?.sections?.contact?.title || '联系信息',
      content: t.seo?.terms?.sections?.contact?.content || '如果您对本使用条款有任何疑问，请联系我们：微信号：skingko，GitHub：github.com/skingko/Social_media_card，邮箱：通过GitHub项目页面联系。',
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
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.terms?.title || '使用条款'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              {t.seo?.terms?.description || '使用社交媒体名片生成器的条款和条件'}
            </p>
            <p className="text-sm text-gray-500">
              最后更新：{t.seo?.terms?.lastUpdated || '2025年1月10日'}
            </p>
          </div>

          {/* 重要提示 */}
          <div className="mb-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">重要提示</h3>
                <p className="text-yellow-800">
                  请仔细阅读本使用条款。使用我们的服务即表示您同意遵守这些条款。
                  如果您不同意任何条款，请停止使用我们的服务。
                </p>
              </div>
            </div>
          </div>

          {/* 使用条款内容 */}
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

          {/* 用户权利和义务 */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">您可以</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>免费创建和下载社交媒体名片</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>将生成的名片用于个人或商业用途</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>分享我们的服务给其他人</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>随时停止使用我们的服务</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✕</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">禁止行为</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>尝试破坏或干扰网站正常运行</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>上传违法、有害或不当内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>进行可能损害服务的任何行为</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>侵犯他人知识产权或隐私权</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 免责声明 */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">免责声明</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                本服务按"现状"提供，我们不对服务的可用性、准确性、完整性或适用性做出任何保证。
              </p>
              <p>
                我们不对因使用或无法使用本服务而导致的任何损失承担责任，包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>数据丢失或损坏</li>
                <li>业务中断或利润损失</li>
                <li>第三方服务的中断</li>
                <li>因技术故障导致的任何问题</li>
              </ul>
            </div>
          </div>

          {/* 法律适用 */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">法律适用</h2>
            <p className="text-gray-700 leading-relaxed">
              本使用条款受中华人民共和国法律管辖。如因本条款引起任何争议，
              双方应首先通过友好协商解决；协商不成的，应提交有管辖权的人民法院解决。
            </p>
          </div>

          {/* 联系信息 */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">条款问题？</h2>
            <p className="text-gray-600 mb-6">
              如果您对我们的使用条款有任何疑问，请随时联系我们
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
