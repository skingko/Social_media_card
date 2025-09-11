// 国际化类型定义
export interface Translation {
  title: string
  subtitle: string
  description: string
  nav: {
    editContent: string
    finishEdit: string
    generateImage: string
    generating: string
    horizontal: string
    vertical: string
    editMode: string
  }
  themes: {
    blue: string
    green: string
    purple: string
    orange: string
    red: string
    yellow: string
    black: string
    pink: string
    dark: string
  }
  editor: {
    editContent: string
    title: string
    subtitle: string
    description: string
    name: string
    company: string
    phone: string
    email: string
    website: string
    wechat: string
    bio: string
    features: string
    addFeature: string
    qrCode: string
    dragUpload: string
    uploadSupport: string
    uploading: string
    qrUploaded: string
    clickRemove: string
  }
  poster: {
    clickToLearn: string
  }
  footer: {
    developer: string
    github: string
    wechat: string
    followUs: string
    author: string
    githubRepo: string
    addAuthorWechat: string
    wechatPublic: string
    scanToFollow: string
    scanToAdd: string
    clickToEnlarge: string
    hoverToEnlarge: string
    websiteInfo: string
    domain: string
    websiteDescription: string
  }
  ui: {
    selectTheme: string
    layoutMode: string
    previewEffect: string
    collapsePreview: string
    expandPreview: string
    completeEditFirst: string
    share: string
    shareToSocialMedia: string
    copied: string
    copyLink: string
    email: string
    cardNotFound: string
    generateImageFailed: string
    selectValidImageFile: string
  }
  defaultContent: {
    title: string
    subtitle: string
    description: string
    feature1: string
    feature2: string
    feature3: string
    feature4: string
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
  seo: {
    common: {
      backToHome: string
      lastUpdated: string
      getStarted: string
      learnMore: string
      readyToStart: string
      startCreating: string
      quickStart: string
      tipsAndTricks: string
      bestPractices: string
      commonFeatures: string
      stillHaveQuestions: string
      contactSupport: string
      followUs: string
      openSource: string
      projectIntroduction: string
      ourMission: string
      features: string
      technologyStack: string
      developmentTeam: string
      contactUs: string
      websiteInfo: string
      legalNotice: string
      dataProcessingDetails: string
      userRights: string
      disclaimer: string
      legalJurisdiction: string
      termsQuestions: string
      privacyQuestions: string
      supportChannels: string
    }
    navigation: {
      about: string
      faq: string
      guide: string
      privacy: string
      terms: string
      contact: string
      sitemap: string
    }
    about: {
      title: string
      description: string
      content: {
        introduction: string
        mission: string
        features: string
        technology: string
        team: string
        contact: string
      }
      featureList: {
        multiTheme: { title: string; description: string }
        dragSort: { title: string; description: string }
        realTimePreview: { title: string; description: string }
        multiLanguage: { title: string; description: string }
        highQuality: { title: string; description: string }
        completelyFree: { title: string; description: string }
      }
    }
    faq: {
      title: string
      description: string
      moreQuestions: string
      contactSupport: string
      questions: {
        q1: {
          question: string
          answer: string
        }
        q2: {
          question: string
          answer: string
        }
        q3: {
          question: string
          answer: string
        }
        q4: {
          question: string
          answer: string
        }
        q5: {
          question: string
          answer: string
        }
        q6: {
          question: string
          answer: string
        }
        q7: {
          question: string
          answer: string
        }
        q8: {
          question: string
          answer: string
        }
      }
    }
    guide: {
      title: string
      description: string
      simpleSteps: string
      startCreatingNow: string
      steps: {
        step1: {
          title: string
          content: string
        }
        step2: {
          title: string
          content: string
        }
        step3: {
          title: string
          content: string
        }
        step4: {
          title: string
          content: string
        }
        step5: {
          title: string
          content: string
        }
      }
    }
    privacy: {
      title: string
      description: string
      lastUpdated: string
      privacyCommitment: string
      privacyCommitmentText: string
      dataProcessingDetails: string
      yourRights: string
      contactRightText: string
      privacyQuestionsTitle: string
      privacyQuestionsText: string
      sections: {
        overview: {
          title: string
          content: string
        }
        dataCollection: {
          title: string
          content: string
        }
        dataUsage: {
          title: string
          content: string
        }
        dataSecurity: {
          title: string
          content: string
        }
        cookies: {
          title: string
          content: string
        }
        contact: {
          title: string
          content: string
        }
      }
    }
    terms: {
      title: string
      description: string
      lastUpdated: string
      termsQuestionsTitle: string
      termsQuestionsText: string
      sections: {
        acceptance: {
          title: string
          content: string
        }
        usage: {
          title: string
          content: string
        }
        content: {
          title: string
          content: string
        }
        limitation: {
          title: string
          content: string
        }
        modification: {
          title: string
          content: string
        }
        contact: {
          title: string
          content: string
        }
      }
    }
    contact: {
      title: string
      description: string
      methods: {
        wechat: {
          title: string
          description: string
        }
        github: {
          title: string
          description: string
        }
        email: {
          title: string
          description: string
        }
      }
    }
  }
}

// 支持的语言列表
export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
] as const

export type LanguageCode = typeof supportedLanguages[number]['code']
