import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy-dark to-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-custom relative z-10 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="text-accent font-semibold mb-4">Trusted by 340+ Companies Worldwide</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Accelerating Business Growth<br />Through Intelligent Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              MySock partners with organisations to design, deploy, and scale AI-driven systems that deliver measurable results — faster, smarter, and with lasting impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-white">
                Get Started
              </Link>
              <Link href="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-navy">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">Who We Are</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              A Growth Partner Built for the Modern Enterprise
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-gray-700 leading-relaxed">
            <p>
              MySock is a digital growth and AI solutions company working with businesses across industries to build scalable systems, automate operations, and unlock new revenue streams. We combine strategic thinking with technical execution to deliver outcomes that matter.
            </p>
            <p>
              Founded on the belief that every organisation deserves access to world-class intelligence, we bring enterprise-grade capabilities to companies of all sizes — from ambitious startups to established institutions.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { num: '340+', label: 'Clients Served' },
              { num: '12x', label: 'Average Growth' },
              { num: '98%', label: 'Retention Rate' },
              { num: '8+', label: 'Years of Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue mb-2">{stat.num}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">Our Direction</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Our Vision</h3>
              <p className="text-gray-700 mb-4">
                To become the most trusted digital growth partner for organisations seeking to harness the power of artificial intelligence and data-driven strategy.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Democratising access to enterprise-grade AI</li>
                <li>• Building systems that scale with your ambition</li>
                <li>• Creating lasting competitive advantages</li>
              </ul>
            </div>
            <div className="bg-blue text-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Our Mission</h3>
              <p className="mb-4">
                To deliver structured, measurable, and sustainable growth solutions by combining deep technical expertise with strategic business insight.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Structured delivery with clear accountability</li>
                <li>• Measurable outcomes at every engagement stage</li>
                <li>• Long-term partnerships over transactional work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="section-pad bg-navy text-white">
        <div className="container-custom text-center">
          <p className="text-accent font-bold text-sm uppercase tracking-wider mb-2">Our Services</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Solutions for Every Stage of Growth
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            From AI strategy and implementation to full-scale digital transformation — our services are structured to deliver results at every stage of your business journey.
          </p>
          <Link href="/services" className="btn btn-white inline-flex">
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">Client Feedback</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "MySock transformed how we approach data. Their team didn't just deliver a product — they changed how our entire organisation thinks about decision-making.",
                author: 'Rajiv Kumar',
                role: 'Chief Operating Officer, Meridian Group',
                avatar: 'RK',
              },
              {
                quote: 'Working with MySock felt like having a world-class internal team. They understood our business deeply and delivered a platform that has become central to our operations.',
                author: 'Sarah Lim',
                role: 'Head of Technology, Vantage Retail',
                avatar: 'SL',
              },
              {
                quote: 'The growth strategy MySock developed for us was grounded in real data, clearly structured, and the execution support made all the difference.',
                author: 'Arjun Mehta',
                role: 'Founder & CEO, Scalepath Ventures',
                avatar: 'AM',
              },
            ].map((testimonial) => (
              <div key={testimonial.author} className="bg-gray-50 p-6 rounded-xl">
                <div className="text-4xl text-blue mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue text-white rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Speak with our team and find out how MySock can help your organisation grow with clarity, confidence, and the right technology behind you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-white">
              Schedule a Consultation
            </Link>
            <Link href="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-navy">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
