import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<LandingPage />}
    />
    <Route
      path="/dashboard"
      element={<Dashboard />}
    />
  </Routes>
);

export default AppRoutes;
