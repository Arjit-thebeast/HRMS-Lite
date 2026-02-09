import React from 'react';

// Minimal SVG pie chart component — no external deps
const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, 'Z'].join(' ');
};

const PieChart = ({ data = [], size = 200, innerRadius = 60 }) => {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  let angle = 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, idx) => {
          const start = angle;
          const sliceAngle = (d.value / total) * 360;
          const end = angle + sliceAngle;
          angle += sliceAngle;
          const path = describeArc(cx, cy, r, start, end);
          return <path key={idx} d={path} fill={d.color || '#ccc'} stroke="#fff" strokeWidth="0.5" />;
        })}
        <circle cx={cx} cy={cy} r={innerRadius} fill="#0f172a" opacity="0.9" />
        <text x={cx} y={cy} textAnchor="middle" dy="6" fill="#fff" className="font-semibold text-sm">Welfare</text>
      </svg>
      <div className="mt-4 w-full max-w-xs">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm text-indigo-100 mb-2">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2" style={{ background: d.color }} />
              <span>{d.label}</span>
            </div>
            <span className="font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
