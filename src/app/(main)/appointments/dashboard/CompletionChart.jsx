'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export default function CompletionChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [400, 450, 320, 500, 420, 380, 450, 400, 350, 300, 280, 200],
        borderColor: '#F97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#F97316',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        fill: true,
        datalabels: {
          color: '#F97316',
          anchor: 'end',
          align: 'start', // move label above the point
          offset: 6,
          font: {
            weight: 'bold',
            size: 10
          },
          formatter: Math.round,
        }
      },
      {
        label: 'Cancelled',
        data: [350, 400, 280, 450, 380, 340, 400, 350, 300, 250, 230, 150],
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#6B7280',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        fill: true,
        datalabels: {
          color: '#6B7280',
          anchor: 'end',
          align: 'start', // move label above the point
          offset: 6,
          font: {
            weight: 'bold',
            size: 10
          },
          formatter: Math.round,
        }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        padding: 10,
        borderRadius: 6,
      },
      datalabels: {
        display: true,
        clamp: true, // if keep labels inside the canvas
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
        grid: {
          color: '#F3F4F6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Average Completion</h3>
        <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
          <option>Yearly</option>
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
