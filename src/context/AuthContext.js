import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Base_url = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const { data } = await axios.post(`${Base_url}/login`, credentials);
    localStorage.setItem('user',JSON.stringify(data.user)); //store user data 
    localStorage.setItem('token', data.token); // Store token on login
    setUser(jwtDecode(data.token)); // Decode and set user from token
  };

  const register = async (credentials) => {
    try {
      const { data } = await axios.post(`${Base_url}/register`, credentials);
      return data.message;  // Return success message from server
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Only attempt to decode if the token is not empty and is valid
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        // Handle invalid token case, remove it from localStorage
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
