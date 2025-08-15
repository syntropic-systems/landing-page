# Cloud Glance Landing Page

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Editing Content

All website content is stored in JSON files located in `/public/content/`. To update content:

### Content Files Structure
- `hero.json` - Main headline, subtitle, and CTAs
- `services.json` - Three product offerings
- `features.json` - Use cases and benefits
- `testimonials.json` - Customer success stories
- `navbar.json` - Navigation menu items
- `footer.json` - Footer links and copyright
- `trustbar.json` - Client logos
- `demo.json` - Demo section content

### How to Edit Content

1. **Edit JSON files directly** in `/public/content/`
2. **Keep `/content/` in sync** - Copy changes to both folders
3. **Images** - Place in `/public/assets/` and reference as `/assets/[path]`

Example content edit:
```json
// public/content/hero.json
{
  "title": {
    "gradientText": "Your Gradient Text",
    "grayText": "Your Gray Text"
  },
  "subtitle": "Your subtitle here"
}
```

## 🌐 Deployment

### Automatic Deployment
- **Production**: Every push to `master` branch auto-deploys to production
- **Preview**: Every push to other branches creates a preview deployment
- **Live Site**: [cloudglancelab.com](https://cloudglancelab.com) (after DNS propagation)

### Manual Deployment Steps

1. **Make changes** to content or code
2. **Test locally**: `npm run dev`
3. **Commit & Push**:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
4. **Vercel auto-deploys** within 2-3 minutes
5. **Check deployment** at [Vercel Dashboard](https://vercel.com)

## 🛠️ Development

### Tech Stack
- React 19 + TypeScript
- Vite build tool
- CSS Modules for styling
- Framer Motion for animations
- JSON-based content management

### Project Structure
```
/
├── public/
│   ├── content/     # JSON content files (EDIT HERE)
│   └── assets/      # Images and static files
├── src/
│   ├── components/  # React components
│   ├── styles/      # Global styles
│   └── hooks/       # Custom React hooks
└── content/         # Backup content files
```

### Commands
- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Troubleshooting

### Images not showing?
- Ensure images are in `/public/assets/`
- Use paths like `/assets/image.png` in JSON files

### Content not updating?
- Edit files in `/public/content/` (not `/content/`)
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

### Deployment issues?
- Check [Vercel Dashboard](https://vercel.com) for build logs
- Ensure all commits are pushed to GitHub

## 📦 Environment

- Node.js 18+ required
- npm 9+ recommended

## 🔗 Links

- **Repository**: [github.com/syntropic-systems/landing-page](https://github.com/syntropic-systems/landing-page)
- **Live Site**: [cloudglancelab.com](https://cloudglancelab.com)
- **Vercel Dashboard**: [vercel.com](https://vercel.com)