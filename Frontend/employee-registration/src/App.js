import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import Home from './components/Home';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import { BrowserRouter, Routes,Route } from 'react-router-dom'


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-employee" element={<EmployeeForm />} /> 
              <Route path="/edit-employee" element={<EditEmployee />} />
              <Route path="/view-employee" element={<ViewEmployee />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
