// import { Routes, Route, Link } from "react-router-dom";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import History from "./components/History";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("gradient-theme");
      document.documentElement.classList.add("gradient-theme");
    } else {
      document.body.classList.remove("gradient-theme");
      document.documentElement.classList.remove("gradient-theme");
    }

    return () => {
      document.body.classList.remove("gradient-theme");
      document.documentElement.classList.remove("gradient-theme");
    };
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "gradient-theme" : ""}`}>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link">
              Completed
            </Link>
          </li>
          <li className="nav-item toggle-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/history" element={<ProtectedRoute component={History} />}/>
      </Routes>
    </div>
  );
}

export default App;
