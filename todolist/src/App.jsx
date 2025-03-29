import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import History from "./components/History";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

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
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-none d-md-block" to="/">
            Todo App
          </Link>

          <div className="d-flex d-md-none align-items-center w-100">
            <Link className="navbar-brand" to="/">
              Todo App
            </Link>
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="d-none d-md-flex align-items-center">
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  Completed
                </Link>
              </li>
            </ul>
            <div className="ms-3 toggle-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleTheme}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end d-md-none"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    data-bs-dismiss="offcanvas"
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/home"
                    data-bs-dismiss="offcanvas"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/history"
                    data-bs-dismiss="offcanvas"
                  >
                    Completed
                  </Link>
                </li>
                <li className="nav-item mt-3">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={toggleTheme}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="ms-2">{darkMode ? "Dark" : "Light"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route
            path="/history"
            element={<ProtectedRoute component={History} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
