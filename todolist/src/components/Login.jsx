// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login({ setIsAuthenticated }) {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Dummy authentication logic (Replace with actual authentication)
//     if (credentials.username === "admin" && credentials.password === "password") {
//       setIsAuthenticated(true);
//       navigate("/home");
//     } else {
//       setError("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={credentials.username}
//           onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
