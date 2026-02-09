import React from 'react';

const EmployeeWelfarePie = ({ data = [], size = 220 }) => {
    const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
    let acc = 0;
    const parts = data.map(d => {
        const start = (acc / total) * 100;
        acc += d.value || 0;
        const end = (acc / total) * 100;
        return `${d.color} ${start}% ${end}%`;
    });
    const gradient = `conic-gradient(${parts.join(', ')})`;

    return (
        <div className="w-full flex flex-col items-center">
            <div
                className="rounded-full shadow-md"
                style={{ width: size, height: size, background: gradient }}
            />

            <div className="mt-4 w-full max-w-md">
                {data.map(d => (
                    <div key={d.label} className="flex items-center justify-between text-indigo-100 mb-2">
                        <div className="flex items-center">
                            <span style={{ background: d.color }} className="inline-block w-3 h-3 rounded mr-2" />
                            <span>{d.label}</span>
                        </div>
                        <div className="text-sm font-medium">{Math.round(((d.value || 0) / total) * 100)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeWelfarePie;
