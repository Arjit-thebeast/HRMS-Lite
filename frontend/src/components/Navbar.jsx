import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-white">
                    <Link to="/">HRMS Lite</Link>
                </div>
                <div className="flex space-x-6">
                    <Link to="/" className="text-indigo-100 hover:text-white transition duration-200">Dashboard</Link>
                    <Link to="/employees" className="text-indigo-100 hover:text-white transition duration-200">Employees</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
