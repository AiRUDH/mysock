import Link from 'next/link';

export const metadata = {
  title: 'About Us | MySock',
  description: 'Learn about MySock - our story, team, and approach to digital growth.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy to-blue text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-80">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About MySock</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Our story, our people, and the principles that guide everything we do.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl" />
            <div>
              <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">Our Story</p>
              <h2 className="font-serif text-3xl font-bold mb-4">
                A Company Built on Substance, Not Hype
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MySock was founded with a clear purpose: to help organisations grow through intelligent systems and disciplined execution. We saw too many businesses struggling to translate technology potential into real business outcomes — and we built MySock to close that gap.
                </p>
                <p>
                  Today, we work with companies across industries — from early-stage ventures to established enterprises — bringing the same rigour, transparency, and commitment to every engagement.
                </p>
                <p>
                  We are not a software vendor. We are not a generic consultancy. We are a growth partner — embedded in your goals, accountable to your outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">Our Values</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">The Principles We Work By</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Transparency',
                desc: 'We communicate clearly, report honestly, and never hide behind jargon. You always know where things stand.',
              },
              {
                title: 'Accountability',
                desc: "We own our commitments. If something isn't working, we say so and fix it — not make excuses.",
              },
              {
                title: 'Rigour',
                desc: 'Every recommendation we make is backed by data, research, and structured thinking — not intuition alone.',
              },
              {
                title: 'Long-Term Thinking',
                desc: 'We optimise for sustainable outcomes, not short-term wins that create problems down the line.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-blue font-bold text-sm uppercase tracking-wider mb-2">By the Numbers</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Track Record</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { num: '340+', label: 'Clients Served' },
              { num: '$2.4B', label: 'Revenue Influenced' },
              { num: '98%', label: 'Client Retention' },
              { num: '8+', label: 'Years in Operation' },
              { num: '24', label: 'Countries Reached' },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-4xl font-bold text-blue mb-2">{metric.num}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Want to Know More?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Speak with our team and learn how MySock can support your organisation's growth objectives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-white">
              Contact Us
            </Link>
            <Link href="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-navy">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
