# VitaCheck – Web Interaktif Health Risk Analyzer

## 🏥 Deskripsi Proyek

VitaCheck adalah aplikasi web modern yang dirancang untuk memberikan analisis risiko kesehatan yang komprehensif dan interaktif. Dengan menggunakan teknologi terdepan, VitaCheck membantu pengguna memahami faktor risiko kesehatan mereka dan memberikan rekomendasi personal yang dapat ditindaklanjuti.

**Disclaimer**: VitaCheck adalah alat edukasi dan informasi. Bukan pengganti untuk diagnosis medis profesional. Selalu konsultasikan dengan profesional kesehatan untuk kekhawatiran kesehatan apa pun.

## ✨ Fitur Utama

- **🎯 Smart Health Risk Assessment**: Evaluasi komprehensif dari berbagai faktor kesehatan termasuk BMI, gaya hidup, riwayat keluarga, dan pola tidur
- **📊 Interactive Dashboard**: Visualisasi data yang indah menggunakan Recharts dengan chart pie dan radar
- **💡 Personalized Recommendations**: Rekomendasi khusus berdasarkan profil kesehatan unik pengguna
- **🔄 Lifestyle Simulation**: Fitur "What If" untuk melihat bagaimana perubahan gaya hidup mempengaruhi skor risiko
- **📱 Fully Responsive**: Desain mobile-first yang sempurna di semua perangkat
- **⚡ Smooth Animations**: Animasi ringan untuk meningkatkan user experience
- **🎨 Modern UI**: Desain profesional dengan Tailwind CSS menggunakan warna biru primer dan hijau sekunder

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 4.5.0
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6.20.0
- **Charting**: Recharts
- **Fonts**: Poppins & Inter (Google Fonts)
- **Language**: JavaScript (JSX)

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi utama
│   ├── Footer.jsx          # Footer dengan disclaimer dan links
│   ├── Hero.jsx            # Hero section di home page
│   ├── AnalyzerForm.jsx    # Form input untuk health analysis
│   ├── ResultDashboard.jsx # Dashboard hasil analisis
│   └── Charts.jsx          # Komponen visualisasi data
├── pages/
│   ├── Home.jsx            # Home page dengan features dan CTA
│   ├── About.jsx           # About page dengan visi & misi
│   ├── Content.jsx         # Analyzer page (main feature)
│   └── Contact.jsx         # Contact & FAQ page
├── utils/
│   └── riskCalculator.js   # Logika perhitungan risiko kesehatan
├── App.jsx                 # Main app dengan routing
├── App.css                 # Custom styles
├── index.css               # Tailwind directives & global styles
└── main.jsx                # Entry point
```

## 🚀 Cara Memulai

### Prerequisites
- Node.js v18.8.0 atau lebih tinggi
- npm atau yarn

### Installation

1. **Clone atau buka project**:
   ```bash
   cd vitacheck_1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5173/`

4. **Build untuk production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📖 Halaman & Fitur

### 1. Home Page (`/`)
- Hero section dengan headline "Know Your Health Risk in Minutes"
- 3 feature cards (Fast Assessment, Data Visualization, Personalized Insights)
- How It Works section (3 langkah proses)
- CTA section (Analyze Now)
- Stats section
- Footer dengan disclaimer medis

### 2. About Page (`/about`)
- Problem Statement: Kurangnya kesadaran kesehatan preventif
- Our Solution: Smart Risk Scoring, Interactive Dashboard, Personalized Recommendations
- Innovation Framework: INNOVATE concept
  - **I**mpel Novelty
  - **N**avigate
  - **O**ptimize
  - **V**alidate
  - **A**te
- Vision & Mission statements
- Core Values (Accuracy, Privacy, Transparency, Empowerment)

### 3. Content Page (`/content`) - Main Feature
- **Analyzer Form** dengan input:
  - Full Name
  - Age (18-120)
  - Gender (Male/Female/Other)
  - Weight (kg)
  - Height (cm)
  - Daily Sleep Duration (hours)
  - Smoking status (Yes/No)
  - Exercise frequency (Rare/Moderate/Regular)
  - Family history of chronic disease (Yes/No)

- **Result Dashboard** menampilkan:
  - Risk Level Card (dengan gradient color sesuai level)
  - BMI Result dan Status
  - Total Risk Score (dengan counter animation)
  - BMI Composition Pie Chart
  - Lifestyle Factors Radar Chart
  - Risk Score Breakdown (6 komponen dengan progress bar)
  - Personalized Recommendations (up to 9 cards)
  - What If Scenario: Simulasi pengaruh exercise reguler
  - Medical disclaimer

### 4. Contact Page (`/contact`)
- Contact form (Name, Email, Message)
- Contact information (Email, Phone, Address, Business Hours)
- Social media links
- FAQ Section (6 pertanyaan umum)
  - Apakah VitaCheck alat diagnosis medis?
  - Apakah data saya tersimpan?
  - Seberapa akurat tool ini?
  - Bisakah digunakan untuk anggota keluarga?
  - Seberapa sering harus mengambil assessment?
  - Apakah ada biaya?

## 🔢 Logika Perhitungan

### BMI Calculation
```
BMI = weight (kg) / (height (cm) / 100)²

Kategori:
- < 18.5: Underweight
- 18.5 - 24.9: Normal
- 25 - 29.9: Overweight
- ≥ 30: Obese
```

### Risk Scoring System
```
Skor Komponen:
- Overweight (BMI 25-29.9): +2
- Obese (BMI ≥ 30): +4
- Smoking: +3
- Rare exercise: +2
- Age > 40: +2
- Family history: +3
- Sleep < 6 hours: +2

Klasifikasi:
- 0-3: Low Risk (Hijau)
- 4-7: Medium Risk (Kuning)
- 8+: High Risk (Merah)
```

## 🎨 Warna & Design

### Palet Warna
- **Primary Blue**: #1E88E5
- **Secondary Green**: #43A047
- **White/Light Gray**: #FFFFFF / #F9FAFB
- **Dark Gray**: #1F2937

### Typography
- Font Family: Poppins, Inter
- Headings: Bold (600-700 weight)
- Body: Regular (400 weight)

### Komponen UI
- Card Layout: rounded-lg dengan shadow-soft
- Buttons: rounded-lg dengan hover effects
- Inputs: border-gray-300 dengan focus ring primary-500
- Spacing: Tailwind default (p-4, p-6, p-8, etc)

## ✨ Fitur Khusus

### 1. Form Validation
- Input validation untuk semua field
- Error messages yang jelas
- Prevention dari data invalid

### 2. Loading Animation
- Spinner loading saat proses analisis
- Smooth transition ke hasil dashboard

### 3. Counter Animation
- Animasi angka naik untuk Risk Score dan BMI
- Duration 1.5 detik

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: md (768px), lg (1024px)
- Touch-friendly interface

### 5. Interactive Charts
- Recharts Pie Chart untuk BMI
- Recharts Radar Chart untuk Lifestyle Factors
- Responsive container

## 📋 Requirements Terpenuhi

✅ React Router untuk navigasi (4 halaman wajib: Home, About, Content, Contact)
✅ Component-based architecture (Navbar, Footer, Hero, AnalyzerForm, ResultDashboard, Charts)
✅ Logic perhitungan di utils terpisah (riskCalculator.js)
✅ Chart.js/Recharts untuk visualisasi (Pie Chart & Radar Chart)
✅ Animasi ringan (fadeIn, slideUp, counter-animate, pulse-slow)
✅ Warna utama: Primary Blue (#1E88E5) dan Secondary Green (#43A047)
✅ Font modern: Poppins dan Inter
✅ Card layout rounded-lg dengan shadow
✅ Disclaimer medis di multiple pages
✅ Responsive design
✅ Clean & professional UI

## 🐛 Troubleshooting

### Dev Server tidak berjalan
- Pastikan Node.js versi 18.8.0 atau lebih tinggi
- Jalankan `npm install` kembali
- Hapus `node_modules` dan `package-lock.json`, lalu `npm install` lagi

### Styling tidak muncul
- Restart dev server
- Bersihkan browser cache
- Pastikan Tailwind CSS telah dikonfigurasi di `tailwind.config.js`

### Chart tidak tampil
- Pastikan Recharts sudah terinstall: `npm install recharts`
- Check browser console untuk error messages

## 📊 Performance Tips

- Production build dioptimalkan dengan Vite
- Code splitting otomatis untuk route-based chunks
- Image optimization (gunakan modern formats)
- Lazy loading untuk heavy components

## 📄 License

Proyek ini dibuat untuk keperluan edukasi dan demonstrasi.

## 👨‍💻 Pengembang

VitaCheck adalah aplikasi web modern untuk kesadaran kesehatan berbasis teknologi.

---

**Terakhir diupdate**: 26 Februari 2026

Untuk bantuan atau pertanyaan, silakan hubungi melalui page Contact.

