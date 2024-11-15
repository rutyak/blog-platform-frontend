import React, { useState } from "react";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Register = ({ onBackToLogin }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true); // Start loading

    try {
      const obj = {
        username,
        email,
        password,
      };

      const { success } = await register(obj); // Register returns a success message
      if (success) {
        toast.success("Registed successfully !!");
        setLoading(false);
      }
      onBackToLogin();
    } catch (error) {
      // If registration fails (e.g., user already exists), show the error message
      toast.error(error.message || "An error occurred during registration");
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ color: "black", fontSize: "22px", marginBottom: "20px" }}
      >
        Register
      </Typography>

      <TextField
        label="Username"
        type="text"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleSubmit}
        sx={{ marginBottom: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>

      <div className="text-gray-600 mt-6">
        Already have an account?{" "}
        <span
          className="text-purple-500 hover:underline cursor-pointer"
          onClick={onBackToLogin}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default Register;
