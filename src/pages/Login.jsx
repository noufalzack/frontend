import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/products");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to login. Please try again later.");
      }
    }
  };

  return (
    <>
      <h1 className="site-title">Ecom Store</h1>

      <div className="login-container">
        <h2>Login</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <div className="switch-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
