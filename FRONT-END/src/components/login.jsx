import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          name: name,
          reg: reg
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      const user = response.data.user;

      navigate("/dashboard", {
        state: {
          user: user
        }
      });

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Invalid name or registration"
        );
      } else if (error.request) {
        setError(
          "Backend is not responding. Make sure the server is running."
        );
      } else {
        setError(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8"
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.12)"
        }}
      >
        <h1>Login</h1>
        <p>Login to your account</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box"
            }}
          />

          <input
            type="text"
            placeholder="Enter registration"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#999" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px",
              background: "#ffe5e5",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            {error}
          </p>
        )}

        <p style={{ marginTop: "20px" }}>
          Don't have an account?
        </p>

        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "100%",
            padding: "10px",
            background: "#555",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Login;