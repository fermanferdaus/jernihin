import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Riwayat from "./pages/Riwayat";
import Jadwal from "./pages/Jadwal";
import EditJadwal from "./pages/EditJadwal";

export default function App() {
  return (
    <>
      {/* 🔥 Toaster harus diluar Routes */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riwayat"
          element={
            <ProtectedRoute>
              <Riwayat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jadwal"
          element={
            <ProtectedRoute>
              <Jadwal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jadwal/edit"
          element={
            <ProtectedRoute>
              <EditJadwal />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
