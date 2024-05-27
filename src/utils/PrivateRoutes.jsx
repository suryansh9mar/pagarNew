import React  from 'react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { account } from '../appwrite/Auth';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
