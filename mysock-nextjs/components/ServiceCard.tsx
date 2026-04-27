'use client';

import Link from 'next/link';
import { Service } from '@/lib/services';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { addToCart } from '@/lib/cart';
import { useState } from 'react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [added, setAdded] = useState(false);

  const badgeStyles = {
    bestseller: 'bg-orange-500 text-white',
    recommended: 'bg-blue text-white',
    popular: 'bg-purple-600 text-white',
  };

  const handleAddToCart = () => {
    addToCart(service);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(getWhatsAppLink(service.title), '_blank');
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    return (
      <div className="flex items-center gap-0.5 text-orange-400 text-lg">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span className="text-gray-300">{'☆'.repeat(empty)}</span>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Image/Icon - Larger */}
      <Link href={`/services/${service.id}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center text-8xl cursor-pointer group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all" />
          <span className="relative z-10">{service.icon}</span>
        </div>
      </Link>

      {/* Content - More Padding */}
      <div className="p-6 flex flex-col flex-1">
        {/* Badge */}
        <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 self-start ${badgeStyles[service.badge]}`}>
          {service.badge === 'bestseller' && 'Best Seller'}
          {service.badge === 'recommended' && 'Recommended'}
          {service.badge === 'popular' && 'Most Popular'}
        </span>

        {/* Title - Larger */}
        <Link href={`/services/${service.id}`}>
          <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 hover:text-blue transition cursor-pointer leading-tight">
            {service.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
          {service.desc}
        </p>

        {/* Rating - Larger */}
        <div className="flex items-center gap-2 mb-4">
          {renderStars(service.rating)}
          <span className="font-semibold text-lg">{service.rating}</span>
          <span className="text-gray-500 text-sm">({service.reviews})</span>
        </div>

        {/* Pricing Info - Replaced */}
        <div className="mb-5 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
          <div className="text-lg font-bold text-blue-600 mb-1">Custom Pricing Available</div>
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call: 8057470837</span>
          </div>
        </div>

        {/* Actions - Larger Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 px-5 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-base"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.762.896.952-3.668-.242-.378A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Get on WhatsApp
          </button>
          
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 px-5 rounded-xl font-semibold transition-all duration-200 text-base ${
              added
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
          <div>📧 info.mysock@zohomail.in</div>
        </div>
      </div>
    </div>
  );
}
