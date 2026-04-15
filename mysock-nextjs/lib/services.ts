export interface Service {
  id: number;
  category: string;
  title: string;
  desc: string;
  rating: number;
  reviews: number;
  badge: 'bestseller' | 'recommended' | 'popular';
  icon: string;
  deliveryTime?: string;
  features?: string[];
  businessGoal?: string[];
  popularity?: number;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    category: 'Development',
    title: 'Custom Website Development',
    desc: 'Fully responsive, SEO-optimised website built from scratch with modern stack.',
    rating: 4.8,
    reviews: 312,
    badge: 'bestseller',
    icon: '🌐',
    deliveryTime: '7-14 days',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern Stack'],
    businessGoal: ['Lead Generation', 'Brand Building'],
    popularity: 95,
  },
  {
    id: 2,
    category: 'Development',
    title: 'E-commerce Store Setup',
    desc: 'Complete online store with payment gateway, inventory & order management.',
    rating: 4.7,
    reviews: 198,
    badge: 'recommended',
    icon: '🛒',
    deliveryTime: '14-21 days',
    features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Panel'],
    businessGoal: ['Lead Generation', 'Growth Hacking'],
    popularity: 88,
  },
  {
    id: 3,
    category: 'Marketing',
    title: 'Social Media Marketing',
    desc: 'Monthly content calendar, creatives & ad management across all platforms.',
    rating: 4.6,
    reviews: 445,
    badge: 'popular',
    icon: '📣',
    deliveryTime: 'Monthly',
    features: ['Content Calendar', 'Creative Design', 'Ad Management', 'Analytics'],
    businessGoal: ['Brand Building', 'Lead Generation'],
    popularity: 92,
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Google Ads Campaign',
    desc: 'Targeted PPC campaigns with keyword research, A/B testing & weekly reports.',
    rating: 4.5,
    reviews: 267,
    badge: 'bestseller',
    icon: '📈',
    deliveryTime: '3-5 days',
    features: ['Keyword Research', 'A/B Testing', 'Weekly Reports', 'ROI Tracking'],
    businessGoal: ['Lead Generation', 'Growth Hacking'],
    popularity: 85,
  },
  {
    id: 5,
    category: 'Automation',
    title: 'Business Process Automation',
    desc: 'Automate repetitive workflows using Zapier, Make or custom scripts.',
    rating: 4.9,
    reviews: 134,
    badge: 'recommended',
    icon: '⚙️',
    deliveryTime: '5-10 days',
    features: ['Workflow Automation', 'Integration Setup', 'Custom Scripts', 'Documentation'],
    businessGoal: ['Automation', 'Growth Hacking'],
    popularity: 90,
  },
  {
    id: 6,
    category: 'Automation',
    title: 'WhatsApp Business Automation',
    desc: 'Auto-replies, broadcast lists, chatbot flows & CRM integration.',
    rating: 4.7,
    reviews: 389,
    badge: 'popular',
    icon: '💬',
    deliveryTime: '3-7 days',
    features: ['Auto-replies', 'Broadcast Lists', 'Chatbot Flows', 'CRM Integration'],
    businessGoal: ['Automation', 'Lead Generation'],
    popularity: 87,
  },
  {
    id: 7,
    category: 'E-commerce',
    title: 'Amazon / Flipkart Listing',
    desc: 'Optimised product listings with SEO titles, bullet points & A+ content.',
    rating: 4.6,
    reviews: 521,
    badge: 'bestseller',
    icon: '📦',
    deliveryTime: '2-4 days',
    features: ['SEO Titles', 'Bullet Points', 'A+ Content', 'Image Optimization'],
    businessGoal: ['Lead Generation', 'Brand Building'],
    popularity: 93,
  },
  {
    id: 8,
    category: 'E-commerce',
    title: 'D2C Brand Launch Package',
    desc: 'End-to-end D2C setup: store, branding, ads & first 100 orders strategy.',
    rating: 4.8,
    reviews: 87,
    badge: 'recommended',
    icon: '🚀',
    deliveryTime: '21-30 days',
    features: ['Store Setup', 'Branding', 'Ad Campaigns', 'Growth Strategy'],
    businessGoal: ['Brand Building', 'Growth Hacking'],
    popularity: 89,
  },
  {
    id: 9,
    category: 'Consulting',
    title: 'Growth Strategy Session',
    desc: '90-minute 1:1 strategy call with actionable roadmap for your business.',
    rating: 5.0,
    reviews: 203,
    badge: 'popular',
    icon: '🎯',
    deliveryTime: '1-2 days',
    features: ['1:1 Session', 'Actionable Roadmap', 'Follow-up Support', 'Recording'],
    businessGoal: ['Growth Hacking'],
    popularity: 94,
  },
  {
    id: 10,
    category: 'Consulting',
    title: 'AI Integration Consulting',
    desc: 'Identify & implement AI tools that save time and cut operational costs.',
    rating: 4.9,
    reviews: 76,
    badge: 'recommended',
    icon: '🤖',
    deliveryTime: '7-14 days',
    features: ['AI Assessment', 'Tool Selection', 'Implementation', 'Training'],
    businessGoal: ['Automation', 'Growth Hacking'],
    popularity: 91,
  },
  {
    id: 11,
    category: 'Development',
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS & Android app with clean UI and backend integration.',
    rating: 4.7,
    reviews: 112,
    badge: 'bestseller',
    icon: '📱',
    deliveryTime: '30-45 days',
    features: ['Cross-platform', 'Clean UI', 'Backend Integration', 'App Store Submission'],
    businessGoal: ['Brand Building', 'Lead Generation'],
    popularity: 86,
  },
  {
    id: 12,
    category: 'Marketing',
    title: 'SEO Optimisation Package',
    desc: 'On-page, off-page & technical SEO to rank on Google page 1 in 90 days.',
    rating: 4.5,
    reviews: 334,
    badge: 'popular',
    icon: '🔍',
    deliveryTime: '90 days',
    features: ['On-page SEO', 'Off-page SEO', 'Technical SEO', 'Monthly Reports'],
    businessGoal: ['Lead Generation', 'Brand Building'],
    popularity: 88,
  },
];

export const CATEGORIES = [
  'All',
  'Development',
  'Marketing',
  'Automation',
  'E-commerce',
  'Consulting',
];

export function getServiceById(id: number): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'All') return SERVICES;
  return SERVICES.filter((s) => s.category === category);
}
