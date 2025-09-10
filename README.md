# Social Media Card Generator

**🌐 Language**: [English](#) | [中文](./README.zh-CN.md)

A modern web application for creating beautiful social media business cards with customizable themes and instant export functionality.

![Social Media Card Generator](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Multiple Themes**: 7 beautiful color themes (Blue, Green, Purple, Orange, Red, Yellow, Black)
- 📱 **Responsive Design**: Works perfectly on both desktop and mobile devices
- 🔄 **Layout Options**: Switch between vertical and horizontal card layouts
- 👁️ **Visibility Control**: Show/hide individual content sections and features
- 🖱️ **Drag & Drop**: Reorder features with intuitive drag-and-drop interface
- 📤 **File Upload**: Upload QR codes with drag-and-drop support
- 📸 **High-Quality Export**: Generate and download PNG images instantly
- ✏️ **Real-time Editing**: Live preview while editing content
- 🌟 **Modern UI**: Clean and professional design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom Components
- **Language**: TypeScript
- **Icons**: Lucide React
- **Image Generation**: html2canvas
- **Drag & Drop**: HTML5 Drag API

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/skingko/Social_media_card.git
   cd Social_media_card
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/
│   └── ui/                # UI components
│       ├── button.tsx     # Button component
│       └── card.tsx       # Card component
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   ├── wechat_code.png    # Default QR code
│   └── wechat_code.jpg    # Alternative QR code
├── .github/
│   └── workflows/         # GitHub Actions
├── deploy.sh              # Deployment script
├── wrangler.toml          # Cloudflare Pages config
└── README.zh-CN.md        # Chinese documentation
```

## 🎯 Usage Guide

### Creating Your Card

1. **Edit Content**: Click the "Edit Content" button to modify card information
2. **Choose Theme**: Select from 7 available color themes
3. **Layout Toggle**: Switch between vertical and horizontal layouts
4. **Customize Features**: Add, remove, or reorder feature items using drag & drop
5. **Upload QR Code**: Drag and drop your QR code image or click to browse
6. **Export Card**: Click "Generate Image" to download your card as PNG

### Theme Colors

| Theme | Color | Hex Code |
|-------|-------|----------|
| Blue | 蓝青 | `#28ca71` |
| Green | 萌绿 | `#28ca71` |
| Purple | 蔷薇紫 | `#d9b8fa` |
| Orange | 橙心 | `#ff8c00` |
| Red | 画手 | `#ff3502` |
| Yellow | 山吹 | `#dda52d` |
| Black | 极客黑 | `rgb(33, 33, 34)` |

## 🎨 Customization

### Adding New Themes

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

### Modifying Default Content

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

## 🚀 Deployment

### Deploy to Cloudflare Pages

#### Method 1: Cloudflare Dashboard

1. Visit [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Connect your GitHub repository: `skingko/Social_media_card`
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: `18.x`

#### Method 2: Local Deployment Script

```bash
# Run one-click deployment script
./deploy.sh

# Or use npm command
npm run deploy
```

#### Method 3: Automated Deployment

- GitHub Actions workflow is pre-configured
- Automatic deployment on push to main branch
- Required GitHub Secrets:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

### Other Platforms

This project can be deployed to any platform that supports Next.js:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository
- **Railway**: `railway login && railway deploy`
- **AWS Amplify**: Connect GitHub repository

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build test
npm run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Add appropriate comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **🌐 Live Demo**: [Deploy on Cloudflare Pages](https://social-media-card.pages.dev)
- **📖 Documentation**: [GitHub Repository](https://github.com/skingko/Social_media_card)
- **🐛 Issues**: [Report Issues](https://github.com/skingko/Social_media_card/issues)
- **💡 Feature Requests**: [Request Features](https://github.com/skingko/Social_media_card/issues/new)

## 📞 Contact

- **GitHub**: [@skingko](https://github.com/skingko)
- **Project Link**: [Social Media Card Generator](https://github.com/skingko/Social_media_card)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [html2canvas](https://html2canvas.hertzen.com/) - Screenshots with JavaScript

---

**⭐ If you find this project helpful, please give it a star on GitHub!**