import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import History from "./components/History";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link">
              History
            </Link>
          </li>
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
