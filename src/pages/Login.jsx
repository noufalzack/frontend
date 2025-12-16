import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// ✅ Backend hosted URL
const API_BASE_URL = "https://backend-dw29.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      if (res.status === 200) {
        // ✅ Save token (important)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Success notification
        setSuccess("Logging in...");

        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/products");
        }, 1000);
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
      {/* ✅ Site title (top center, professional) */}
      <h1 className="site-title">Ecom Store</h1>

      <div className="login-container">
        <h2>Login</h2>

        {/* ✅ Error message */}
        {error && <div className="error-box">{error}</div>}

        {/* ✅ Success message */}
        {success && <div className="success-box">{success}</div>}

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
