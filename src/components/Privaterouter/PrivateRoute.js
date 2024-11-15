import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify"; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get the authenticated user from context
  const navigate = useNavigate();
  
  if (!user) {
   
    toast.error("You must be logged in to access this page!");
   
    setTimeout(() => {
      navigate("/");
    }, 3000); 
    return null; // Return nothing while the user is redirected
  }

  return children; // If the user is logged in, render the protected route
};

export default PrivateRoute;
