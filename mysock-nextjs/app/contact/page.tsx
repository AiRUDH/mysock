'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', company: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy to-blue text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-80">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">We respond to all enquiries within one business day.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <h3 className="font-bold text-xl mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-6">
                Whether you have a specific project in mind or are simply exploring what's possible, we're happy to have a conversation.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <a href="mailto:hello@mysock.io" className="font-semibold text-blue hover:underline">
                      hello@mysock.io
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="font-semibold">Within 1 business day</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold">Maharashtra, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-6">Send an Enquiry</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Company / Organisation</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Area of Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <option value="">Select a service area...</option>
                  <option>AI Strategy & Implementation</option>
                  <option>Digital Growth Engineering</option>
                  <option>Business Intelligence & Analytics</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                  placeholder="Tell us about your organisation and what you're looking to achieve..."
                />
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center">
                {submitted ? '✓ Submitted!' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
