import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Zap, Home, Info, Activity, Mail } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Beranda', icon: Home, color: 'text-blue-500' },
  { to: '/about', label: 'Tentang', icon: Info, color: 'text-cyan-500' },
  { to: '/content', label: 'Analizer', icon: Activity, color: 'text-teal-500' },
  { to: '/contact', label: 'Kontak', icon: Mail, color: 'text-emerald-500' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/60 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/40'
          : 'bg-white/20 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
              <img
                src="/vite%20logo.png"
                alt="VitaCheck"
                className="relative h-9 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onMouseEnter={() => setActiveHover(i)}
                  onMouseLeave={() => setActiveHover(null)}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group"
                >
                  {/* Hover bg */}
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                      isActive ? 'bg-primary-500/10' : 'bg-transparent group-hover:bg-white/50'
                    }`}
                  />
                  {/* Label */}
                  <span
                    className={`relative flex items-center gap-1.5 transition-colors duration-200 ${
                      isActive ? 'text-primary-700 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
                    }`}
                  >
                    <link.icon size={14} className={`flex-shrink-0 ${link.color}`} />
                    {link.label}
                  </span>
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ${
                      isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-60'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/content"
              className="hidden md:flex items-center justify-center gap-2 group relative px-7 py-2.5 rounded-full overflow-hidden z-10 font-bold"
            >
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500" />
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
              <Zap size={16} className="relative text-white group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
              <span className="relative text-white text-sm tracking-wide">Mulai Sekarang</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-white/50 transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/30 rounded-lg transition-colors duration-200" />
              <span className="relative block transition-transform duration-300" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/40 backdrop-blur-xl border-t border-white/30 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                <link.icon size={16} className={`flex-shrink-0 ${link.color}`} />
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/content"
            onClick={() => setIsOpen(false)}
            className="group relative flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl overflow-hidden text-white font-bold"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
            <Zap size={16} className="relative group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative text-sm tracking-wide">Mulai Sekarang</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
