'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check auth status
    const auth = localStorage.getItem('auth');
    setIsLoggedIn(auth === 'true');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/vision', label: 'Vision & Mission' },
    { href: '/work', label: 'Our Work' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('mysock_user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="container-custom flex justify-between items-center">
          <span>Upgrading our platform for a better experience — stay tuned.</span>
          <div className="hidden md:flex gap-4 items-center">
            <a href="tel:8057470837" className="hover:text-accent transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8057470837
            </a>
            <span>|</span>
            <a href="mailto:info.mysock@zohomail.in" className="hover:text-accent transition">info.mysock@zohomail.in</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-blue rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-light transition">
                M
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-navy">MySock</div>
                <div className="text-xs text-gray-600">Digital Growth & AI Solutions</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? 'text-blue bg-blue/5'
                      : 'text-gray-700 hover:text-blue hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link href="/cart" className="btn btn-secondary text-sm">
                    Cart
                  </Link>
                  <button onClick={handleSignOut} className="btn btn-outline text-sm">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/auth/google" className="btn btn-primary text-sm">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-gray-900 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-gray-900 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-gray-900 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container-custom py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? 'text-blue bg-blue/5'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link href="/cart" className="btn btn-secondary w-full">
                      Cart
                    </Link>
                    <button onClick={handleSignOut} className="btn btn-outline w-full">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth/google" className="btn btn-primary w-full">
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
