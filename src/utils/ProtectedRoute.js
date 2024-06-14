import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserSession } from './auth';

const ProtectedRoute = ({ children }) => {
  const user = getUserSession();
  console.log(user)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
