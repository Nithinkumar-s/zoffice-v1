import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import EmployeePage from '@/pages/EmployeePage';
import LoginPage from '@/pages/LoginPage';
import ThemeDemoPage from '@/pages/ThemeDemoPage';

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
