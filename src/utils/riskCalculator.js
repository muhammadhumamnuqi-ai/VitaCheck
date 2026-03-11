/**
 * Calculate BMI from weight and height
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {Object} BMI value and category
 */
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = '';
  if (bmi < 18.5) {
    category = 'Berat Badan Kurang';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Berat Badan Berlebih';
  } else {
    category = 'Obesitas';
  }
  
  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category
  };
};

/**
 * Calculate health risk score based on various factors
 * @param {Object} data - Health data object
 * @returns {Object} Risk score and classification
 */
export const calculateRiskScore = (data) => {
  let score = 0;
  const breakdown = {};
  
  // BMI scoring
  const bmi = data.bmi || calculateBMI(data.weight, data.height).bmi;
  breakdown.bmiSCore = 0;
  if (bmi >= 25 && bmi < 30) {
    score += 2;
    breakdown.bmiScore = 2;
  } else if (bmi >= 30) {
    score += 4;
    breakdown.bmiScore = 4;
  }
  
  // Smoking
  breakdown.smokingScore = 0;
  if (data.smoking === 'yes') {
    score += 3;
    breakdown.smokingScore = 3;
  }
  
  // Exercise frequency
  breakdown.exerciseScore = 0;
  if (data.exerciseFrequency === 'rare') {
    score += 2;
    breakdown.exerciseScore = 2;
  }
  
  // Age
  breakdown.ageScore = 0;
  if (data.age > 40) {
    score += 2;
    breakdown.ageScore = 2;
  }
  
  // Family history
  breakdown.familyHistoryScore = 0;
  if (data.familyHistory === 'yes') {
    score += 3;
    breakdown.familyHistoryScore = 3;
  }
  
  // Sleep duration
  breakdown.sleepScore = 0;
  if (data.sleepDuration < 6) {
    score += 2;
    breakdown.sleepScore = 2;
  }
  
  // Risk classification
  let riskLevel = '';
  let riskColor = '';
  
  if (score <= 3) {
    riskLevel = 'Low Risk';
    riskColor = 'green';
  } else if (score <= 7) {
    riskLevel = 'Medium Risk';
    riskColor = 'yellow';
  } else {
    riskLevel = 'High Risk';
    riskColor = 'red';
  }
  
  return {
    totalScore: score,
    riskLevel,
    riskColor,
    breakdown
  };
};

/**
 * Get personalized recommendations based on risk factors
 * @param {Object} data - Health data object
 * @returns {Array} Array of recommendations
 */
export const getRecommendations = (data) => {
  const recommendations = [];
  
  // BMI-based recommendations
  const bmiInfo = calculateBMI(data.weight, data.height);
  if (bmiInfo.category === 'Berat Badan Berlebih' || bmiInfo.category === 'Obesitas') {
    recommendations.push({
      title: 'Manajemen Berat Badan',
      description: 'Pertahankan diet yang sehat dan terlibat dalam aktivitas fisik yang teratur. Pertimbangkan berkonsultasi dengan ahli gizi untuk rencana diet yang dipersonalisasi.'
    });
  }
  
  // Smoking recommendations
  if (data.smoking === 'yes') {
    recommendations.push({
      title: 'Berhenti Merokok',
      description: 'Merokok secara signifikan meningkatkan risiko kesehatan. Cari dukungan dari program penghentian merokok atau konsultasikan dengan dokter Anda.'
    });
  }
  
  // Exercise recommendations
  if (data.exerciseFrequency === 'rare' || data.exerciseFrequency === 'moderate') {
    recommendations.push({
      title: 'Tingkatkan Aktivitas Fisik',
      description: 'Targetkan setidaknya 150 menit latihan intensitas sedang per minggu. Ini dapat mencakup berjalan, bersepeda, atau aktivitas apa pun yang Anda nikmati.'
    });
  }
  
  // Sleep recommendations
  if (data.sleepDuration < 7) {
    recommendations.push({
      title: 'Tingkatkan Kualitas Tidur',
      description: 'Targetkan 7-9 jam tidur berkualitas per malam. Buat jadwal tidur yang konsisten dan ciptakan rutinitas tidur yang menenangkan.'
    });
  }
  
  // Family history recommendations
  if (data.familyHistory === 'yes') {
    recommendations.push({
      title: 'Pemeriksaan Kesehatan Rutin',
      description: 'Dengan riwayat keluarga penyakit kronis, pemeriksaan medis rutin dan tes skrining sangat penting untuk deteksi dini.'
    });
  }
  
  // Age-based recommendations
  if (data.age > 40) {
    recommendations.push({
      title: 'Pemantauan Kesehatan',
      description: 'Seiring bertambahnya usia, pemeriksaan kesehatan rutin menjadi lebih penting. Jadwalkan pemeriksaan tahunan dengan penyedia layanan kesehatan Anda.'
    });
  }
  
  // General recommendations
  recommendations.push({
    title: 'Diet Seimbang',
    description: 'Konsumsi berbagai buah, sayuran, biji-bijian utuh, dan protein tanpa lemak. Batasi makanan olahan dan minuman manis.'
  });
  
  recommendations.push({
    title: 'Tetap Terhidrasi',
    description: 'Minum banyak air sepanjang hari. Hidrasi yang tepat mendukung kesehatan dan kesejahteraan secara keseluruhan.'
  });
  
  recommendations.push({
    title: 'Manajemen Stres',
    description: 'Praktikkan teknik relaksasi seperti meditasi, yoga, atau pernapasan dalam. Mengelola stres sangat penting untuk kesehatan secara keseluruhan.'
  });
  
  return recommendations;
};

/**
 * Get lifestyle factors for visualization
 * @param {Object} data - Health data object
 * @returns {Array} Array of lifestyle factors
 */
export const getLifestyleFactors = (data) => {
  return [
    {
      name: 'Olahraga',
      value: data.exerciseFrequency === 'rare' ? 20 : data.exerciseFrequency === 'moderate' ? 60 : 100
    },
    {
      name: 'Kualitas Tidur',
      value: Math.min(data.sleepDuration / 9 * 100, 100)
    },
    {
      name: 'Status BMI',
      value: data.bmi > 30 ? 30 : data.bmi >= 25 ? 50 : 100
    },
    {
      name: 'Tidak Merokok',
      value: data.smoking === 'yes' ? 20 : 100
    },
    {
      name: 'Riwayat Keluarga',
      value: data.familyHistory === 'yes' ? 50 : 100
    }
  ];
};
