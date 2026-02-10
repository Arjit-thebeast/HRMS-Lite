import React, { useEffect, useState } from 'react';
import api from '../api';
import { Users, Calendar, TrendingUp } from 'lucide-react';
import PieChart from '../components/PieChart';

const Dashboard = () => {
    const [stats, setStats] = useState({ total_employees: 0, present_today: 0, absent_today: 0, pending_records: 0 });
    const [presentEmployees, setPresentEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/stats/');
                setStats(statsRes.data);

                const presentRes = await api.get('/attendance/today/');
                setPresentEmployees(presentRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = () => {
        return new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const welfareData = [
        { label: 'Health', value: 45, color: '#06b6d4' },
        { label: 'Training', value: 30, color: '#8b5cf6' },
        { label: 'Benefits', value: 15, color: '#f97316' },
        { label: 'Other', value: 10, color: '#10b981' },
    ];

    const absent_today = Math.max(0, stats.total_employees - stats.present_today);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">{getGreeting()}, HR</h1>
                    <p className="text-gray-600 mt-1 text-lg">{formatDate()}</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-500">
                            <p className="text-gray-600 text-sm font-medium uppercase mb-2">Total Employees</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.total_employees}</p>
                            <p className="text-sm text-green-600 font-medium">+12%</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                            <p className="text-gray-600 text-sm font-medium uppercase mb-2">Present Today</p>
                            <p className="text-3xl font-bold text-green-600">{stats.present_today}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                            <p className="text-gray-600 text-sm font-medium uppercase mb-2">Absent Today</p>
                            <p className="text-3xl font-bold text-red-600">{absent_today}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <p className="text-gray-600 text-sm font-medium uppercase mb-2">Pending Records</p>
                            <p className="text-3xl font-bold text-indigo-600">0</p>
                            <p className="text-xs text-gray-500 mt-2 italic">Requires admin attention</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Employees per Department</h2>
                        <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                            <p>Chart placeholder — connect to backend when ready</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Employee Welfare</h2>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <PieChart data={welfareData} size={240} innerRadius={75} />
                            </div>
                            <div className="flex-1 text-gray-700">
                                <p className="mb-4 leading-relaxed">Overview of employee welfare allocation. Ensures comprehensive support across health, professional development, benefits, and other initiatives.</p>
                                <ul className="space-y-2">
                                    {welfareData.map((w, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="inline-block w-3 h-3 mr-3 rounded-full" style={{ background: w.color }} />
                                            <span>{w.label}: <span className="font-semibold">{w.value}%</span></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
