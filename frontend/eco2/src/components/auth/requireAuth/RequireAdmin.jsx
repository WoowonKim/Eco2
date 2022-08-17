import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children, userRole }) => {
  if (!userRole) {
    return <Navigate to="/mainTree" />;
  }
  return children;
};
export default RequireAdmin;
