import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserEmail, getUserName } from "../../../store/user/common";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const userEmail = getUserEmail();
  const userName = getUserName();

  if (!userEmail) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  } else if (!userName || userName === null) {
    return <Navigate to="/ecoName" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
