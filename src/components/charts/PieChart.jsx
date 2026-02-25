export default function PieChart({ data = [], title = 'Statistics' }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const segments = data.reduce((acc, item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = acc.length > 0 ? acc[acc.length - 1].startAngle + acc[acc.length - 1].angle : 0;

    acc.push({
      ...item,
      percentage,
      startAngle,
      angle,
      color: colors[index % colors.length]
    });
    return acc;
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex gap-8">
        {/* SVG Chart */}
        <svg width="150" height="150" viewBox="0 0 150 150" className="flex-shrink-0">
          <circle cx="75" cy="75" r="60" fill="none" stroke="#e5e7eb" strokeWidth="40" />
          {segments.map((segment, idx) => {
            const startRad = (segment.startAngle * Math.PI) / 180;
            const endRad = ((segment.startAngle + segment.angle) * Math.PI) / 180;
            const x1 = 75 + 60 * Math.cos(startRad);
            const y1 = 75 + 60 * Math.sin(startRad);
            const x2 = 75 + 60 * Math.cos(endRad);
            const y2 = 75 + 60 * Math.sin(endRad);
            const largeArc = segment.angle > 180 ? 1 : 0;

            return (
              <path
                key={idx}
                d={`M 75 75 L ${x1} ${y1} A 60 60 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={segment.color}
              />
            );
          })}
        </svg>

        {/* Legend */}
        <div className="space-y-2">
          {segments.map((segment, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-700">
                {segment.label}: {segment.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
