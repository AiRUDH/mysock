import Link from 'next/link';

export const metadata = {
  title: 'Vision & Mission | MySock',
  description: 'Our vision and mission at MySock - building the future of digital growth.',
};

export default function VisionPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-navy to-blue text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-80">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Vision & Mission</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Vision & Mission</h1>
          <p className="text-xl text-gray-200">Our direction and purpose</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To become the most trusted digital growth partner for organisations seeking to harness the power of artificial intelligence and data-driven strategy.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue">•</span>
                  <span>Democratising access to enterprise-grade AI</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue">•</span>
                  <span>Building systems that scale with your ambition</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue">•</span>
                  <span>Creating lasting competitive advantages</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue text-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-6 leading-relaxed opacity-95">
                To deliver structured, measurable, and sustainable growth solutions by combining deep technical expertise with strategic business insight.
              </p>
              <ul className="space-y-3 opacity-95">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Structured delivery with clear accountability</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Measurable outcomes at every engagement stage</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Long-term partnerships over transactional work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's discuss how we can help your organisation achieve its growth objectives.
          </p>
          <Link href="/contact" className="btn btn-white inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
