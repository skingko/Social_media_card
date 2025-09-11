'use client'

import React from 'react'
import { GitHubIcon, WeChatIcon } from './logo'
import { useTranslation, LanguageCode } from '../../lib/i18n/index'

interface FooterProps {
  language: LanguageCode
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = useTranslation(language)

  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 网站信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.footer.websiteInfo}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {t.footer.domain}: <span className="font-medium text-blue-600">www.sm-card.com</span>
              </p>
              <p className="text-xs text-gray-500">
                {t.footer.websiteDescription}
              </p>
            </div>
          </div>

          {/* 开发者信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.footer.developer}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {t.footer.author}: <span className="font-medium text-gray-900">skingko</span>
              </p>
              <p className="text-sm text-gray-600">
                {t.footer.wechat}: <span className="font-medium text-gray-900">skingko</span>
              </p>
            </div>
          </div>

          {/* GitHub 链接 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.footer.github}</h3>
            <a
              href="https://github.com/skingko/Social_media_card"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <GitHubIcon className="w-5 h-5" />
              <span>Social Media Card Generator</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* 关注我们 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.footer.followUs}</h3>
            
            {/* 二维码并排展示 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 justify-items-center">
              {/* 公众号二维码 */}
              <div className="text-center space-y-2 w-full max-w-[120px]">
                <div className="flex items-center justify-center gap-1">
                  <WeChatIcon className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-gray-900">Ai软件测评说</p>
                </div>
                <div className="qr-code-container group cursor-pointer inline-block w-24 h-24">
                  <img
                    src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509110044079.jpg"
                    alt="微信公众号二维码"
                    className="w-full h-full border-2 border-gray-200 rounded-lg object-contain bg-white transition-all duration-300 ease-in-out hover:border-green-400 active:border-green-400"
                    style={{ 
                      transformOrigin: 'center'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">{t.footer.scanToFollow}</p>
              </div>

              {/* 作者微信 */}
              <div className="text-center space-y-2 w-full max-w-[120px]">
                <div className="flex items-center justify-center gap-1">
                  <WeChatIcon className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-gray-900">{t.footer.addAuthorWechat}</p>
                </div>
                <div className="qr-code-container group cursor-pointer inline-block w-24 h-24">
                  <img
                    src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509102242338.png"
                    alt="作者微信二维码"
                    className="w-full h-full border-2 border-gray-200 rounded-lg object-contain bg-white transition-all duration-300 ease-in-out hover:border-green-400 active:border-green-400"
                    style={{ 
                      transformOrigin: 'center'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">{t.footer.scanToAdd}</p>
              </div>
            </div>
            
            {/* 移动端提示 */}
            <p className="text-xs text-gray-400 text-center md:hidden">{t.footer.clickToEnlarge}</p>
            <p className="text-xs text-gray-400 text-center hidden md:block">{t.footer.hoverToEnlarge}</p>
          </div>
        </div>

        {/* SEO页面链接 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            <a href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.about || '关于我们'}
            </a>
            <a href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.faq || '常见问题'}
            </a>
            <a href="/guide" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.guide || '使用指南'}
            </a>
            <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.privacy || '隐私政策'}
            </a>
            <a href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.terms || '使用条款'}
            </a>
            <a href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {t.seo?.navigation?.contact || '联系我们'}
            </a>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © 2025 <span className="font-medium text-blue-600">www.sm-card.com</span> - 社交媒体名片生成器. Made with ❤️ by skingko
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Open Source</span>
              <span>•</span>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
