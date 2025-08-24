import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/home';
import EmployeePage from '@/pages/employees';
import LoginPage from '@/pages/login';
import ThemeDemoPage from '@/pages/theme-demo'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/employees" element={<EmployeePage />} />
  <Route path="/demo" element={<ThemeDemoPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
