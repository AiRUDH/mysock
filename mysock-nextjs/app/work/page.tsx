import Link from 'next/link';

export const metadata = {
  title: 'Our Work | MySock',
  description: 'Projects, case studies, and client engagements from MySock.',
};

export default function WorkPage() {
  const projects = [
    {
      category: 'AI Implementation',
      title: 'Automated Operations Platform',
      desc: 'End-to-end automation for a logistics company, reducing manual processing by 74% and cutting operational costs by 38%.',
    },
    {
      category: 'Growth Strategy',
      title: 'Market Expansion Programme',
      desc: 'Data-driven expansion strategy that opened 3 new markets within 18 months, generating $12M in new annual revenue.',
    },
    {
      category: 'Digital Transformation',
      title: 'Enterprise Platform Rebuild',
      desc: 'Full modernisation of a legacy enterprise system serving 50,000+ users, reducing load times by 80%.',
    },
    {
      category: 'Business Intelligence',
      title: 'Real-Time Analytics Dashboard',
      desc: 'Custom BI platform delivering live insights across 12 business units, replacing 6 disconnected reporting tools.',
    },
    {
      category: 'AI Strategy',
      title: 'Predictive Revenue Modelling',
      desc: 'AI-powered forecasting system with 91% accuracy across quarterly projections, adopted by the CFO's office.',
    },
    {
      category: 'Infrastructure',
      title: 'Cloud Migration & Scaling',
      desc: 'Seamless migration to cloud infrastructure supporting 10x traffic growth with zero downtime during transition.',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-navy to-blue text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-80">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Our Work</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-200">
            A selection of projects and engagements across industries and disciplines.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-105 transition-transform duration-300" />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue/10 text-blue text-xs font-semibold rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Want to Discuss a Project?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Tell us about your challenge and we'll outline how we would approach it.
          </p>
          <Link href="/contact" className="btn btn-white inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
