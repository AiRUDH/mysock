'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getServiceById } from '@/lib/services';
import { addToCart } from '@/lib/cart';
import { getWhatsAppLink } from '@/lib/whatsapp';
import type { Service } from '@/lib/services';

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      router.push('/auth/google');
      return;
    }

    // Get service
    const id = parseInt(params.id as string);
    const foundService = getServiceById(id);
    
    if (!foundService) {
      router.push('/services');
      return;
    }

    setService(foundService);
    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
      <div className="flex items-center gap-0.5 text-orange-400 text-2xl">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span className="text-gray-300">{'☆'.repeat(empty)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue">Services</Link>
            <span>/</span>
            <span className="text-gray-900">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image & Details */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl aspect-square flex items-center justify-center text-9xl mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10" />
              <span className="relative z-10">{service.icon}</span>
            </div>
            
            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div>
            {/* Badge */}
            <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wide mb-4 ${badgeStyles[service.badge]}`}>
              {service.badge === 'bestseller' && 'Best Seller'}
              {service.badge === 'recommended' && 'Recommended'}
              {service.badge === 'popular' && 'Most Popular'}
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl font-bold text-navy mb-4">
              {service.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              {renderStars(service.rating)}
              <span className="text-xl font-semibold">{service.rating}</span>
              <span className="text-gray-600">({service.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {service.desc}
            </p>

            {/* Category & Delivery */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="ml-2 font-semibold">{service.category}</span>
              </div>
              {service.deliveryTime && (
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Delivery:</span>
                  <span className="ml-2 font-semibold">{service.deliveryTime}</span>
                </div>
              )}
            </div>

            {/* Pricing Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm mb-6 border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">Custom Pricing Available</div>
              <p className="text-sm text-gray-600 mb-4">
                Get a personalized quote based on your specific requirements. Our team will provide detailed pricing after understanding your needs.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Contact Us:</div>
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">8057470837</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">info.mysock@zohomail.in</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.762.896.952-3.668-.242-.378A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Get Service on WhatsApp
              </button>
              
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 text-lg ${
                  added
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Back Link */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue hover:text-blue-light mt-6"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
