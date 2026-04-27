'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Simulate Google login (demo mode)
    // In production, integrate with NextAuth.js or Firebase Auth
    
    const handleLogin = () => {
      // Set auth in localStorage
      localStorage.setItem('auth', 'true');
      localStorage.setItem('mysock_user', JSON.stringify({
        id: 'google-demo',
        name: 'Demo User',
        email: 'demo@mysock.io',
        picture: 'https://ui-avatars.com/api/?name=Demo+User&background=1a4fa0&color=fff',
      }));

      // Redirect to services or intended page
      const redirect = searchParams.get('redirect') || '/services';
      router.push(redirect);
    };

    // Auto-login after 1 second (demo)
    const timer = setTimeout(handleLogin, 1000);
    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-blue">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
          M
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Welcome to MySock</h1>
        <p className="text-gray-600 mb-8">Signing you in with Google...</p>
        
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
        </div>

        <p className="text-sm text-gray-500 mt-8">
          This is a demo authentication flow.<br />
          In production, this would use Google OAuth.
        </p>
      </div>
    </div>
  );
}
