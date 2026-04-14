'use client';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function AgeGroupChart({ ageData }) {
  const totalValue = ageData.reduce((sum, item) => sum + item.value, 0);

  const data = {
    labels: ageData.map(item => item.name),
    datasets: [
      {
        data: ageData.map(item => item.value),
        backgroundColor: ['#E5E7EB', '#F97316', '#94A3B8', '#3B82F6'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => {
          const percentage = ((value / totalValue) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Patient By Age Group
      </h3>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6 space-y-3">
        {ageData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {((item.value / totalValue) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}