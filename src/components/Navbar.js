import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from "../components/authentication/Login";
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';

function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
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
          <div>
            {/* Profile Icon with Menu */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="menu-appbar"
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
