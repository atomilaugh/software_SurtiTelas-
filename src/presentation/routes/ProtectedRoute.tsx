import {
  Navigate,
} from "react-router-dom";

import { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles,
}: Props) => {
  const { user, loading } =
    useAuth();

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;