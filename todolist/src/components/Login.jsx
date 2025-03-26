require("dotenv").config();
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password })
      .then((result) => {
        const user_id = result.data.user_id;
        console.log("Successfully Logged In", user_id);
        localStorage.setItem("User_id", user_id);
        // window.location.href = "/home";
        navigate("/home");
      })
      .catch((err) => {
        console.log("Error Logging In", err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="auth-input"
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="auth-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
