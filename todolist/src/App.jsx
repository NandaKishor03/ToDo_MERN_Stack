// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import History from "./components/History";
// import "./App.css";

// function App() {
//   return (
//     <div className="app">
//       <nav className="nav">
//         <ul className="nav-list">
//           <li className="nav-item">
//             <Link to="/home" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/history" className="nav-link">
//               History
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/history" element={<History />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import History from "./components/History";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Apply theme class to both body and html when darkMode changes
    if (darkMode) {
      document.body.classList.add('gradient-theme');
      document.documentElement.classList.add('gradient-theme');
    } else {
      document.body.classList.remove('gradient-theme');
      document.documentElement.classList.remove('gradient-theme');
    }
    
    // Clean up function
    return () => {
      document.body.classList.remove('gradient-theme');
      document.documentElement.classList.remove('gradient-theme');
    };
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'gradient-theme' : ''}`}>
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

      {/* Define Routes */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;