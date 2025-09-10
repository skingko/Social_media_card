# Social Media Card Generator | 社交媒体名片生成器

[English](#english) | [中文](#中文)

---

## English

A modern web application for creating beautiful social media business cards with customizable themes and instant export functionality.

### ✨ Features

- 🎨 **Multiple Themes**: 7 beautiful color themes (Blue, Green, Purple, Orange, Red, Yellow, Black)
- 📱 **Responsive Design**: Works perfectly on both desktop and mobile devices
- 🔄 **Layout Options**: Switch between vertical and horizontal card layouts
- 👁️ **Visibility Control**: Show/hide individual content sections and features
- 🖱️ **Drag & Drop**: Reorder features with intuitive drag-and-drop interface
- 📤 **File Upload**: Upload QR codes with drag-and-drop support
- 📸 **High-Quality Export**: Generate and download PNG images instantly
- ✏️ **Real-time Editing**: Live preview while editing content
- 🌟 **Modern UI**: Clean and professional design with smooth animations

### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom Components
- **Language**: TypeScript
- **Icons**: Lucide React
- **Image Generation**: html2canvas
- **Drag & Drop**: HTML5 Drag API

### 🚀 Quick Start

#### Install Dependencies

```bash
npm install
```

#### Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

#### Build for Production

```bash
npm run build
npm start
```

### 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/
│   └── ui/                # UI components
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
    ├── wechat_code.png    # Default QR code
    └── wechat_code.jpg    # Alternative QR code
```

### 🎯 Usage

1. **Edit Content**: Click "Edit Content" to modify card information
2. **Choose Theme**: Select from 7 available color themes
3. **Layout Toggle**: Switch between vertical and horizontal layouts
4. **Customize Features**: Add, remove, or reorder feature items
5. **Upload QR Code**: Drag and drop your QR code image
6. **Export Card**: Click "Generate Image" to download your card

### 🎨 Customization

#### Adding New Themes

Edit the `themes` object in `app/page.tsx`:

```typescript
const themes: Record<ThemeKey, ThemeConfig> = {
  newTheme: {
    name: 'Theme Name',
    primary: 'bg-[#color]',
    secondary: 'bg-color-50',
    accent: 'bg-[#color]',
    text: 'text-[#color]',
    button: 'bg-[#color] hover:bg-[#darker-color]'
  }
}
```

#### Modifying Default Content

Update the `defaultContent` object in `app/page.tsx`:

```typescript
const defaultContent: ContentType = {
  title: 'Your Title',
  subtitle: 'Your Subtitle',
  description: 'Your Description',
  features: [
    { text: 'Feature 1', visible: true },
    { text: 'Feature 2', visible: true }
  ],
  qrCodeUrl: '/your-qr-code.png'
}
```

### 🚀 Deployment

#### Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy automatically on push

#### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Vercel
- Netlify
- Railway
- AWS Amplify

### 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 中文

一个现代化的社交媒体名片生成工具，支持多种主题和即时导出功能。

### ✨ 功能特性

- 🎨 **多种主题**: 7种精美配色主题（蓝青、萌绿、蔷薇紫、橙心、画手、山吹、极客黑）
- 📱 **响应式设计**: 完美适配桌面端和移动端设备
- 🔄 **布局选择**: 支持竖版和横版两种卡片布局
- 👁️ **可见性控制**: 灵活显示/隐藏内容区块和功能特性
- 🖱️ **拖拽排序**: 直观的拖拽界面重新排列功能特性
- 📤 **文件上传**: 支持拖拽上传二维码图片
- 📸 **高质量导出**: 即时生成和下载PNG图片
- ✏️ **实时编辑**: 编辑时实时预览效果
- 🌟 **现代界面**: 简洁专业的设计，流畅的动画效果

### 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + 自定义组件
- **语言**: TypeScript
- **图标**: Lucide React
- **图片生成**: html2canvas
- **拖拽功能**: HTML5 Drag API

### 🚀 快速开始

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

#### 构建生产版本

```bash
npm run build
npm start
```

### 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面组件
├── components/
│   └── ui/                # UI 组件
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts           # 工具函数
└── public/                # 静态资源
    ├── wechat_code.png    # 默认二维码
    └── wechat_code.jpg    # 备用二维码
```

### 🎯 使用方法

1. **编辑内容**: 点击"编辑内容"修改卡片信息
2. **选择主题**: 从7种可用配色主题中选择
3. **切换布局**: 在竖版和横版布局间切换
4. **自定义特性**: 添加、删除或重新排序功能项目
5. **上传二维码**: 拖拽上传您的二维码图片
6. **导出卡片**: 点击"生成图片"下载您的名片

### 🎨 自定义配置

#### 添加新主题

编辑 `app/page.tsx` 中的 `themes` 对象：

```typescript
const themes: Record<ThemeKey, ThemeConfig> = {
  newTheme: {
    name: '主题名称',
    primary: 'bg-[#颜色值]',
    secondary: 'bg-color-50',
    accent: 'bg-[#颜色值]',
    text: 'text-[#颜色值]',
    button: 'bg-[#颜色值] hover:bg-[#深色值]'
  }
}
```

#### 修改默认内容

更新 `app/page.tsx` 中的 `defaultContent` 对象：

```typescript
const defaultContent: ContentType = {
  title: '您的标题',
  subtitle: '您的副标题', 
  description: '您的描述',
  features: [
    { text: '功能特性1', visible: true },
    { text: '功能特性2', visible: true }
  ],
  qrCodeUrl: '/your-qr-code.png'
}
```

### 🚀 部署

#### 部署到 Cloudflare Pages

1. 将GitHub仓库连接到Cloudflare Pages
2. 设置构建命令: `npm run build`
3. 设置输出目录: `out`
4. 推送代码自动部署

#### 其他平台

本项目可以部署到任何支持Next.js的平台：
- Vercel
- Netlify
- Railway  
- AWS Amplify

### 📄 许可证

MIT许可证 - 详见 [LICENSE](LICENSE) 文件。

### 🤝 贡献

欢迎贡献代码！请随时提交Pull Request。

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/skingko/Social_media_card](https://github.com/skingko/Social_media_card)
- **Live Demo**: [Deploy on Cloudflare Pages](https://social-media-card.pages.dev)
- **Issues**: [Report Issues](https://github.com/skingko/Social_media_card/issues)

## 📞 Contact | 联系方式

- **GitHub**: [@skingko](https://github.com/skingko)
- **Project Link**: [Social Media Card Generator](https://github.com/skingko/Social_media_card)