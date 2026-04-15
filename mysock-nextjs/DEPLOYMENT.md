# 🚀 MySock Next.js - Deployment Guide

## Option 1: Vercel (Recommended)

### Why Vercel?
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mysock-nextjs.git
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Done!**
   - Your site is live at `https://your-project.vercel.app`

### Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_WA_NUMBER=919999999999
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   ```

## Option 2: Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `.next`
3. **Deploy**

## Option 3: Self-Hosted (VPS)

### Requirements
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

### Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/mysock-nextjs.git
   cd mysock-nextjs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Install PM2**
   ```bash
   npm install -g pm2
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "mysock" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Option 4: Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build & Run

```bash
docker build -t mysock-nextjs .
docker run -p 3000:3000 mysock-nextjs
```

### Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_WA_NUMBER=919999999999
    restart: always
```

## Production Checklist

### Before Deployment

- [ ] Update WhatsApp number in `lib/whatsapp.ts`
- [ ] Test all pages locally
- [ ] Run `npm run build` successfully
- [ ] Check for console errors
- [ ] Test authentication flow
- [ ] Test cart functionality
- [ ] Verify WhatsApp links work
- [ ] Check mobile responsiveness
- [ ] Update meta tags for SEO
- [ ] Add Google Analytics (optional)

### After Deployment

- [ ] Test live site on desktop
- [ ] Test live site on mobile
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Test service pages
- [ ] Test cart checkout
- [ ] Check page load speed
- [ ] Verify HTTPS is working
- [ ] Test WhatsApp integration
- [ ] Monitor error logs

## Performance Optimization

### 1. Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/image.jpg" 
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

### 2. Enable Caching

In `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['ui-avatars.com'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### 3. Analyze Bundle Size

```bash
npm install @next/bundle-analyzer
```

Add to `next.config.js`:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});
```

Run:
```bash
ANALYZE=true npm run build
```

## Monitoring

### Vercel Analytics

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Cloudflare (Optional)

1. Add site to Cloudflare
2. Update nameservers
3. Enable proxy (orange cloud)
4. SSL/TLS → Full

## Backup Strategy

### Database Backups (Future)

```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/mysock" --out=/backup

# Restore
mongorestore --uri="mongodb://localhost:27017/mysock" /backup
```

### Code Backups

- Use GitHub for version control
- Enable GitHub Actions for CI/CD
- Regular commits and tags

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next
npm run build
```

### 404 Errors

- Check `next.config.js`
- Verify file structure
- Check dynamic routes

### Slow Performance

- Enable caching
- Optimize images
- Use CDN
- Minimize JavaScript

## Support

Need help? Contact:
- Email: hello@mysock.io
- Location: Maharashtra, India

---

**Your MySock Next.js app is ready for production! 🎉**
