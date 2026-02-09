import React, { useState } from 'react';
import api from '../api';
import { X } from 'lucide-react';

const MarkAttendanceModal = ({ employee, onClose, onSuccess }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('Present');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/attendance/', {
                employee_id: employee.id,
                date,
                status,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error marking attendance:', err);
            setError('Failed to mark attendance.');
        } finally {
            setLoading(false);
        }
    };

    if (!employee) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-indigo-300 border-opacity-20">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-indigo-300 hover:text-white transition duration-200"
                >
                    <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-semibold mb-4 text-white">
                    Mark Attendance for {employee.full_name}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-gray-700 text-white border border-indigo-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-gray-700 text-white border border-indigo-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-indigo-400 rounded text-indigo-300 hover:bg-indigo-500 hover:bg-opacity-20 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:from-indigo-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 font-medium"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarkAttendanceModal;
