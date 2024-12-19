import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to Employee Management System</h1>
            <div className="card p-4 bg-light">
                <nav className="mt-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/add-employee" className="btn btn-primary w-100">
                                Add New Employee
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/view-employee" className="btn btn-secondary w-100">
                                View Employee Details
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/edit-employee" className="btn btn-warning w-100">
                                Edit Employee Details
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Home;
