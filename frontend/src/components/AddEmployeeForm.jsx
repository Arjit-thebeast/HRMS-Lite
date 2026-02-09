import React, { useState } from 'react';
import api from '../api';
import { Plus } from 'lucide-react';

const AddEmployeeForm = ({ onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        department: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/employees/', formData);
            setFormData({ full_name: '', email: '', department: '' });
            onEmployeeAdded();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to add employee');
        }
    };

    const inputClass = "mt-1 block w-full rounded-md bg-gray-700 text-white border border-indigo-400 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50 p-2 placeholder-gray-400";

    return (
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-indigo-300 border-opacity-20 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Plus className="w-5 h-5" /> Add New Employee
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-indigo-100">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-indigo-100">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-indigo-100">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 transition duration-200 font-medium shadow-lg"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;
