# 国际化 (i18n) 系统

本项目采用模块化的国际化系统，支持多语言切换和扩展。

## 文件结构

```
lib/i18n/
├── index.ts           # 主配置文件和工具函数
├── types.ts           # TypeScript 类型定义
├── locales/           # 语言翻译文件目录
│   ├── zh-CN.ts      # 简体中文
│   ├── en.ts         # 英语
│   ├── ja.ts         # 日语
│   ├── ko.ts         # 韩语
│   ├── es.ts         # 西班牙语
│   └── ...           # 其他语言文件
└── README.md         # 说明文档
```

## 支持的语言

目前已实现以下语言的完整翻译：
- 🇨🇳 简体中文 (zh-CN)
- 🇺🇸 英语 (en)
- 🇯🇵 日语 (ja)
- 🇰🇷 韩语 (ko)
- 🇪🇸 西班牙语 (es)

其他语言暂时使用英语作为备选，后续可以逐步添加完整翻译。

## 如何使用

### 在组件中使用翻译

```tsx
import { useTranslation, LanguageCode } from '../lib/i18n'

function MyComponent({ language }: { language: LanguageCode }) {
  const t = useTranslation(language)
  
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  )
}
```

### 语言检测和存储

```tsx
import { 
  detectBrowserLanguage, 
  loadLanguagePreference, 
  saveLanguagePreference 
} from '../lib/i18n'

// 检测浏览器语言
const browserLang = detectBrowserLanguage()

// 从本地存储加载语言偏好
const savedLang = loadLanguagePreference()

// 保存语言偏好到本地存储
saveLanguagePreference('en')
```

## 如何添加新语言

1. 在 `types.ts` 的 `supportedLanguages` 数组中添加新语言：
```tsx
{ code: 'fr', name: 'Français', flag: '🇫🇷' }
```

2. 在 `locales/` 目录下创建新的语言文件，例如 `fr.ts`：
```tsx
import { Translation } from '../types'

export const fr: Translation = {
  title: 'Générateur de Cartes...',
  // ... 其他翻译
}
```

3. 在 `index.ts` 中导入并添加到 translations 对象：
```tsx
import { fr } from './locales/fr'

const translations: Record<LanguageCode, Translation> = {
  // ... 其他语言
  'fr': fr,
}
```

## 翻译内容结构

每个翻译文件都包含以下部分：
- `title`, `subtitle`, `description`: 基本信息
- `nav`: 导航栏文本
- `themes`: 主题名称
- `editor`: 编辑器界面文本
- `poster`: 海报相关文本
- `footer`: 页脚文本
- `ui`: 用户界面文本
- `defaultContent`: 默认卡片内容
- `meta`: SEO 元信息

## 注意事项

1. 所有翻译文件必须实现完整的 `Translation` 接口
2. 新增翻译项时，需要同时更新 `types.ts` 中的接口定义
3. 建议保持翻译的一致性和准确性
4. 对于复杂的语言（如阿拉伯语），可能需要额外的 CSS 样式支持
