import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, getUserName } from "../../../store/user/common";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const accessToken = getToken();
  const userName = getUserName();

  if (!accessToken) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  } else if (!userName || userName === null) {
    return <Navigate to="/ecoName" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
