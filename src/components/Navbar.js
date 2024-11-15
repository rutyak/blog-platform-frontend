import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from "../components/authentication/Login";
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profile from "../components/Profile/Profile";

function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <nav className="bg-teal-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-semibold hover:text-teal-200">
          Home
        </Link>
        {user && (
          <Link to="/dashboard" className="text-lg hover:text-teal-200">
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <Profile/>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
