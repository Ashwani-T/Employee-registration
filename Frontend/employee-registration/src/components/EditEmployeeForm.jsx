import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import validateField from '../utils/validateForm'; 

function EditEmployeeForm({ employeeDetails, setEmployeeDetails, formError, setFormError }) {
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errors, setErrors] = useState({}); // State for validation errors
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    
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

    const goToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Final validation check
        const newErrors = {};
        for (const field in employeeDetails) {
            newErrors[field] = validateField(field, employeeDetails[field]);
        }
        setErrors(newErrors);
    
        // Stop submission if there are validation errors
        if (Object.values(newErrors).some((error) => error)) return;
    
        // Format the date field to match the MySQL `DATE` format
        const formattedDetails = {
            ...employeeDetails,
            d_join: employeeDetails.d_join.split('T')[0], // Extract only the date portion (YYYY-MM-DD)
        };
    
        console.log('Payload sent to backend:', formattedDetails);
    
        try {
            // Make the PUT request
            const response = await axios.put('http://localhost:5000/update-employee', formattedDetails);
            console.log('Backend Response:', response.data);
    
            // Check if the response indicates success
            if (response.data.success) {
                setSuccessMessage('Employee details updated successfully!');
                setFormError('');
    
                // Reset the form fields to empty
                setEmployeeDetails({
                    emp_id: '',
                    name: '',
                    email: '',
                    phone: '',
                    dept: '',
                    d_join: '',
                    role: '',
                });
    
                
                setTimeout(() => setSuccessMessage(''), 2000);
            } else {
                setFormError(response.data.message || 'Error updating employee details.');
            }
        } catch (error) {
           
            console.error('Error during update request:', error);
            if (error.response) {
                setFormError(error.response.data.error || 'Error updating employee details.');
            } else {
                setFormError('An unexpected error occurred.');
            }
        }
    };
    

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <h3 className="text-center mb-3">Edit Employee Details</h3>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="emp_id" className="form-label">Employee ID</label>
                    <input
                        type="text"
                        id="emp_id"
                        name="emp_id"
                        className={`form-control ${errors.emp_id ? 'is-invalid' : ''}`}
                        value={employeeDetails.emp_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled 
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
                        value={employeeDetails.name}
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
                        value={employeeDetails.email}
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
                        value={employeeDetails.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="dept" className="form-label">Department</label>
                    <input
                        type="text"
                        id="dept"
                        name="dept"
                        className={`form-control ${errors.dept ? 'is-invalid' : ''}`}
                        value={employeeDetails.dept}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.dept && <div className="invalid-feedback">{errors.dept}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="d_join" className="form-label">Date of Joining</label>
                    <input
                        type="date"
                        id="d_join"
                        name="d_join"
                        className={`form-control ${errors.d_join ? 'is-invalid' : ''}`}
                        value={employeeDetails.d_join}
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
                        value={employeeDetails.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>
                {formError && <div className="text-danger mb-3">{formError}</div>}
                <button type="submit" className="btn btn-success w-100">Update Employee</button>
            </form>
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

export default EditEmployeeForm;
