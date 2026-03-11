import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ChevronDown, Send, AlertCircle } from 'lucide-react';

function FloatField({ label, name, type = 'text', value, onChange, onBlur, error, placeholder, focused, setFocused }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={(e) => { setFocused(null); onBlur && onBlur(e); }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 bg-white ${
          error
            ? 'border-red-300 focus:ring-red-200'
            : focused === name
            ? 'border-primary-400 focus:ring-primary-100'
            : 'border-gray-200 hover:border-gray-300 focus:ring-primary-100'
        }`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sendError, setSendError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [focused, setFocused] = useState(null);

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email diperlukan';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid';
    if (!email.toLowerCase().endsWith('@gmail.com')) return 'Gunakan alamat Gmail (@gmail.com)';
    return '';
  };

  const handleEmailBlur = (e) => {
    const err = validateEmail(e.target.value);
    setErrors(prev => ({ ...prev, email: err }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama diperlukan';
    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;
    if (!formData.message.trim()) newErrors.message = 'Pesan diperlukan';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSendError('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || '(Tidak ada subjek)',
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setSendError('Gagal mengirim pesan. Pastikan konfigurasi EmailJS sudah benar.');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { href: 'mailto:info@vitacheck.com', icon: Mail,   label: 'Email',      value: 'info@vitacheck.com',                      iconColor: 'text-primary-500' },
    { href: 'tel:+1234567890',           icon: Phone,  label: 'Telepon',    value: '+1 (234) 567-890',                          iconColor: 'text-secondary-500' },
    { icon: MapPin, label: 'Alamat',     value: 'Jl. Kesehatan 123, Jakarta, Indonesia',     iconColor: 'text-violet-500' },
    { icon: Clock,  label: 'Jam Kerja',  value: 'Sen–Jum 09.00–18.00 · Sab 10.00–16.00',    iconColor: 'text-orange-500' },
  ];

  const socials = [
    { label: 'Facebook', char: 'f',  cls: 'hover:bg-blue-500 hover:text-white hover:border-blue-500' },
    { label: 'X',        char: '𝕏', cls: 'hover:bg-gray-800 hover:text-white hover:border-gray-800' },
    { label: 'LinkedIn', char: 'in', cls: 'hover:bg-sky-600  hover:text-white hover:border-sky-600'  },
    { label: 'Instagram',char: '◈', cls: 'hover:bg-pink-500 hover:text-white hover:border-pink-500' },
  ];

  const faqs = [
    { q: 'Apakah VitaCheck adalah alat diagnosis medis?', a: 'Tidak. VitaCheck hanya alat edukasi dan kesadaran kesehatan, bukan pengganti diagnosis dokter.' },
    { q: 'Apakah data saya disimpan?', a: 'Tidak. Semua data diproses di perangkat Anda dan tidak disimpan di server manapun.' },
    { q: 'Seberapa akurat alat ini?', a: 'VitaCheck menggunakan model berbasis bukti medis sebagai panduan umum. Untuk saran personal, konsultasikan dengan dokter.' },
    { q: 'Bisakah digunakan untuk anggota keluarga?', a: 'Bisa, selama data yang dimasukkan akurat. Gunakan dengan bimbingan orang tua untuk anak-anak.' },
    { q: 'Seberapa sering harus digunakan?', a: 'Disarankan setiap 3–6 bulan, terutama setelah perubahan gaya hidup untuk melihat perkembangan.' },
    { q: 'Apakah gratis?', a: 'Sepenuhnya gratis. Kami percaya semua orang berhak mendapat akses informasi kesehatan.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-500 to-secondary-500 py-10 sm:py-14">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Kontak
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Hubungi <span className="text-secondary-200">Kami</span>
          </h1>
          <p className="text-primary-100 text-sm sm:text-base max-w-md mx-auto">
            Ada pertanyaan? Kami siap membantu dan akan merespons dalam <strong className="text-white">24 jam</strong>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-3">
            {contacts.map(({ href, icon: Icon, value, iconColor }) => {
              const Wrapper = href ? 'a' : 'div';
              return (
                <Wrapper key={value} {...(href ? { href } : {})}
                  className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <Icon size={22} className={`flex-shrink-0 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{value}</p>
                </Wrapper>
              );
            })}

            {/* Sosial */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[11px] uppercase font-semibold tracking-widest text-gray-400 mb-4">Ikuti Kami</p>
              <div className="grid grid-cols-4 gap-2">
                {socials.map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className={`h-11 rounded-xl flex items-center justify-center text-sm font-bold border border-gray-200 text-gray-500 transition-all duration-200 hover:scale-110 hover:shadow-md ${s.cls}`}>
                    {s.char}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3" style={{animationDelay: '0.1s'}}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Kirim Pesan</h2>
                <p className="text-xs text-gray-400 mt-1">Semua kolom bertanda * wajib diisi</p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-800">Pesan berhasil dikirim! 🎉</p>
                    <p className="text-xs text-green-600 mt-0.5">Kami akan menghubungi Anda secepatnya.</p>
                  </div>
                </div>
              )}

              {sendError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle size={16} className="text-red-600" />
                  </div>
                  <p className="text-sm text-red-700">{sendError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatField label="Nama Lengkap *" name="name" value={formData.name}
                    onChange={handleChange} error={errors.name} placeholder="Nama Anda"
                    focused={focused} setFocused={setFocused} />
                  <FloatField label="Email * (Gmail)" name="email" type="email" value={formData.email}
                    onChange={handleChange} onBlur={handleEmailBlur} error={errors.email} placeholder="anda@gmail.com"
                    focused={focused} setFocused={setFocused} />
                </div>
                <FloatField label="Subjek" name="subject" value={formData.subject}
                  onChange={handleChange} placeholder="Topik pesan Anda"
                  focused={focused} setFocused={setFocused} />
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Pesan *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4"
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    placeholder="Tuliskan pesan Anda..."
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 bg-white resize-none ${
                      errors.message ? 'border-red-300 focus:ring-red-200'
                      : focused === 'message' ? 'border-primary-400 focus:ring-primary-100'
                      : 'border-gray-200 hover:border-gray-300 focus:ring-primary-100'
                    }`} />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : <span />}
                    <p className="text-xs text-gray-300">{formData.message.length} karakter</p>
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-200 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-widest mb-2">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-primary-200 shadow-md' : 'border-gray-100 bg-white shadow-sm'}`}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-gray-50/80 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-sm font-semibold text-gray-800">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-primary-500 text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
