import React, { useState } from "react";
import EditEmployeeForm from "./EditEmployeeForm";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";



function EditEmployee() {
    const goToHome = () => {
        navigate('/'); // Navigate to the home page
    };
    
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState({
    emp_id: "",
    name: "",
    email: "",
    phone: "",
    dept: "",
    d_join: "",
    role: "",
  });

  const [formError, setFormError] = useState("");
  const [empIdToSearch, setEmpIdToSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/verify-password",
        { password }
      );
      if (response.data.success) {
        setIsAuthorized(true);
        setAuthError("");
      } else {
        setAuthError("Incorrect password");
      }
    } catch (error) {
      console.error(error);
      setAuthError("Error verifying password");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/get-employee/${empIdToSearch}`
      );
      if (response.data) {
        setEmployeeDetails(response.data);
        setSearchError("");
      } else {
        setSearchError("Employee not found.");
      }
    } catch (error) {
      console.error(error);
      setSearchError("Error fetching employee details.");
    }
  };

  return (
    <div className="container mt-5">
      {!isAuthorized ? (
        <form
          onSubmit={handlePasswordSubmit}
          className="p-4 border rounded bg-light"
        >
          <h3 className="text-center mb-3">Enter Database Password</h3>
          <div className="mb-3 position-relative">
    <label htmlFor="password" className="form-label">Password</label>
    <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ paddingRight: "50px" }} // Add padding to prevent text overlap with button
    />
    <button
        type="button"
        className="btn btn-sm btn-outline-secondary position-absolute"
        style={{
            top: "74%",
            right: "15px",
            transform: "translateY(-50%)",
        }}
        onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
    >
        {showPassword ? "Hide" : "Show"} {/* Button text */}
    </button>
    {authError && <div className="text-danger mt-2">{authError}</div>}
</div>


          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
          <button
                className="btn btn-success mt-4"
                style={{ display: 'block', margin: '0 auto' }}
                onClick={goToHome}
            >
                Go to Home
            </button>
        </form>
      ) : (
        <>
          <form
            onSubmit={handleSearch}
            className="p-4 border rounded bg-light mb-4"
          >
            <h3 className="text-center mb-3">Search Employee by ID</h3>
            <div className="mb-3">
              <label htmlFor="empIdToSearch" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                id="empIdToSearch"
                name="empIdToSearch"
                className="form-control"
                value={empIdToSearch}
                onChange={(e) => setEmpIdToSearch(e.target.value)}
              />
              {searchError && (
                <div className="text-danger mt-2">{searchError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-secondary w-100">
              Search
            </button>
            
          </form>
          <EditEmployeeForm
            employeeDetails={employeeDetails}
            setEmployeeDetails={setEmployeeDetails}
            formError={formError}
            setFormError={setFormError}
          />
        </>
      )}
    </div>
  );
}

export default EditEmployee;
