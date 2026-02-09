import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import AddEmployeeForm from '../components/AddEmployeeForm';

const Employees = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleEmployeeAdded = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
                </div>
                <div className="lg:col-span-2">
                    <EmployeeList refreshKey={refreshKey} />
                </div>
            </div>
        </div>
    );
};

export default Employees;
