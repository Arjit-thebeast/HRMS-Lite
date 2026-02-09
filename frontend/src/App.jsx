import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col">
                <Navbar />
                <main className="container mx-auto py-6 flex-grow px-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<Employees />} />
                    </Routes>
                </main>
                <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow mt-auto py-4 text-center text-white">
                    <p>Developed by Arjit Aggarwal</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
