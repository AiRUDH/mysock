'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES, CATEGORIES } from '@/lib/services';
import type { Service } from '@/lib/services';

export default function ServicesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      router.push('/auth/google');
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  // Filter logic
  const filteredServices = SERVICES.filter((service) => {
    // Category filter
    const categoryMatch = activeCategory === 'All' || service.category === activeCategory;
    
    // Search filter
    const searchMatch =
      !searchQuery ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Business goals filter
    const goalsMatch = selectedGoals.length === 0 || 
      (service.businessGoal && selectedGoals.some(goal => service.businessGoal?.includes(goal)));
    
    // Rating filter
    const ratingMatch = selectedRatings.length === 0 ||
      selectedRatings.some(minRating => service.rating >= minRating);
    
    // Delivery time filter
    const deliveryMatch = selectedDelivery.length === 0 ||
      (service.deliveryTime && selectedDelivery.some(time => {
        if (time === '1-3 days') return service.deliveryTime?.includes('1-') || service.deliveryTime?.includes('2-') || service.deliveryTime?.includes('3-');
        if (time === '1 week') return service.deliveryTime?.includes('week') || service.deliveryTime?.includes('7');
        if (time === '2-4 weeks') return service.deliveryTime?.includes('14-') || service.deliveryTime?.includes('21-') || service.deliveryTime?.includes('30-');
        return false;
      }));
    
    return categoryMatch && searchMatch && goalsMatch && ratingMatch && deliveryMatch;
  });

  // Sort logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.popularity || 0) - (a.popularity || 0);
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const toggleDelivery = (time: string) => {
    setSelectedDelivery(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">Our Services</h1>
              <p className="text-gray-600">Choose from our comprehensive range of digital solutions</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-800 text-white sticky top-36 z-30">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-white text-gray-900'
                    : 'hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-48">
              <h3 className="font-bold text-lg mb-4">Filters</h3>

              {/* Business Goals */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Business Goals</h4>
                <div className="space-y-2">
                  {['Lead Generation', 'Automation', 'Growth Hacking', 'Brand Building'].map(goal => (
                    <label key={goal} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGoals.includes(goal)}
                        onChange={() => toggleGoal(goal)}
                        className="w-4 h-4 text-blue rounded focus:ring-blue"
                      />
                      <span className="text-sm text-gray-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Ratings</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                        className="w-4 h-4 text-blue rounded focus:ring-blue"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <span className="text-orange-400">{'★'.repeat(rating)}</span>
                        {rating < 5 && ' & up'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Delivery Time</h4>
                <div className="space-y-2">
                  {['1-3 days', '1 week', '2-4 weeks'].map(time => (
                    <label key={time} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDelivery.includes(time)}
                        onChange={() => toggleDelivery(time)}
                        className="w-4 h-4 text-blue rounded focus:ring-blue"
                      />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">{sortedServices.length}</span> services found
              </div>
              
              {/* Mobile Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="lg:hidden px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue"
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
            </div>
            
            {sortedServices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedGoals([]);
                    setSelectedRatings([]);
                    setSelectedDelivery([]);
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-4 btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
