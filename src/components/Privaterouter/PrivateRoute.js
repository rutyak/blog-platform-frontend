import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  if (!user) {
      
    setTimeout(() => {
      navigate("/");
    }, 3000); 
    return null; // Return nothing while the user is redirected
  }

  return children; // If the user is logged in, render the protected route
};

export default PrivateRoute;
