# 🚀 MySock Next.js - Quick Start Guide

## Step 1: Install Dependencies

```bash
cd mysock-nextjs
npm install
```

## Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 3: Test the Application

### Homepage
- Visit `http://localhost:3000`
- See hero section, stats, testimonials
- Click "Explore Our Services"

### Authentication Flow
1. Click "Sign In" or "Services"
2. Auto-redirects to `/auth/google`
3. Demo login (1 second)
4. Redirects to `/services`

### Services Page (Protected)
- Browse 12 services
- Filter by category
- Search services
- Click service card → detail page

### Service Detail Page
- View full service info
- Add to cart
- Get on WhatsApp

### Shopping Cart
- Click "Cart" in navbar
- View items
- Update quantities
- Checkout on WhatsApp

## 🎯 Key Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Homepage | No |
| `/about` | About page | No |
| `/services` | Services listing | Yes |
| `/services/[id]` | Service detail | Yes |
| `/cart` | Shopping cart | Yes |
| `/contact` | Contact form | No |
| `/vision` | Vision & Mission | No |
| `/work` | Portfolio | No |
| `/auth/google` | Auth page | No |

## 🔐 Authentication

Demo mode uses localStorage:
- Key: `auth`
- Value: `"true"`

To logout:
- Click "Sign Out" in navbar
- Clears localStorage
- Redirects to homepage

## 🛒 Cart Management

Cart stored in localStorage:
- Key: `mysock_cart`
- Value: JSON array of cart items

Functions available:
- `addToCart(service)`
- `removeFromCart(serviceId)`
- `updateQuantity(serviceId, quantity)`
- `clearCart()`
- `getCartTotal()`
- `getCartCount()`

## 📱 WhatsApp Integration

Update number in `lib/whatsapp.ts`:

```typescript
const WA_NUMBER = '919999999999'; // Your number
```

## 🎨 Customize Services

Edit `lib/services.ts`:

```typescript
export const SERVICES: Service[] = [
  {
    id: 1,
    category: 'Development',
    title: 'Your Service',
    desc: 'Description',
    price: '₹9,999',
    priceRaw: 9999,
    rating: 4.8,
    reviews: 312,
    badge: 'bestseller',
    icon: '🌐',
    deliveryTime: '7-14 days',
    features: ['Feature 1', 'Feature 2'],
  },
  // Add more services...
];
```

## 🚀 Build for Production

```bash
npm run build
npm run start
```

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🐛 Common Issues

### Port 3000 in use
```bash
npx kill-port 3000
npm run dev
```

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
npm run lint
```

## 📚 Next Steps

1. ✅ Test all pages
2. ✅ Customize services data
3. ✅ Update WhatsApp number
4. ✅ Add your branding
5. ✅ Deploy to Vercel
6. 🔄 Integrate real Google Auth (NextAuth.js)
7. 🔄 Connect MongoDB
8. 🔄 Add payment gateway

## 🎉 You're Ready!

Your MySock Next.js application is now running!

Visit: [http://localhost:3000](http://localhost:3000)
