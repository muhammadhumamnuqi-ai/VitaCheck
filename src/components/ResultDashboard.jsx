import { useState, useEffect } from 'react';
import Charts from './Charts';
import { calculateRiskScore, getRecommendations } from '../utils/riskCalculator';
import { AlertCircle, CheckCircle2, Info, TrendingUp, Activity, Heart, Zap, ChevronDown, ArrowRight, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

export default function ResultDashboard({ results, onReset, onSimulate }) {
  const [simulatedResults, setSimulatedResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCard, setExpandedCard] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Validate results
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Tidak Valid</h2>
          <p className="text-gray-600 mb-6">Mohon isi form kembali dan coba lagi.</p>
          <button onClick={onReset} className="btn-primary">Kembali ke Form</button>
        </div>
      </div>
    );
  }

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Low Risk': return { bg: 'from-green-500 to-emerald-600', text: 'text-white', badge: 'bg-green-100 text-green-700' };
      case 'Medium Risk': return { bg: 'from-amber-500 to-orange-600', text: 'text-white', badge: 'bg-amber-100 text-amber-700' };
      case 'High Risk': return { bg: 'from-red-500 to-rose-600', text: 'text-white', badge: 'bg-red-100 text-red-700' };
      default: return { bg: 'from-blue-500 to-cyan-600', text: 'text-white', badge: 'bg-blue-100 text-blue-700' };
    }
  };

  const getRiskEmoji = (riskLevel) => {
    switch(riskLevel) {
      case 'Low Risk': return '✅';
      case 'Medium Risk': return '⚠️';
      case 'High Risk': return '🔴';
      default: return '❓';
    }
  };

  const handleSimulate = () => {
    const simulatedData = {
      ...results,
      exerciseFrequency: 'regular'
    };
    const newRisk = calculateRiskScore(simulatedData);
    const updated = { ...simulatedData, ...newRisk };
    setSimulatedResults(updated);
    onSimulate?.(updated);
  };

  const handleDownloadPDF = () => {
    try {
      setIsDownloading(true);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 10;
      const lineHeight = 7;
      const margin = 10;
      
      // Title
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Laporan Penilaian Risiko Kesehatan', margin, yPosition, {maxWidth: pageWidth - 2*margin});
      
      yPosition += lineHeight + 2;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`VitaCheck - Sistem Penilaian Kesehatan Cerdas`, margin, yPosition, {maxWidth: pageWidth - 2*margin});
      yPosition += lineHeight + 1;
      pdf.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, margin, yPosition);
      
      yPosition += lineHeight + 5;
      pdf.setDrawColor(0);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
      
      // Personal Data Section
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.text('Data Pribadi', margin, yPosition);
      yPosition += lineHeight + 2;
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      
      const personalData = [
        ['Nama', displayResults.name || '-'],
        ['Usia', `${displayResults.age} tahun`],
        ['Jenis Kelamin', displayResults.gender === 'male' ? 'Laki-laki' : 'Perempuan'],
        ['Berat Badan', `${displayResults.weight} kg`],
        ['Tinggi Badan', `${displayResults.height} cm`],
        ['BMI', `${Math.round(displayResults.bmi * 10) / 10} (${displayResults.category})`]
      ];
      
      personalData.forEach(row => {
        pdf.setFont(undefined, 'bold');
        pdf.text(row[0] + ':', margin, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(row[1], margin + 45, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += 3;
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
      
      // Health Assessment
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.text('Hasil Penilaian Kesehatan', margin, yPosition);
      yPosition += lineHeight + 2;
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const riskLabel = displayResults.riskLevel === 'Low Risk' ? 'Risiko Rendah' :
                       displayResults.riskLevel === 'Medium Risk' ? 'Risiko Sedang' :
                       'Risiko Tinggi';
      pdf.text(`Tingkat Risiko: ${riskLabel}`, margin, yPosition);
      yPosition += lineHeight;
      pdf.text(`Skor Total: ${displayResults.totalScore} / 20`, margin, yPosition);
      
      yPosition += 3;
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
      
      // Risk Factors
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.text('Rincian Faktor Risiko', margin, yPosition);
      yPosition += lineHeight + 2;
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'bold');
      pdf.text('Faktor', margin, yPosition);
      pdf.text('Skor', margin + 100, yPosition);
      pdf.text('Status', margin + 125, yPosition);
      yPosition += lineHeight;
      
      const factors = [
        ['Berat Badan', displayResults.breakdown.bmiScore || 0, displayResults.category],
        ['Status Merokok', displayResults.breakdown.smokingScore || 0, displayResults.smoking === 'yes' ? 'Ya' : 'Tidak'],
        ['Aktivitas Fisik', displayResults.breakdown.exerciseScore || 0, displayResults.exerciseFrequency === 'rare' ? 'Jarang' : displayResults.exerciseFrequency === 'moderate' ? 'Sedang' : 'Teratur'],
        ['Tidur', displayResults.breakdown.sleepScore || 0, `${displayResults.sleepDuration}j`],
        ['Usia', displayResults.breakdown.ageScore || 0, `${displayResults.age}th`],
        ['Riwayat Keluarga', displayResults.breakdown.familyHistoryScore || 0, displayResults.familyHistory === 'yes' ? 'Ya' : 'Tidak']
      ];
      
      pdf.setFont(undefined, 'normal');
      factors.forEach(factor => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 10;
        }
        pdf.text(factor[0], margin, yPosition);
        pdf.text(String(factor[1]), margin + 100, yPosition);
        pdf.text(String(factor[2]), margin + 125, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += 3;
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 10;
      }
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
      
      // Recommendations
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.text('Rekomendasi Kesehatan', margin, yPosition);
      yPosition += lineHeight + 2;
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      const recommendations = getRecommendations(displayResults).slice(0, 5);
      
      recommendations.forEach((rec, idx) => {
        if (yPosition > pageHeight - 25) {
          pdf.addPage();
          yPosition = 10;
        }
        
        pdf.setFont(undefined, 'bold');
        pdf.text(`${idx + 1}. ${rec.title}`, margin, yPosition);
        yPosition += lineHeight;
        
        pdf.setFont(undefined, 'normal');
        const descLines = pdf.splitTextToSize(rec.description, pageWidth - 2*margin - 5);
        descLines.forEach(line => {
          if (yPosition > pageHeight - 15) {
            pdf.addPage();
            yPosition = 10;
          }
          pdf.text(line, margin + 3, yPosition);
          yPosition += lineHeight;
        });
        yPosition += 1;
      });
      
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 10;
      }
      
      yPosition += 2;
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
      
      // Disclaimer
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'bold');
      pdf.text('Catatan Penting', margin, yPosition);
      yPosition += lineHeight;
      
      pdf.setFont(undefined, 'normal');
      const disclaimerText = pdf.splitTextToSize(
        'Penilaian ini hanya untuk tujuan informasi dan tidak boleh dianggap sebagai saran medis profesional. Selalu konsultasikan dengan profesional kesehatan yang berkualifikasi untuk diagnosis dan pengobatan kondisi kesehatan Anda.',
        pageWidth - 2*margin
      );
      
      disclaimerText.forEach(line => {
        if (yPosition > pageHeight - 10) {
          pdf.addPage();
          yPosition = 10;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      // Footer
      pdf.setFontSize(8);
      pdf.text(`© ${new Date().getFullYear()} VitaCheck - Sistem Penilaian Risiko Kesehatan Cerdas`, pageWidth/2, pageHeight - 5, {align: 'center'});
      
      // Save PDF
      const fileName = `VitaCheck_Hasil_${(displayResults.name || 'Anda').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      alert('PDF berhasil diunduh!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Gagal membuat PDF: ${error.message || 'Silakan coba lagi.'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const displayResults = simulatedResults || results;
  
  if (!displayResults || !displayResults.breakdown) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-6">Data hasil analisis tidak lengkap. Mohon coba lagi dari awal.</p>
          <button onClick={onReset} className="btn-primary">Kembali ke Form</button>
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations(displayResults);
  const colors = getRiskColor(displayResults.riskLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dengan Risk Level Besar */}
        <div className={`bg-gradient-to-br ${colors.bg} rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 fade-in relative overflow-hidden`}>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 opacity-10">
            <Heart className="w-40 h-40 text-white" />
          </div>

          <div className="relative z-10">
            <p className="text-white/80 text-lg mb-2">Halo, <span className="font-bold">{displayResults.name}</span>! 👋</p>
            
            <div className="flex items-center justify-between mb-8 flex-col lg:flex-row gap-6">
              <div>
                <p className="text-white/70 text-sm mb-2">TINGKAT RISIKO KESEHATAN ANDA</p>
                <h1 className={`text-5xl lg:text-6xl font-bold ${colors.text} mb-4 flex items-center gap-3`}>
                  {getRiskEmoji(displayResults.riskLevel)} {displayResults.riskLevel}
                </h1>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Skor Risiko</p>
                  <p className="text-4xl font-bold"><AnimatedCounter value={displayResults.totalScore} /> / 20</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-white/70 text-sm">BMI</p>
                <p className="text-2xl font-bold text-white"><AnimatedCounter value={Math.round(displayResults.bmi * 10) / 10} /></p>
                <p className="text-xs text-white/60 mt-1">{displayResults.category}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-white/70 text-sm">Usia</p>
                <p className="text-2xl font-bold text-white">{displayResults.age}</p>
                <p className="text-xs text-white/60 mt-1">tahun</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-white/70 text-sm">Status</p>
                <p className="text-2xl font-bold text-white">{displayResults.gender === 'male' ? '👨' : '👩'}</p>
                <p className="text-xs text-white/60 mt-1 capitalize">{displayResults.gender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'details'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📈 Detail
          </button>
          <button
            onClick={() => setActiveTab('action')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'action'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎯 Aksi
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 fade-in">
            {/* Risk Explanation */}
            <div className={`${
              displayResults.riskLevel === 'Low Risk' ? 'bg-green-50 border-green-200 border-l-green-500' :
              displayResults.riskLevel === 'Medium Risk' ? 'bg-amber-50 border-amber-200 border-l-amber-500' :
              'bg-red-50 border-red-200 border-l-red-500'
            } border-l-4 rounded-xl p-6 shadow-sm`}>
              <h3 className={`text-lg font-bold mb-2 ${
                displayResults.riskLevel === 'Low Risk' ? 'text-green-800' :
                displayResults.riskLevel === 'Medium Risk' ? 'text-amber-800' :
                'text-red-800'
              }`}>
                {displayResults.riskLevel === 'Low Risk' && '✅ Risiko Kesehatan Rendah'}
                {displayResults.riskLevel === 'Medium Risk' && '⚠️ Risiko Kesehatan Sedang'}
                {displayResults.riskLevel === 'High Risk' && '🔴 Risiko Kesehatan Tinggi'}
              </h3>
              <p className={`${
                displayResults.riskLevel === 'Low Risk' ? 'text-green-700' :
                displayResults.riskLevel === 'Medium Risk' ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {displayResults.riskLevel === 'Low Risk' && 'Kondisi kesehatan Anda sangat baik. Teruskan gaya hidup sehat yang sudah Anda jalani!'}
                {displayResults.riskLevel === 'Medium Risk' && 'Ada beberapa area yang perlu ditingkatkan. Dengan perubahan kecil tapi konsisten, Anda bisa mengurangi risiko.'}
                {displayResults.riskLevel === 'High Risk' && 'Beberapa faktor risiko serius terdeteksi. Segera konsultasi dengan dokter dan mulai ubah gaya hidup.'}
              </p>
            </div>

            {/* Charts */}
            <Charts data={displayResults} />
          </div>
        )}

        {/* TAB 2: DETAIL FAKTOR RISIKO */}
        {activeTab === 'details' && (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Faktor-Faktor Risiko Anda</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* BMI */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Status Berat Badan</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.category}</p>
                  </div>
                  <span className="text-2xl font-bold text-primary-500">{displayResults.breakdown.bmiScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-primary-50 p-3 rounded-lg">
                  {displayResults.breakdown.bmiScore === 0 && "✅ Berat badan ideal. Pertahankan!"}
                  {displayResults.breakdown.bmiScore === 2 && "⚠️ Sedikit berlebih. Mulai olahraga dan kurangi kalori."}
                  {displayResults.breakdown.bmiScore === 4 && "🔴 Jauh di atas ideal. Segera konsultasi ahli gizi."}
                </div>
              </div>

              {/* Smoking */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Status Merokok</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.smoking === 'yes' ? 'Perokok' : 'Tidak Merokok'}</p>
                  </div>
                  <span className="text-2xl font-bold text-orange-500">{displayResults.breakdown.smokingScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                  {displayResults.breakdown.smokingScore === 0 && "✅ Pilihan kesehatan terbaik!"}
                  {displayResults.breakdown.smokingScore === 3 && "🔴 Sangat berisiko. Harus berhenti sekarang."}
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Aktivitas Fisik</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.exerciseFrequency === 'rare' ? 'Jarang' : displayResults.exerciseFrequency === 'moderate' ? 'Sedang' : 'Teratur'}</p>
                  </div>
                  <span className="text-2xl font-bold text-green-500">{displayResults.breakdown.exerciseScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                  {displayResults.breakdown.exerciseScore === 0 && "✅ Cukup aktif. Bagus!"}
                  {displayResults.breakdown.exerciseScore === 1 && "⚠️ Tingkatkan ke 150 menit/minggu."}
                  {displayResults.breakdown.exerciseScore === 2 && "🔴 Terlalu sedikit gerak. Mulai dari 30 menit/hari."}
                </div>
              </div>

              {/* Sleep */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Kualitas Tidur</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.sleepDuration} jam/malam</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-500">{displayResults.breakdown.sleepScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                  {displayResults.breakdown.sleepScore === 0 && "✅ Durasi tidur ideal."}
                  {displayResults.breakdown.sleepScore === 2 && "⚠️ Kurang tidur. Target 7-9 jam."}
                </div>
              </div>

              {/* Age */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Usia</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.age} tahun</p>
                  </div>
                  <span className="text-2xl font-bold text-purple-500">{displayResults.breakdown.ageScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                  {displayResults.breakdown.ageScore === 0 && "✅ Mulai sekarang untuk kesehatan jangka panjang."}
                  {displayResults.breakdown.ageScore === 2 && "⚠️ Check-up rutin makin penting."}
                </div>
              </div>

              {/* Family History */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Riwayat Keluarga</h3>
                    <p className="text-sm text-gray-600 mt-1">{displayResults.familyHistory === 'yes' ? 'Ada' : 'Tidak ada'}</p>
                  </div>
                  <span className="text-2xl font-bold text-red-500">{displayResults.breakdown.familyHistoryScore || 0}</span>
                </div>
                <div className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">
                  {displayResults.breakdown.familyHistoryScore === 0 && "✅ Tidak ada riwayat penyakit."}
                  {displayResults.breakdown.familyHistoryScore === 3 && "🔴 Screening rutin sangat penting."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACTION PLAN */}
        {activeTab === 'action' && (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Rencana Aksi Anda</h2>
            
            {/* What If Scenario */}
            {!simulatedResults && (
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200 mb-6">
                <h3 className="font-bold text-primary-900 mb-3 flex items-center gap-2">
                  <Zap size={20} /> Coba Scenario
                </h3>
                <p className="text-gray-700 mb-4 text-sm">Lihat berapa skor bisa berkurang jika Anda olahraga teratur (4+ x/minggu)</p>
                <button 
                  onClick={handleSimulate}
                  className="btn-primary text-sm"
                >
                  Simulasi Sekarang
                </button>
              </div>
            )}

            {simulatedResults && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <p className="font-bold text-green-800 text-sm">✨ Hasil Simulasi: Skor Anda bisa turun dari {results.totalScore} menjadi {simulatedResults.totalScore}!</p>
                </div>
              </div>
            )}

            {/* Recommendations Simple Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.slice(0, 6).map((rec, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 border-primary-500"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12 pb-12 flex-wrap">
          <button onClick={onReset} className="btn-primary flex items-center gap-2">
            <ArrowRight size={18} /> Analisis Lagi
          </button>
          <button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} /> {isDownloading ? 'Membuat PDF...' : 'Simpan Hasil (PDF)'}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
          <p className="text-blue-800 text-sm">
            <strong>⚕️ Catatan Penting:</strong> Penilaian ini untuk informasi saja. BUKAN pengganti konsultasi dokter. 
            Selalu konsultasikan hasil dengan profesional kesehatan untuk diagnosis dan perawatan.
          </p>
        </div>
      </div>
    </div>
  );
}
