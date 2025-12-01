import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Tidak ada token → wajib login
  if (!token) return <Navigate to="/login" replace />;

  // ❌ Role tidak diizinkan
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/login" replace />;
  }

  // ✔ Authorized
  return children;
}
