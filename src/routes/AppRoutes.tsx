import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/Login';
import ArchivePage from '../pages/Archive';
import NotFoundPage from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/recommendations/archive"
      element={
        <ProtectedRoute>
          <ArchivePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/recommendations" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
