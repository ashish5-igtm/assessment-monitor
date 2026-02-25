export default function BarChart({ data = [], title = 'Performance Chart' }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(item.value / 100) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
