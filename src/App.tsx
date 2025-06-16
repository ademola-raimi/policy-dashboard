import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
}

export default App;