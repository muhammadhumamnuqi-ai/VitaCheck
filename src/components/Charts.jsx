import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getLifestyleFactors } from '../utils/riskCalculator';

const COLORS = ['#1E88E5', '#43A047', '#FBC02D', '#E53935', '#8E24AA'];

export default function Charts({ data }) {
  const bmiChartData = [
    { name: data.category, value: 100 }
  ];

  const lifestyleData = getLifestyleFactors(data);

  const getBMIColor = (category) => {
    switch(category) {
      case 'Underweight': return '#2196F3';
      case 'Normal': return '#43A047';
      case 'Overweight': return '#FBC02D';
      case 'Obese': return '#E53935';
      default: return '#1E88E5';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      {/* BMI Pie Chart */}
      <div className="card slide-up">
        <h3 className="text-xl font-bold text-gray-900 mb-6">BMI Composition</h3>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bmiChartData}
                cx={150}
                cy={125}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill={getBMIColor(data.category)} />
              </Pie>
              <Tooltip 
                formatter={(value) => `${value.toFixed(1)}%`}
                contentStyle={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-2xl font-bold text-gray-900">{data.category}</p>
          <p className="text-primary-500 font-semibold">BMI: {data.bmi}</p>
        </div>
      </div>

      {/* Lifestyle Factors Radar Chart */}
      <div className="card slide-up">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Lifestyle Factors</h3>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={lifestyleData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar
                name="Health Score"
                dataKey="value"
                stroke="#1E88E5"
                fill="#1E88E5"
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
