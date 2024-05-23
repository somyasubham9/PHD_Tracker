import React from 'react';
import { Navigate, useLocation , Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const location = useLocation();

  // Add a direct sessionStorage check as a fallback
  const isAuth = isLoggedIn || sessionStorage.getItem("userDetails");

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;