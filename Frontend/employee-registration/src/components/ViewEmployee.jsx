import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { formatDate } from '../utils/validateForm'; 


function ViewEmployee() {
    const [empId, setEmpId] = useState(''); // State to hold input value
    const [employeeDetails, setEmployeeDetails] = useState(null); // State to hold fetched employee details
    const [error, setError] = useState(''); // State to handle errors
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setEmployeeDetails(null); // Reset employee details

        try {
            const response = await axios.get(`http://localhost:5000/get-employee/${empId}`);
            setEmployeeDetails(response.data); // Set fetched employee details
        } catch (error) {
            console.error('Error fetching employee details:', error);
            if (error.response) {
                if (error.response.status === 404) {
                    setError('Employee not found.');
                } else {
                    setError(error.response.data.error || 'Error fetching employee details.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleReset = () => {
      
        setEmpId('');
        setEmployeeDetails(null);
        setError('');
    };

    const goToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">View Employee Details</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="empId" className="form-label">Employee ID</label>
                    <input
                        type="text"
                        id="empId"
                        name="empId"
                        className="form-control"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                        placeholder="Enter Employee ID"
                        required
                    />
                </div>
                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary w-100">Fetch Employee</button>
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {employeeDetails && (
                <div className="mt-4">
                    <h3 className="text-center mb-3">Employee Details</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Employee ID</td>
                                <td>{employeeDetails.emp_id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{employeeDetails.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{employeeDetails.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{employeeDetails.phone}</td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>{employeeDetails.dept}</td>
                            </tr>
                            <tr>
                                <td>Date of Joining</td>
                                <td>{formatDate(employeeDetails.d_join)}</td>
                            </tr>

                            <tr>
                                <td>Role</td>
                                <td>{employeeDetails.role}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <button
                className="btn btn-success mt-4"
                style={{ display: 'block', margin: '0 auto' }}
                onClick={goToHome}
            >
                Go to Home
            </button>
        </div>
    );
}

export default ViewEmployee;
