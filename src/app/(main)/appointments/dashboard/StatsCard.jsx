'use client'

//Formate of the card which is shown on appointment dashboard 

export default function StatsCard({ title, value, increase, period, bgColor, dropdown }) {
  return (
    <div className={`${bgColor} rounded-xl p-6 relative`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {dropdown && (
          <select className="bg-white/50 border border-white/30 rounded-lg px-3 py-1 text-sm">
            <option>{dropdown}</option>
          </select>
        )}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="flex items-center text-sm text-gray-600">
        <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span>Increases {increase}% {period}</span>
      </div>
    </div>
  );
}