# 社交媒体名片生成器

**🌐 官网**: [www.sm-card.com](https://www.sm-card.com)

**🌐 语言**: [English](./README.md) | [中文](#) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md)

一个现代化的社交媒体名片生成工具，支持多种主题和即时导出功能。

![Social Media Card Generator](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ 功能特性

- 🎨 **多种主题**: 7种精美配色主题（蓝青、萌绿、蔷薇紫、橙心、画手、山吹、极客黑）
- 📱 **响应式设计**: 完美适配桌面端和移动端设备
- 🔄 **布局选择**: 支持竖版和横版两种卡片布局
- 👁️ **可见性控制**: 灵活显示/隐藏内容区块和功能特性
- 🖱️ **拖拽排序**: 直观的拖拽界面重新排列功能特性
- 📤 **文件上传**: 支持拖拽上传二维码图片
- 📸 **高质量导出**: 即时生成和下载PNG图片
- ✏️ **实时编辑**: 编辑时实时预览效果
- 🌟 **现代界面**: 简洁专业的设计，流畅的动画效果

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + 自定义组件
- **语言**: TypeScript
- **图标**: Lucide React
- **图片生成**: html2canvas
- **拖拽功能**: HTML5 Drag API

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/skingko/Social_media_card.git
   cd Social_media_card
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器**
   
   访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面组件
├── components/
│   └── ui/                # UI 组件
│       ├── button.tsx     # 按钮组件
│       └── card.tsx       # 卡片组件
├── lib/
│   └── utils.ts           # 工具函数
├── public/                # 静态资源
│   ├── wechat_code.png    # 默认二维码
│   └── wechat_code.jpg    # 备用二维码
├── .github/
│   └── workflows/         # GitHub Actions
├── deploy.sh              # 部署脚本
├── wrangler.toml          # Cloudflare Pages 配置
└── README.md              # 英文文档
```

## 🎯 使用指南

### 创建名片

1. **编辑内容**: 点击"编辑内容"按钮修改卡片信息
2. **选择主题**: 从7种可用配色主题中选择
3. **切换布局**: 在竖版和横版布局间切换
4. **自定义特性**: 使用拖拽功能添加、删除或重新排序功能项目
5. **上传二维码**: 拖拽上传您的二维码图片或点击浏览
6. **导出卡片**: 点击"生成图片"将名片下载为PNG格式

### 主题配色

| 主题 | 颜色名称 | 十六进制代码 |
|------|----------|-------------|
| 蓝色 | 蓝青 | `#28ca71` |
| 绿色 | 萌绿 | `#28ca71` |
| 紫色 | 蔷薇紫 | `#d9b8fa` |
| 橙色 | 橙心 | `#ff8c00` |
| 红色 | 画手 | `#ff3502` |
| 黄色 | 山吹 | `#dda52d` |
| 黑色 | 极客黑 | `rgb(33, 33, 34)` |

## 🎨 自定义配置

### 添加新主题

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

### 修改默认内容

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

## 🚀 部署指南

### 部署到 Cloudflare Pages

#### 方法1：Cloudflare 控制台

1. 访问 [Cloudflare Pages 控制台](https://dash.cloudflare.com/pages)
2. 连接您的GitHub仓库：`skingko/Social_media_card`
3. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `.next`
   - **Node.js 版本**: `18.x`

#### 方法2：本地部署脚本

```bash
# 运行一键部署脚本
./deploy.sh

# 或使用 npm 命令
npm run deploy
```

#### 方法3：自动化部署

- 已预配置 GitHub Actions 工作流
- 推送到 main 分支自动部署
- 需要的 GitHub Secrets：
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

### 其他平台

本项目可以部署到任何支持 Next.js 的平台：

- **Vercel**: `vercel --prod`
- **Netlify**: 连接 GitHub 仓库
- **Railway**: `railway login && railway deploy`
- **AWS Amplify**: 连接 GitHub 仓库

## 🧪 测试

```bash
# 运行代码检查
npm run lint

# 构建测试
npm run build
```

## 🤝 贡献指南

我们欢迎贡献！请按照以下步骤操作：

1. **Fork 仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **推送到分支**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **创建 Pull Request**

### 开发规范

- 遵循 TypeScript 最佳实践
- 使用 Tailwind CSS 进行样式设计
- 确保移动端响应式设计
- 为复杂逻辑添加适当的注释
- 充分测试您的更改

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

- **🌐 在线演示**: [部署到 Cloudflare Pages](https://social-media-card.pages.dev)
- **📖 项目文档**: [GitHub 仓库](https://github.com/skingko/Social_media_card)
- **🐛 问题反馈**: [报告问题](https://github.com/skingko/Social_media_card/issues)
- **💡 功能建议**: [提交建议](https://github.com/skingko/Social_media_card/issues/new)

## 📞 联系方式

- **GitHub**: [@skingko](https://github.com/skingko)
- **微信号**: skingko
- **项目链接**: [社交媒体名片生成器](https://github.com/skingko/Social_media_card)

## 📱 关注我们

<div align="center">

### 微信公众号
<img src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509110044079.jpg" width="200" alt="微信公众号二维码">

*扫码关注微信公众号获取最新动态*

### 添加作者微信
<img src="https://test-models.oss-cn-shanghai.aliyuncs.com/pics_go/202509102242338.png" width="200" alt="作者微信二维码">

*扫码添加作者微信：skingko*

</div>

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 用于生产的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Lucide React](https://lucide.dev/) - 美观且一致的图标工具包
- [html2canvas](https://html2canvas.hertzen.com/) - 使用 JavaScript 截图

---

**⭐ 如果这个项目对您有帮助，请在 GitHub 上给它一个星标！**
