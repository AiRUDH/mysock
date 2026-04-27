# MySock - Next.js Application

Modern, dynamic Next.js application for MySock - Digital Growth & AI Solutions.

## 🚀 Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Dynamic Services System
- ✅ Shopping Cart (localStorage)
- ✅ Google Authentication (Demo)
- ✅ WhatsApp Integration
- ✅ Protected Routes
- ✅ Responsive Design
- ✅ SEO Optimized

## 📁 Project Structure

```
mysock-nextjs/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── about/page.tsx           # About page
│   ├── services/
│   │   ├── page.tsx             # Services listing (protected)
│   │   └── [id]/page.tsx        # Service detail page
│   ├── cart/page.tsx            # Shopping cart
│   ├── contact/page.tsx         # Contact form
│   ├── vision/page.tsx          # Vision & Mission
│   ├── work/page.tsx            # Portfolio
│   └── auth/
│       └── google/page.tsx      # Google auth (demo)
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   └── ServiceCard.tsx          # Service card component
├── lib/
│   ├── services.ts              # Services data & functions
│   ├── cart.ts                  # Cart management
│   └── whatsapp.ts              # WhatsApp integration
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Steps

1. **Navigate to project directory:**
   ```bash
   cd mysock-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔐 Authentication Flow

1. User clicks "Services" or "Sign In"
2. If not authenticated → redirect to `/auth/google`
3. Demo login (auto-login after 1 second)
4. Sets `localStorage.setItem('auth', 'true')`
5. Redirects to `/services`

### Production Setup

For production, replace demo auth with:
- **NextAuth.js** (recommended)
- **Firebase Authentication**
- **Auth0**

## 🛒 Shopping Cart

- Stored in `localStorage`
- Add/remove items
- Update quantities
- Checkout via WhatsApp

## 📱 WhatsApp Integration

Update WhatsApp number in `lib/whatsapp.ts`:

```typescript
const WA_NUMBER = '919999999999'; // Replace with your number
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  navy: {
    DEFAULT: '#0f2a5e',
    dark: '#091d42',
  },
  blue: {
    DEFAULT: '#1a4fa0',
    light: '#2563c4',
  },
  accent: '#e8a020',
}
```

### Services Data

Edit `lib/services.ts` to add/modify services.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

```bash
npm run build
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_WA_NUMBER=919999999999
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📊 MongoDB Integration (Future)

To connect MongoDB:

1. Install Mongoose (already in package.json)
2. Create `/lib/mongodb.ts`
3. Add connection string to `.env.local`
4. Create API routes in `/app/api/`

Example:

```typescript
// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}
```

## 🔧 Backend API (Optional)

Create API routes in `app/api/`:

```typescript
// app/api/orders/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // Save to MongoDB
  return NextResponse.json({ success: true });
}
```

## 📝 SEO

Each page has metadata:

```typescript
export const metadata = {
  title: 'Page Title | MySock',
  description: 'Page description',
};
```

## 🎯 Key Features Implemented

✅ Homepage with hero, stats, testimonials
✅ Services page (protected, requires login)
✅ Dynamic service detail pages (`/services/[id]`)
✅ Shopping cart with localStorage
✅ WhatsApp integration for orders
✅ Google auth demo (ready for production auth)
✅ Responsive navbar with mobile menu
✅ Footer with links
✅ About, Contact, Vision, Work pages
✅ Tailwind CSS styling
✅ TypeScript for type safety

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### Clear cache

```bash
rm -rf .next
npm run dev
```

## 📞 Support

For issues or questions:
- Email: hello@mysock.io
- Location: Maharashtra, India

## 📄 License

© 2026 MySock. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
