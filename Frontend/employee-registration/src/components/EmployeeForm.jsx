import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import validateField from '../utils/validateForm'; 

function EmployeeForm() {
    const [formData, setFormData] = useState({
        emp_id: '',
        name: '',
        email: '',
        phone: '',
        dept: '',
        d_join: '',
        role: '',
    });

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState(''); // State for error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Live validation during typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Final validation check
        const newErrors = {};
        for (const field in formData) {
            newErrors[field] = validateField(field, formData[field]);
        }
        setErrors(newErrors);
    
        if (Object.values(newErrors).some((error) => error)) return; 
    
        try {
            const response = await axios.post('http://localhost:5000/newemp', formData);
            
            // Check for success in the response
            if (response.data.success) {
                setSuccessMessage(response.data.message); 
                setFormError('');
                setFormData({
                    emp_id: '',
                    name: '',
                    email: '',
                    phone: '',
                    dept: '',
                    d_join: '',
                    role: '',
                }); // Reseting  form data
                setTimeout(() => {
                    navigate('/'); // Redirect to home page after 2 seconds
                }, 2000);
            } else {
                // Handle unexpected response structure
                setFormError('Unexpected response from server.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Handling duplicate entries
                setFormError(error.response.data.error || 'Employee ID or email already exists.');
            } else {
                // Handling  other errors
                console.error(error);
                setFormError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Registration</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {formError && <div className="alert alert-danger">{formError}</div>}
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="emp_id" className="form-label">Employee ID</label>
                    <input
                        type="text"
                        id="emp_id"
                        name="emp_id"
                        className={`form-control ${errors.emp_id ? 'is-invalid' : ''}`}
                        value={formData.emp_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.emp_id && <div className="invalid-feedback">{errors.emp_id}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="dept" className="form-label">Department</label>
                    <select
                        id="dept"
                        name="dept"
                        className={`form-select ${errors.dept ? 'is-invalid' : ''}`}
                        value={formData.dept}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                    </select>
                    {errors.dept && <div className="invalid-feedback">{errors.dept}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="d_join" className="form-label">Date of Joining</label>
                    <input
                        type="date"
                        id="d_join"
                        name="d_join"
                        className={`form-control ${errors.d_join ? 'is-invalid' : ''}`}
                        value={formData.d_join}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.d_join && <div className="invalid-feedback">{errors.d_join}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                        value={formData.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Register Employee</button>
            </form>
        </div>
    );
}

export default EmployeeForm;
