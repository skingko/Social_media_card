'use client'

import { useTranslation, LanguageCode, loadLanguagePreference, detectBrowserLanguage } from '../../lib/i18n/index'
import { ModernLogo } from '../../components/ui/logo'
import { Footer } from '../../components/ui/footer'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FAQPage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN')
  const t = useTranslation(currentLanguage)
  const [openItems, setOpenItems] = useState<string[]>([])

  useEffect(() => {
    const savedLanguage = loadLanguagePreference()
    const detectedLanguage = detectBrowserLanguage()
    const language = savedLanguage || detectedLanguage
    setCurrentLanguage(language)
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const faqData = [
    {
      id: 'q1',
      question: t.seo?.faq?.questions?.q1?.question || '如何使用社交媒体名片生成器？',
      answer: t.seo?.faq?.questions?.q1?.answer || '使用非常简单：1）选择您喜欢的主题风格；2）填写个人信息和联系方式；3）拖拽调整功能模块顺序；4）实时预览效果；5）点击生成图片按钮下载您的名片。整个过程只需几分钟。'
    },
    {
      id: 'q2',
      question: t.seo?.faq?.questions?.q2?.question || '支持哪些语言？',
      answer: t.seo?.faq?.questions?.q2?.answer || '我们支持20多种语言，包括中文（简体/繁体）、英语、日语、韩语、西班牙语、法语、德语、意大利语、葡萄牙语、俄语、阿拉伯语、印地语、泰语、越南语、印尼语、马来语、土耳其语、波兰语、荷兰语、瑞典语、丹麦语、挪威语、芬兰语等。'
    },
    {
      id: 'q3',
      question: t.seo?.faq?.questions?.q3?.question || '生成的名片可以用于商业用途吗？',
      answer: t.seo?.faq?.questions?.q3?.answer || '可以。我们生成的名片完全免费，您可以将其用于个人或商业用途，包括但不限于社交媒体头像、个人品牌推广、商务名片等。无需支付任何费用或版权费。'
    },
    {
      id: 'q4',
      question: t.seo?.faq?.questions?.q4?.question || '如何更换二维码？',
      answer: t.seo?.faq?.questions?.q4?.answer || '您可以通过以下方式更换二维码：1）点击编辑按钮进入编辑模式；2）找到二维码上传区域；3）点击上传按钮选择本地图片文件；4）支持JPG、PNG、GIF等常见格式；5）上传成功后会自动替换显示。'
    },
    {
      id: 'q5',
      question: t.seo?.faq?.questions?.q5?.question || '生成的图片质量如何？',
      answer: t.seo?.faq?.questions?.q5?.answer || '我们生成的图片采用高分辨率输出，确保在各种社交媒体平台上都能保持清晰的显示效果。图片格式为PNG，支持透明背景，适合各种使用场景。'
    },
    {
      id: 'q6',
      question: t.seo?.faq?.questions?.q6?.question || '是否需要注册账号？',
      answer: t.seo?.faq?.questions?.q6?.answer || '不需要。我们的服务完全免费且无需注册。您可以直接访问网站开始制作名片，无需提供任何个人信息或创建账户。'
    },
    {
      id: 'q7',
      question: t.seo?.faq?.questions?.q7?.question || '数据安全如何保障？',
      answer: t.seo?.faq?.questions?.q7?.answer || '我们非常重视用户隐私和数据安全。所有操作都在您的浏览器本地完成，不会上传或存储您的个人信息到我们的服务器。您的数据完全由您自己控制。'
    },
    {
      id: 'q8',
      question: t.seo?.faq?.questions?.q8?.question || '如何获得技术支持？',
      answer: t.seo?.faq?.questions?.q8?.answer || '如果您在使用过程中遇到任何问题，可以通过以下方式联系我们：1）微信号：skingko；2）GitHub项目页面提交issue；3）发送邮件到我们的支持邮箱。我们会尽快回复并提供帮助。'
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.seo?.faq?.title || '常见问题解答'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.seo?.faq?.description || '关于社交媒体名片生成器的常见问题和详细解答'}
            </p>
          </div>

          {/* FAQ列表 */}
          <div className="space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 底部联系信息 */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">还有其他问题？</h2>
            <p className="text-gray-700 mb-6">
              如果您没有找到想要的答案，欢迎直接联系我们的技术支持团队
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/skingko/Social_media_card" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub 支持
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
