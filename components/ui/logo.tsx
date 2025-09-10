import React from 'react'
import { useTranslation, LanguageCode } from '../../lib/i18n/index'

interface LogoProps {
  className?: string
  size?: number
  showDomain?: boolean
  language?: LanguageCode
}

export const ModernLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', size = 40, showDomain = false, language = 'zh-CN' }) => {
  const t = useTranslation(language)
  
  if (showDomain) {
    return (
      <div className="flex items-center gap-3">
        <LogoIcon className={className} size={size} />
        <div className="flex flex-col justify-center">
          <div className="text-lg font-bold text-gray-900">www.sm-card.com</div>
          <div className="text-sm text-gray-600">{t.title}</div>
        </div>
      </div>
    )
  }
  return <LogoIcon className={className} size={size} />
}

export const LogoIcon: React.FC<LogoProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 主圆形背景 */}
    <circle 
      cx="50" 
      cy="50" 
      r="48" 
      fill="url(#modernGradient)" 
      stroke="rgba(255,255,255,0.2)" 
      strokeWidth="2"
    />
    
    {/* 简化的卡片图标 */}
    <rect 
      x="25" 
      y="35" 
      width="50" 
      height="30" 
      rx="4" 
      fill="rgba(255,255,255,0.95)" 
      stroke="rgba(0,0,0,0.1)" 
      strokeWidth="1"
    />
    
    {/* 卡片内容线条 */}
    <rect x="30" y="42" width="20" height="2" rx="1" fill="url(#textGradient)" />
    <rect x="30" y="47" width="30" height="2" rx="1" fill="rgba(99,102,241,0.6)" />
    <rect x="30" y="52" width="25" height="2" rx="1" fill="rgba(99,102,241,0.4)" />
    
    {/* 简化的装饰元素 */}
    <circle cx="65" cy="45" r="3" fill="rgba(99,102,241,0.3)" />
    <circle cx="65" cy="55" r="2" fill="rgba(99,102,241,0.5)" />
    
    {/* 渐变定义 */}
    <defs>
      <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="25%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="75%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
)

// GitHub 图标组件
export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

// WeChat 图标组件
export const WeChatIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.964 5.853-1.964-.063-.45-.196-.852-.402-1.245C16.177 4.188 12.716 2.188 8.691 2.188z"/>
    <path d="M17.22 11.875c-1.706 0-3.267.735-4.31 1.956-1.044 1.221-1.044 2.833 0 4.054 1.043 1.221 2.604 1.956 4.31 1.956a7.549 7.549 0 0 0 2.123-.303.515.515 0 0 1 .426.058l1.132.662a.195.195 0 0 0 .099.032c.097 0 .173-.078.173-.174 0-.043-.017-.085-.029-.127l-.232-.88a.353.353 0 0 1 .127-.397c1.091-.798 1.789-2.023 1.789-3.38 0-2.416-2.32-4.375-5.608-4.375z"/>
  </svg>
)

// 语言图标组件
export const LanguageIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)
