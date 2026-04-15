import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="font-bold text-lg">MySock</div>
                <div className="text-xs text-gray-400">Digital Growth & AI Solutions</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping organisations grow through intelligent systems, strategic clarity, and disciplined execution.
            </p>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/vision" className="text-gray-400 hover:text-white transition">Vision & Mission</Link></li>
              <li><Link href="/work" className="text-gray-400 hover:text-white transition">Our Work</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-bold mb-4">Services</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">AI & Automation</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Growth Strategy</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Digital Transformation</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Business Intelligence</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:8057470837" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  8057470837
                </a>
              </li>
              <li>
                <a href="mailto:info.mysock@zohomail.in" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info.mysock@zohomail.in
                </a>
              </li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Book a Consultation</Link></li>
              <li className="text-gray-400">Maharashtra, India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 MySock. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
