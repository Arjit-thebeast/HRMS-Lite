import React, { useEffect, useState } from 'react';
import api from '../api';
import { Users, Calendar } from 'lucide-react';
import PieChart from '../components/PieChart';

const Dashboard = () => {
    const [stats, setStats] = useState({ total_employees: 0, present_today: 0 });
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

    // sample welfare data — replace with API data if available
    const welfareData = [
        { label: 'Health', value: 40, color: '#06b6d4' },
        { label: 'Training', value: 30, color: '#7c3aed' },
        { label: 'Benefits', value: 20, color: '#f97316' },
        { label: 'Other', value: 10, color: '#10b981' },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-white">{getGreeting()}, HR</h1>
                <p className="text-indigo-200 mt-1 text-lg">{formatDate()}</p>
            </div>

            <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-cyan-400 text-white w-full">
                    <div>
                        <p className="text-indigo-100 text-sm font-medium uppercase">Total Employees</p>
                        <p className="text-4xl font-bold">{stats.total_employees}</p>
                    </div>
                    <div className="p-3 bg-indigo-400 rounded-full">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-yellow-300 text-white w-full">
                    <div>
                        <p className="text-teal-100 text-sm font-medium uppercase">Present Today</p>
                        <p className="text-4xl font-bold">{stats.present_today}</p>
                    </div>
                    <div className="p-3 bg-teal-400 rounded-full">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-indigo-300 border-opacity-20">
                    <h2 className="text-xl font-semibold mb-4 text-white">Who is Present Today?</h2>
                    {presentEmployees.length > 0 ? (
                        <ul className="divide-y divide-indigo-300 divide-opacity-20">
                            {presentEmployees.map(emp => (
                                <li key={emp.id} className="py-3 flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold mr-3 shadow-md">
                                        {emp.full_name.charAt(0)}
                                    </div>
                                    <span className="text-indigo-100">{emp.full_name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-indigo-200 italic">No employees marked present yet.</p>
                    )}
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-purple-300 border-opacity-20">
                    <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
                    <p className="text-indigo-100 mb-4">
                        Manage your employees and track attendance efficiently. Use the navigation bar or the buttons below.
                    </p>
                </div>

                <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-indigo-300 border-opacity-10">
                    <h2 className="text-xl font-semibold mb-4 text-white">Employee Welfare</h2>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                        <PieChart data={welfareData} size={220} innerRadius={70} />
                        <div className="text-indigo-100 max-w-md">
                            <p className="mb-3">Overview of employee welfare allocation. Replace with real data from the backend when available.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                {welfareData.map((w, i) => (
                                    <li key={i}>{w.label}: {w.value}%</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
