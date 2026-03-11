import { useState } from 'react';
import { CheckCircle2, Zap, BarChart3, AlertTriangle, Loader } from 'lucide-react';
import AnalyzerForm from '../components/AnalyzerForm';
import ResultDashboard from '../components/ResultDashboard';

export default function Content() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate data
      if (!data || !data.totalScore) {
        throw new Error('Data tidak valid. Silakan coba lagi.');
      }
      
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div>
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <Loader className="animate-spin mx-auto mb-4 text-primary-500" size={40} />
            <p className="text-xl font-semibold text-gray-900 mb-2">Memproses Data Anda</p>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 m-6 rounded-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-red-800 mb-2">⚠️ Terjadi Kesalahan</h3>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-3 text-red-600 hover:text-red-800 font-semibold underline"
              >
                Tutup pesan ini
              </button>
            </div>
          </div>
        </div>
      )}

      {!results ? (
        <>
          {/* Header Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-500 to-secondary-500 py-10 sm:py-14">
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-10 left-1/3 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest mb-6 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Analizer
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Penganalisis <span className="text-secondary-200">Risiko Kesehatan</span>
              </h1>
              <p className="text-primary-100 text-sm sm:text-base max-w-2xl mx-auto">
                Jawab beberapa pertanyaan sederhana tentang kesehatan dan gaya hidup Anda untuk mendapatkan penilaian risiko yang komprehensif dengan rekomendasi yang dipersonalisasi.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnalyzerForm onSubmit={handleFormSubmit} />

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="card group hover:shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <CheckCircle2 className="text-primary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Rahasia</h3>
                <p className="text-gray-600 text-sm">Data Anda sepenuhnya pribadi dan tidak disimpan di server eksternal</p>
              </div>

              <div className="card group hover:shadow-lg" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <Zap className="text-secondary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hasil Instan</h3>
                <p className="text-gray-600 text-sm">Dapatkan hasil komprehensif dan visualisasi dalam hitungan detik</p>
              </div>

              <div className="card group hover:shadow-lg" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="text-primary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Berbasis Bukti</h3>
                <p className="text-gray-600 text-sm">Berdasarkan pedoman medis dan standar penelitian kesehatan</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-12 flex items-start gap-4">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <p className="text-yellow-800">
                <strong>Penafian Medis:</strong> Alat ini hanya untuk tujuan pendidikan dan informasi. 
                BUKAN merupakan pengganti diagnosis medis profesional, nasihat, atau perawatan dari penyedia layanan kesehatan yang berkualifikasi. 
                Hasil tidak boleh digunakan untuk diagnosis sendiri. Selalu konsultasikan dengan dokter berlisensi untuk masalah kesehatan apa pun.
              </p>
            </div>
          </section>
        </>
      ) : (
        <ResultDashboard results={results} onReset={handleReset} />
      )}
    </div>
  );
}
