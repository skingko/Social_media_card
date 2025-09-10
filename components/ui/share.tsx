'use client'

import React, { useState } from 'react'
import { Share2, Link, Check, X } from 'lucide-react'
import { Button } from './button'
import { useTranslation, LanguageCode } from '../../lib/i18n/index'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  WeiboShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditIcon,
  WeiboIcon,
  EmailIcon
} from 'react-share'

interface ShareProps {
  language: LanguageCode
}

export const ShareButton: React.FC<ShareProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const t = useTranslation(language)

  const shareData = {
    url: 'https://www.sm-card.com',
    title: t.meta.title,
    description: t.meta.description,
    hashtag: '#社交媒体名片生成器'
  }

  const copyToClipboard = async () => {
    try {
      const shareText = `${shareData.title}\n\n${shareData.description}\n\n🔗 ${shareData.url}`
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url
        })
        setIsOpen(false)
      } catch (err) {
        console.error('分享失败:', err)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleShareSuccess = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center gap-1 sm:gap-2 hover:bg-gray-50 px-2 sm:px-3"
      >
        <Share2 className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">{t.ui?.share || '分享'}</span>
      </Button>

      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 分享面板 */}
          <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* 标题栏 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">
                {t.ui?.shareToSocialMedia || '分享到社交媒体'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* 分享平台网格 */}
            <div className="p-4">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {/* Facebook */}
                <div className="flex flex-col items-center">
                  <FacebookShareButton
                    url={shareData.url}
                    hashtag={shareData.hashtag}
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <FacebookIcon size={48} round />
                  </FacebookShareButton>
                  <span className="text-xs text-gray-600 mt-1">Facebook</span>
                </div>

                {/* Twitter */}
                <div className="flex flex-col items-center">
                  <TwitterShareButton
                    url={shareData.url}
                    title={shareData.title}
                    hashtags={['社交媒体名片', '名片生成器']}
                    via="sm_card_com"
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <TwitterIcon size={48} round />
                  </TwitterShareButton>
                  <span className="text-xs text-gray-600 mt-1">Twitter</span>
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col items-center">
                  <LinkedinShareButton
                    url={shareData.url}
                    title={shareData.title}
                    summary={shareData.description}
                    source="sm-card.com"
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <LinkedinIcon size={48} round />
                  </LinkedinShareButton>
                  <span className="text-xs text-gray-600 mt-1">LinkedIn</span>
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col items-center">
                  <WhatsappShareButton
                    url={shareData.url}
                    title={`${shareData.title} - ${shareData.description}`}
                    separator=" "
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <WhatsappIcon size={48} round />
                  </WhatsappShareButton>
                  <span className="text-xs text-gray-600 mt-1">WhatsApp</span>
                </div>

                {/* Telegram */}
                <div className="flex flex-col items-center">
                  <TelegramShareButton
                    url={shareData.url}
                    title={`${shareData.title} - ${shareData.description}`}
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <TelegramIcon size={48} round />
                  </TelegramShareButton>
                  <span className="text-xs text-gray-600 mt-1">Telegram</span>
                </div>

                {/* Reddit */}
                <div className="flex flex-col items-center">
                  <RedditShareButton
                    url={shareData.url}
                    title={shareData.title}
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <RedditIcon size={48} round />
                  </RedditShareButton>
                  <span className="text-xs text-gray-600 mt-1">Reddit</span>
                </div>

                {/* 微博 */}
                <div className="flex flex-col items-center">
                  <WeiboShareButton
                    url={shareData.url}
                    title={`${shareData.title} - ${shareData.description}`}
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <WeiboIcon size={48} round />
                  </WeiboShareButton>
                  <span className="text-xs text-gray-600 mt-1">微博</span>
                </div>

                {/* 邮件 */}
                <div className="flex flex-col items-center">
                  <EmailShareButton
                    url={shareData.url}
                    subject={shareData.title}
                    body={`${shareData.description}\n\n查看详情：`}
                    onShareWindowClose={handleShareSuccess}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <EmailIcon size={48} round />
                  </EmailShareButton>
                  <span className="text-xs text-gray-600 mt-1">{t.ui?.email || '邮件'}</span>
                </div>
              </div>

              {/* 复制链接 */}
              <div className="border-t border-gray-200 pt-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        {t.ui?.copied || '已复制'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Link className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium">
                        {t.ui?.copyLink || '复制链接'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
