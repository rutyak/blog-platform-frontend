import React, { useState } from "react";
import { Button, Modal, Box, TextField, FormControlLabel, Checkbox, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Register from "./Register"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [isRegistering, setIsRegistering] = useState(false); // state to toggle between Login and Register

  const { login } = useAuth(); 
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    const credentials = { email, password };

    try {
      await login(credentials); 
      toast.success("Login successful!");
      navigate("/home"); 
    } catch (error) {
      setLoading(false);
      toast.error("Invalid credentials");
    }
  }

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary" className="mb-4">
        Login
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal" aria-describedby="login-modal-description">
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            margin: "auto",
            backgroundColor: "#ffffff",
            color: "#000",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            marginTop: "100px",
          }}
          className="p-6 bg-white rounded-lg shadow-lg"
        >
          {isRegistering ? (
            <Register onBackToLogin={handleBackToLogin} /> // Show Register component
          ) : (
            <>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: "black", fontSize: "22px", marginBottom: "20px" }}>
                Login
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  className="bg-gray-100 rounded-md"
                />

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  className="bg-gray-100 rounded-md"
                />

                <div className="flex justify-between items-center mb-4">
                  <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" sx={{ color: "gray", fontSize: "14px" }} />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ marginBottom: 2 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2"
                  disabled={loading} 
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} {/* Show loading spinner */}
                </Button>

                <div className="text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <span className="text-purple-500 hover:underline cursor-pointer" onClick={handleRegisterClick}>
                    Register
                  </span>
                </div>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Login;
