import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from './Profile/Profile';
import Login from "../components/authentication/Login";

function Navbar() {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  // };

  return (
    <nav className="bg-teal-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-semibold hover:text-teal-200">
          Home
        </Link>
        {/* {user && ( */}
          <Link to="/dashboard" className="text-lg hover:text-teal-200">
            Dashboard
          </Link>
        {/* )} */}
      </div>

      <div className="flex items-center space-x-4">
        {/* {user ? ( */}
          {/* <button
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
          >
            Logout
          </button> */}
        {/* ) : ( */}
        {/* { user? <Drawer/> : <li><Login /></li>} */}
        <Login/>
        {/* )} */}
      </div>
    </nav>
  );
}

export default Navbar;
