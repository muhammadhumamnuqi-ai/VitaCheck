import { useState } from 'react';
import { calculateBMI, calculateRiskScore } from '../utils/riskCalculator';
import { AlertCircle, Loader } from 'lucide-react';

export default function AnalyzerForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    smoking: 'no',
    exerciseFrequency: 'moderate',
    sleepDuration: '',
    familyHistory: 'no'
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nama adalah wajib diisi';
    if (!formData.age || formData.age < 18 || formData.age > 120) newErrors.age = 'Usia harus antara 18 dan 120 tahun';
    if (!formData.weight || formData.weight <= 0) newErrors.weight = 'Berat badan harus lebih dari 0';
    if (!formData.height || formData.height <= 0) newErrors.height = 'Tinggi badan harus lebih dari 0';
    if (!formData.sleepDuration || formData.sleepDuration <= 0 || formData.sleepDuration > 24) newErrors.sleepDuration = 'Durasi tidur harus antara 0 dan 24 jam';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bmiInfo = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
    const riskInfo = calculateRiskScore({
      ...formData,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      sleepDuration: parseFloat(formData.sleepDuration),
      bmi: bmiInfo.bmi
    });

    const results = {
      ...formData,
      ...bmiInfo,
      ...riskInfo
    };

    setLoading(false);
    onSubmit(results);
  };

  const inputClass = (field) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors bg-white ${
      errors[field] ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
    }`;

  const selectClass =
    'w-full px-3 py-2.5 text-sm border border-gray-200 hover:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors bg-white appearance-none cursor-pointer';

  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );

  const SelectWrap = ({ children }) => (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 max-w-2xl mx-auto slide-up">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Analisis Risiko Kesehatan</h2>
      <p className="text-xs text-gray-400 mb-6">Lengkapi data berikut untuk mendapatkan penilaian kesehatan Anda</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
        <Field label="Nama Lengkap *" error={errors.name}>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className={`${inputClass('name')} col-span-2`} placeholder="Nama Anda" />
        </Field>
        <Field label="Usia *" error={errors.age}>
          <input type="number" name="age" value={formData.age} onChange={handleChange}
            className={inputClass('age')} placeholder="Tahun" min="18" max="120" />
        </Field>
        <Field label="Jenis Kelamin *">
          <SelectWrap>
            <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
              <option value="other">Lainnya</option>
            </select>
          </SelectWrap>
        </Field>
      </div>

      <div className="h-px bg-gray-100 my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <Field label="Berat Badan (kg) *" error={errors.weight}>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange}
            className={inputClass('weight')} placeholder="kg" step="0.1" min="0" />
        </Field>
        <Field label="Tinggi Badan (cm) *" error={errors.height}>
          <input type="number" name="height" value={formData.height} onChange={handleChange}
            className={inputClass('height')} placeholder="cm" step="0.1" min="0" />
        </Field>
        <Field label="Tidur / Hari (jam) *" error={errors.sleepDuration}>
          <input type="number" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange}
            className={inputClass('sleepDuration')} placeholder="jam" step="0.5" min="0" max="24" />
        </Field>
        <Field label="Merokok? *">
          <SelectWrap>
            <select name="smoking" value={formData.smoking} onChange={handleChange} className={selectClass}>
              <option value="no">Tidak</option>
              <option value="yes">Ya</option>
            </select>
          </SelectWrap>
        </Field>
        <Field label="Olahraga *">
          <SelectWrap>
            <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className={selectClass}>
              <option value="rare">Jarang</option>
              <option value="moderate">2–3x/minggu</option>
              <option value="regular">4+x/minggu</option>
            </select>
          </SelectWrap>
        </Field>
        <Field label="Riwayat Penyakit Keluarga *">
          <SelectWrap>
            <select name="familyHistory" value={formData.familyHistory} onChange={handleChange} className={selectClass}>
              <option value="no">Tidak Ada</option>
              <option value="yes">Ada</option>
            </select>
          </SelectWrap>
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full btn-primary font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
          loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'
        }`}
      >
        {loading ? (
          <><Loader className="animate-spin" size={15} /> Menganalisis...</>
        ) : 'Analisis Kesehatan Saya'}
      </button>
    </form>
  );
}
