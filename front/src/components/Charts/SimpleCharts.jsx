// Componente de gráfico de linha simples
export function LineChart({ data, height = 200, color = 'emerald' }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min;
  const padding = 40;
  const width = 100;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = range === 0 ? 50 : ((d.value - min) / range) * (100 - padding * 2) + padding;
    return `${x},${100 - y}`;
  }).join(' ');

  const colors = {
    emerald: { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.1)' },
    blue: { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.1)' },
    violet: { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.1)' },
    amber: { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.1)' }
  };

  const selectedColor = colors[color] || colors.emerald;

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Area under line */}
        <polygon
          points={`0,100 ${points} ${width},100`}
          fill={selectedColor.fill}
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={selectedColor.stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (range === 0 ? 50 : ((d.value - min) / range) * (100 - padding * 2) + padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill={selectedColor.stroke}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 mt-2">
        {data.map((d, i) => (
          <span key={i} className={i === 0 ? 'text-left' : i === data.length - 1 ? 'text-right' : 'text-center'}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Componente de gráfico de barras simples
export function BarChart({ data, height = 200, color = 'blue' }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map(d => d.value));
  
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="space-y-3" style={{ minHeight: `${height}px` }}>
      {data.map((item, index) => {
        const percentage = max > 0 ? (item.value / max) * 100 : 0;
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${selectedColor} transition-all duration-500 rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Componente de gráfico de pizza simples
export function PieChart({ data, size = 200 }) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = -90;

  const colors = [
    '#10b981', // emerald
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#f59e0b', // amber
    '#f43f5e', // rose
    '#eab308', // yellow
    '#a855f7', // purple
    '#06b6d4', // cyan
  ];

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
      color: colors[index % colors.length]
    };
  });

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    
    return [
      'M', x, y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const center = size / 2;
  const radius = size / 2 - 10;

  return (
    <div className="flex items-center gap-6">
      {/* Pie Chart */}
      <svg width={size} height={size} className="flex-shrink-0">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={describeArc(center, center, radius, segment.startAngle, segment.endAngle)}
            fill={segment.color}
            stroke="white"
            strokeWidth="2"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="space-y-2 flex-1">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-700 truncate">
                  {segment.label}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
