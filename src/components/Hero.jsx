import { Link } from 'react-router-dom';
import { Activity, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/latar%20belakang.png)',
          filter: 'brightness(0.95) contrast(1.05)',
        }}
      ></div>
      
      {/* Light Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-transparent"></div>

      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary-300/15 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Headline with Creative Effects */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900 animate-slideUp" style={{animationDelay: '0.1s'}}>
                  Jaga Kesehatan
                </span>
                <span className="block text-gray-900 animate-slideUp" style={{animationDelay: '0.2s'}}>
                  Anda dengan
                </span>
                <span 
                  className="block animate-slideUp relative inline-block"
                  style={{animationDelay: '0.3s'}}
                >
                  <span className="relative z-10 text-primary-700">Lebih Baik</span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-primary-300 to-secondary-300 opacity-30 rounded-full blur-sm"></span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg font-medium animate-fadeIn" style={{animationDelay: '0.4s'}}>
                Periksa kesehatan Anda dan dapatkan panduan lengkap dari dokter profesional untuk hidup lebih sehat.
              </p>
            </div>

            {/* CTA Buttons with Enhanced Effects */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fadeIn" style={{animationDelay: '0.5s'}}>
              <Link
                to="/content"
                className="group relative bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></span>
                
                {/* Gradient Overlay on Hover */}
                <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                <Activity size={18} className="relative z-10 group-hover:animate-bounce" style={{animationDelay: '0'}} />
                <span className="relative z-10">Mulai Sekarang</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                
                {/* Bottom Shadow Glow */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-primary-400 to-primary-600 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <button className="group relative border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:text-primary-700 overflow-hidden">
                {/* Background Fill */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                
                {/* Border Animation */}
                <span className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-border p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                
                <span className="relative z-10">Pelajari Lebih</span>
              </button>
            </div>

            {/* Features Grid - Enhanced */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div 
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md overflow-hidden cursor-pointer animate-fadeIn"
                style={{animationDelay: '0.6s'}}
              >
                {/* Gradient Background Overlay on Hover */}
                <span className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                
                {/* Border Glow */}
                <span className="absolute inset-0 rounded-xl border-2 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                <div className="flex items-start gap-3 relative z-10">
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-all duration-300 group-hover:scale-110">
                    <CheckCircle size={24} className="text-primary-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-primary-700 transition-colors">Konsultasi Dokter</p>
                    <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">Profesional</p>
                  </div>
                </div>
              </div>

              <div 
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md overflow-hidden cursor-pointer animate-fadeIn"
                style={{animationDelay: '0.7s'}}
              >
                {/* Gradient Background Overlay on Hover */}
                <span className="absolute inset-0 bg-gradient-to-br from-secondary-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                
                {/* Border Glow */}
                <span className="absolute inset-0 rounded-xl border-2 border-secondary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                <div className="flex items-start gap-3 relative z-10">
                  <div className="p-2 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-all duration-300 group-hover:scale-110">
                    <TrendingUp size={24} className="text-secondary-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-secondary-700 transition-colors">Aman & Terpercaya</p>
                    <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">Hasil jelas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Doctor Image - Enhanced */}
          <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end animate-slideUp" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full max-w-sm lg:max-w-md group">
              {/* Multi-layer Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary-400/30 via-secondary-400/20 to-primary-400/30 rounded-3xl blur-3xl -z-10 animate-float group-hover:from-primary-400/50 group-hover:via-secondary-400/40 group-hover:to-primary-400/50 transition-all duration-500"></div>

              <div className="absolute -inset-5 bg-gradient-to-br from-primary-300/40 to-secondary-300/40 rounded-3xl blur-2xl -z-10 group-hover:from-primary-300/60 group-hover:to-secondary-300/60 transition-all duration-500"></div>

              {/* Floating Accent Elements */}
              <div className="absolute -top-14 -right-8 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-12 -left-8 w-36 h-36 bg-secondary-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

              {/* Sparkle Elements */}
              <div className="absolute top-10 right-10 animate-bounce" style={{animationDelay: '0s'}}>
                <Sparkles size={20} className="text-primary-400 opacity-60" />
              </div>
              <div className="absolute bottom-20 right-5 animate-bounce" style={{animationDelay: '1s'}}>
                <Sparkles size={16} className="text-secondary-400 opacity-60" />
              </div>

              {/* Doctor Image */}
              <img 
                src="/dokter.png" 
                alt="Professional Doctor" 
                className="relative w-full h-auto rounded-3xl shadow-2xl border-4 border-white backdrop-blur-sm group-hover:shadow-4xl transition-all duration-500 group-hover:scale-105 object-cover"
              />

              {/* Animated Bottom Info Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-primary-600 animate-spin" style={{animationDuration: '2s'}} />
                  <p className="text-sm font-bold text-gray-900">Pemeriksaan Profesional</p>
                </div>
                <p className="text-xs text-gray-600">Dipandu dokter berpengalaman</p>
              </div>

              {/* Animated Border Ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              {/* Top Accent Bar */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-3/4 bg-gradient-to-r from-transparent via-primary-400 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
