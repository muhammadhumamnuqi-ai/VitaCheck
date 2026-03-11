import { useState, useRef } from 'react';
import { Heart, Target, Lightbulb, Users, CheckCircle2, TrendingUp, Shield, Zap, Award, Compass, AlertCircle } from 'lucide-react';

export default function About() {
  const [innovationActive, setInnovationActive] = useState(0);
  const [valuesActive, setValuesActive] = useState(0);
  const innovationRef = useRef(null);
  const valuesRef = useRef(null);

  const handleScroll = (ref, setActive, count) => {
    const el = ref.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / count;
    const active = Math.min(Math.round(el.scrollLeft / itemWidth), count - 1);
    setActive(active);
  };

  const scrollTo = (ref, index, count) => {
    const el = ref.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / count;
    el.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-500 to-secondary-500 py-10 sm:py-14">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Tentang
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Tentang <span className="text-secondary-200">VitaCheck</span>
          </h1>
          <p className="text-primary-100 text-sm sm:text-base max-w-2xl mx-auto">
            Memberdayakan individu dengan wawasan kesehatan yang cerdas untuk masa depan yang lebih sehat
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Masalah yang Kami Selesaikan</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-primary-500 pl-4 sm:pl-6 py-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                  <AlertCircle className="text-primary-500 flex-shrink-0" size={16} />
                  Kurangnya Kesadaran Kesehatan
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Kebanyakan orang tidak memahami faktor risiko kesehatan mereka sampai terlambat. Kesehatan preventif memerlukan kesadaran.
                </p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-4 sm:pl-6 py-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                  <TrendingUp className="text-secondary-500 flex-shrink-0" size={16} />
                  Penyakit Terkait Gaya Hidup
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Penyakit kronis dari pilihan gaya hidup yang buruk dapat dicegah dengan pengetahuan dan intervensi yang tepat.
                </p>
              </div>
              <div className="border-l-4 border-primary-500 pl-4 sm:pl-6 py-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                  <Lightbulb className="text-primary-500 flex-shrink-0" size={16} />
                  Data Kesehatan Sulit Diakses
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Informasi kesehatan yang kompleks perlu disajikan dengan cara yang mudah dipahami dan dapat ditindaklanjuti.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4 sm:p-6 md:p-8 h-64 sm:h-80 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 sm:w-20 md:w-24 text-primary-500 mx-auto heartbeat mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">Kesadaran kesehatan dimulai dengan memahami risiko Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Solusi Kami</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">VitaCheck memberikan penilaian risiko kesehatan yang cerdas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="card group hover:shadow-lg">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300">
                <Target className="text-primary-500" size={20} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Penilaian Cerdas</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Algoritma kami mengevaluasi berbagai faktor kesehatan termasuk BMI, gaya hidup, riwayat keluarga, dan banyak lagi untuk memberikan penilaian risiko yang komprehensif.
              </p>
            </div>

            <div className="card group hover:shadow-lg" style={{animationDelay: '0.1s'}}>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="text-secondary-500" size={20} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Dashboard Interaktif</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Visualisasikan metrik kesehatan Anda dengan grafik indah dan dashboard yang mudah dipahami yang membantu Anda melacak perjalanan kesehatan Anda.
              </p>
            </div>

            <div className="card group hover:shadow-lg" style={{animationDelay: '0.2s'}}>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300">
                <Lightbulb className="text-primary-500" size={20} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Rekomendasi Personal</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Terima rekomendasi kesehatan yang disesuaikan berdasarkan profil unik Anda, dengan langkah-langkah operasional yang dapat Anda ambil segera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Framework */}
      <section className="bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 py-12 sm:py-16 md:py-20 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Kerangka Inovasi Kami</h2>
            <p className="text-xs sm:text-sm md:text-base text-white/90">INOVASI - Prinsip inti yang mendorong VitaCheck</p>
          </div>

          <div className="relative">
            <div
              ref={innovationRef}
              onScroll={() => handleScroll(innovationRef, setInnovationActive, 5)}
              className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory lg:overflow-visible scrollbar-hide lg:pb-0"
              style={{scrollBehavior: 'smooth'}}
            >
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-7 text-center group hover:bg-white/25 transition-all duration-300 flex-shrink-0 w-full sm:min-w-[280px] lg:w-auto snap-start border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl">
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-125 transition-transform duration-300 group-hover:bg-white/30">
                  <Lightbulb className="text-white" size={22} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Inovasi</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">Memperkenalkan teknologi terkini untuk penilaian kesehatan</p>
              </div>

              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-7 text-center group hover:bg-white/25 transition-all duration-300 flex-shrink-0 w-full sm:min-w-[280px] lg:w-auto snap-start border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-125 transition-transform duration-300 group-hover:bg-white/30">
                  <Compass className="text-white" size={22} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Navigasi</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">Membimbing pengguna melalui informasi kesehatan yang kompleks</p>
              </div>

              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-7 text-center group hover:bg-white/25 transition-all duration-300 flex-shrink-0 w-full sm:min-w-[280px] lg:w-auto snap-start border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-125 transition-transform duration-300 group-hover:bg-white/30">
                  <Zap className="text-white" size={22} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Optimasi</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">Menyempurnakan algoritma dan pengalaman pengguna secara terus-menerus</p>
              </div>

              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-7 text-center group hover:bg-white/25 transition-all duration-300 flex-shrink-0 w-full sm:min-w-[280px] lg:w-auto snap-start border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-125 transition-transform duration-300 group-hover:bg-white/30">
                  <Award className="text-white" size={22} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Validasi</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">Memastikan akurasi dan keandalan dalam penilaian</p>
              </div>

              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-7 text-center group hover:bg-white/25 transition-all duration-300 flex-shrink-0 w-full sm:min-w-[280px] lg:w-auto snap-start border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-125 transition-transform duration-300 group-hover:bg-white/30">
                  <TrendingUp className="text-white" size={22} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Kemajuan</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">Mendorong batas-batas dalam teknologi kesehatan</p>
              </div>
            </div>

            {/* Scroll Dot Indicators - mobile only */}
            <div className="flex lg:hidden justify-center gap-2 mt-5">
              {[0,1,2,3,4].map(i => (
                <button
                  key={i}
                  onClick={() => scrollTo(innovationRef, i, 5)}
                  className={`transition-all duration-300 rounded-full ${
                    innovationActive === i
                      ? 'w-7 h-3 bg-white shadow-lg'
                      : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Lightbulb className="text-primary-500 flex-shrink-0" size={24} />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Visi Kami</h2>
            </div>
            <div className="bg-primary-50 border-2 border-primary-500 rounded-lg p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                Menciptakan dunia di mana setiap individu memiliki akses ke wawasan kesehatan yang cerdas yang memberdayakan mereka untuk membuat keputusan berdasarkan informasi tentang kesejahteraan mereka dan mencegah penyakit terkait gaya hidup melalui kesadaran dan panduan yang dipersonalisasi.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Target className="text-secondary-500 flex-shrink-0" size={24} />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Misi Kami</h2>
            </div>
            <div className="bg-secondary-50 border-2 border-secondary-500 rounded-lg p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                Membangun platform yang didorong oleh teknologi yang mendidik, menganalisis, dan membimbing individu menuju gaya hidup yang lebih sehat dengan memberikan penilaian risiko kesehatan yang akurat, visualisasi data yang bermakna, dan rekomendasi yang dapat ditindaklanjuti berdasarkan sains medis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Nilai-Nilai Inti Kami</h2>
            <p className="text-xs sm:text-sm text-gray-600">Prinsip yang memandu setiap keputusan kami</p>
          </div>

          <div className="relative">
            <div
              ref={valuesRef}
              onScroll={() => handleScroll(valuesRef, setValuesActive, 4)}
              className="flex md:grid md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible scrollbar-hide md:pb-0"
              style={{scrollBehavior: 'smooth'}}
            >
              <div className="card text-center group hover:shadow-xl flex-shrink-0 w-full md:w-auto snap-start bg-white border-2 border-primary-100 hover:border-primary-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl">
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:from-primary-200 group-hover:to-primary-100">
                    <Award className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">Akurasi</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Memberikan penilaian berbasis bukti yang dapat Anda percayai</p>
                </div>
              </div>

              <div className="card text-center group hover:shadow-xl flex-shrink-0 w-full md:w-auto snap-start bg-white border-2 border-secondary-100 hover:border-secondary-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:from-secondary-200 group-hover:to-secondary-100">
                    <Shield className="text-secondary-600" size={24} />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">Privasi</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Melindungi informasi kesehatan pribadi Anda setiap saat</p>
                </div>
              </div>

              <div className="card text-center group hover:shadow-xl flex-shrink-0 w-full md:w-auto snap-start bg-white border-2 border-primary-100 hover:border-primary-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:from-primary-200 group-hover:to-primary-100">
                    <Users className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">Transparansi</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Jelas tentang bagaimana kami menghitung dan menggunakan data</p>
                </div>
              </div>

              <div className="card text-center group hover:shadow-xl flex-shrink-0 w-full md:w-auto snap-start bg-white border-2 border-secondary-100 hover:border-secondary-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:from-secondary-200 group-hover:to-secondary-100">
                    <Heart className="text-secondary-600" size={24} />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">Pemberdayaan</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Memberdayakan Anda untuk mengendalikan kesehatan Anda</p>
                </div>
              </div>
            </div>

            {/* Scroll Dot Indicators - mobile only */}
            <div className="flex md:hidden justify-center gap-2 mt-5">
              {[0,1,2,3].map(i => (
                <button
                  key={i}
                  onClick={() => scrollTo(valuesRef, i, 4)}
                  className={`transition-all duration-300 rounded-full ${
                    valuesActive === i
                      ? 'w-7 h-3 bg-primary-500 shadow-md'
                      : 'w-3 h-3 bg-primary-200 hover:bg-primary-400'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
