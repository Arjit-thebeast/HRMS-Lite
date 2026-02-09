import React, { useEffect, useState } from 'react';
import api from '../api';
import { X, Loader } from 'lucide-react';

const AttendanceHistory = ({ employee, onClose }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (employee) {
            const fetchHistory = async () => {
                try {
                    const response = await api.get(`/attendance/${employee.id}`);
                    // Sort by date descending
                    const sortedHistory = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setHistory(sortedHistory);
                } catch (error) {
                    console.error('Error fetching history:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchHistory();
        }
    }, [employee]);

    if (!employee) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-indigo-300 border-opacity-20">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-indigo-300 hover:text-white transition duration-200"
                >
                    <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-semibold mb-4 text-white">
                    Attendance History: {employee.full_name}
                </h3>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader className="animate-spin h-8 w-8 text-cyan-400" />
                        </div>
                    ) : history.length === 0 ? (
                        <p className="text-indigo-200 text-center py-4">No attendance records found.</p>
                    ) : (
                        <table className="min-w-full leading-normal">
                            <thead className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600">
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((record) => (
                                    <tr key={record.id} className="hover:bg-indigo-500 hover:bg-opacity-10 transition duration-150">
                                        <td className="px-5 py-4 border-b border-indigo-300 border-opacity-10 text-sm text-indigo-100">
                                            {record.date}
                                        </td>
                                        <td className="px-5 py-4 border-b border-indigo-300 border-opacity-10 text-sm">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Present'
                                                        ? 'bg-cyan-500 bg-opacity-30 text-cyan-200'
                                                        : 'bg-red-500 bg-opacity-30 text-red-200'
                                                    }`}
                                            >
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:from-indigo-700 hover:to-purple-700 transition duration-200 font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
