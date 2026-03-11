import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            {/* Brand Column */}
            <div>
              <div className="mb-3 sm:mb-4">
                <img src="/vite%20logo.png" alt="VitaCheck Logo" className="h-10 sm:h-14 w-auto object-contain" />
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-medium">
                Platform pemeriksaan kesehatan untuk wawasan kesehatan lebih baik.
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">
                  <Mail size={14} className="sm:size-[16px] flex-shrink-0" />
                  <a href="mailto:info@vitacheck.com" className="truncate">info@vitacheck.com</a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">
                  <Phone size={14} className="sm:size-[16px] flex-shrink-0" />
                  <a href="tel:+62123456789">+62 123 456 789</a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                  <MapPin size={14} className="sm:size-[16px] flex-shrink-0" />
                  <span>Jakarta, ID</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">Menu Cepat</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {[
                  { label: 'Beranda', to: '/' },
                  { label: 'Tentang Kami', to: '/about' },
                  { label: 'Analizer', to: '/content' },
                  { label: 'Kontak', to: '/contact' }
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">Sumber Daya</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {[
                  'Panduan Kesehatan',
                  'Artikel Blog',
                  'FAQ',
                  'Dukungan'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">Ikuti Kami</h4>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Instagram, label: 'Instagram' }
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-colors flex items-center justify-center"
                    title={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-4 sm:pt-6 text-center text-gray-400 text-xs">
            <p>© {currentYear} VitaCheck</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
