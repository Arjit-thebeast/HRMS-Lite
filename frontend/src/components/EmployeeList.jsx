import React, { useEffect, useState } from 'react';
import api from '../api';
import { Trash2, CheckCircle, Loader, History } from 'lucide-react';
import MarkAttendanceModal from './MarkAttendanceModal';
import AttendanceHistory from './AttendanceHistory';

const EmployeeList = ({ refreshKey }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployeeForAttendance, setSelectedEmployeeForAttendance] = useState(null);
    const [selectedEmployeeForHistory, setSelectedEmployeeForHistory] = useState(null);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await api.get('/employees/');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [refreshKey]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleAttendanceSuccess = () => {
        // Optional: Refresh list or show success message if needed globally
        alert('Attendance marked successfully!');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <Loader className="animate-spin h-8 w-8 text-cyan-400" />
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border border-indigo-300 border-opacity-20">
                <p className="text-indigo-200 text-lg">No employees found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border border-indigo-300 border-opacity-20">
            {selectedEmployeeForAttendance && (
                <MarkAttendanceModal
                    employee={selectedEmployeeForAttendance}
                    onClose={() => setSelectedEmployeeForAttendance(null)}
                    onSuccess={handleAttendanceSuccess}
                />
            )}

            {selectedEmployeeForHistory && (
                <AttendanceHistory
                    employee={selectedEmployeeForHistory}
                    onClose={() => setSelectedEmployeeForHistory(null)}
                />
            )}

            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Dept
                        </th>
                        <th className="px-5 py-3 border-b-2 border-indigo-300 border-opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-indigo-500 hover:bg-opacity-10 transition duration-150">
                            <td className="px-5 py-5 border-b border-indigo-300 border-opacity-10 bg-transparent text-sm text-indigo-100">
                                {employee.id}
                            </td>
                            <td className="px-5 py-5 border-b border-indigo-300 border-opacity-10 bg-transparent text-sm text-white font-medium">
                                {employee.full_name}
                            </td>
                            <td className="px-5 py-5 border-b border-indigo-300 border-opacity-10 bg-transparent text-sm text-indigo-200">
                                {employee.email}
                            </td>
                            <td className="px-5 py-5 border-b border-indigo-300 border-opacity-10 bg-transparent text-sm text-indigo-200">
                                {employee.department}
                            </td>
                            <td className="px-5 py-5 border-b border-indigo-300 border-opacity-10 bg-transparent text-sm flex gap-3">
                                <button
                                    onClick={() => setSelectedEmployeeForAttendance(employee)}
                                    className="text-cyan-400 hover:text-cyan-300 transition duration-200 hover:scale-110"
                                    title="Mark Attendance"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setSelectedEmployeeForHistory(employee)}
                                    className="text-indigo-400 hover:text-indigo-300 transition duration-200 hover:scale-110"
                                    title="View History"
                                >
                                    <History className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(employee.id)}
                                    className="text-red-400 hover:text-red-300 transition duration-200 hover:scale-110"
                                    title="Delete Employee"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
