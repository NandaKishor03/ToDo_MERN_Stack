import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
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
  
  const handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    axios
      .post("https://todo-backend-uzg4.onrender.com/signup", { username, email, password })
      .then((result) => {
        const user_id = result.data.user_id;
        console.log("Successfully created User", user_id);
        localStorage.setItem("User_id", user_id);
        // window.location.href = "/home";
        navigate("/home");
      })
      .catch((err) => {
        console.log("Error creating user", err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="auth-input"
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="auth-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
