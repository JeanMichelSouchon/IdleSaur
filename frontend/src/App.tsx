import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AdminPage from './pages/Admin/AdminPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { OverlayProvider } from './contexts/OverlayContext';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <OverlayProvider>
              <DashboardPage />
            </OverlayProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <OverlayProvider>
              <AdminPage />
            </OverlayProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-profile"
        element={
          <ProtectedRoute>
            <OverlayProvider>
              <UserProfilePage />
            </OverlayProvider>
          </ProtectedRoute>
        }
      />
      {/* Redirection pour les routes non définies */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
