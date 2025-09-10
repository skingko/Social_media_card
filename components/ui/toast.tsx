'use client'

import React, { useState, useEffect, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  message: ToastMessage
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // 延迟显示动画
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    // 自动隐藏
    const hideTimer = setTimeout(() => {
      handleClose()
    }, message.duration || 5000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [message.duration])

  const handleClose = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(message.id)
    }, 300) // 等待退出动画完成
  }, [message.id, onClose])

  const getToastStyles = () => {
    const baseStyles = "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ease-in-out transform"
    const visibilityStyles = isVisible && !isLeaving 
      ? "translate-y-0 opacity-100" 
      : "translate-y-full opacity-0"

    switch (message.type) {
      case 'success':
        return `${baseStyles} ${visibilityStyles} bg-green-50/95 border-green-200 text-green-800`
      case 'error':
        return `${baseStyles} ${visibilityStyles} bg-red-50/95 border-red-200 text-red-800`
      case 'warning':
        return `${baseStyles} ${visibilityStyles} bg-yellow-50/95 border-yellow-200 text-yellow-800`
      case 'info':
        return `${baseStyles} ${visibilityStyles} bg-blue-50/95 border-blue-200 text-blue-800`
      default:
        return `${baseStyles} ${visibilityStyles} bg-gray-50/95 border-gray-200 text-gray-800`
    }
  }

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={getToastStyles()}>
      {getIcon()}
      <span className="flex-1 text-sm font-medium">{message.message}</span>
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto max-w-sm w-full">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast} onClose={onClose} />
        ))}
      </div>
    </div>
  )
}

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastMessage = {
      id,
      message,
      type,
      duration
    }

    setToasts(prev => [...prev, newToast])
  }, [])

  const closeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', duration)
  }, [showToast])

  const showError = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', duration)
  }, [showToast])

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', duration)
  }, [showToast])

  const showInfo = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', duration)
  }, [showToast])

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeToast
  }
}
