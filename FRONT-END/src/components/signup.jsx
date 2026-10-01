import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userClass: "",
    reg: ""
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle account creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/create",
        {
          name: formData.name,
          class: formData.userClass,
          reg: formData.reg
        }
      );

      console.log("Backend response:", response.data);

      // Get the newly created user
      const createdUser = response.data.user;

      console.log("Created user:", createdUser);

      // Send user to Dashboard
      navigate("/dashboard", {
        state: {
          user: createdUser
        }
      });

    } catch (error) {

      console.error("Signup error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Unable to create account"
        );
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-box">

        <h1>Create Account</h1>

        <p>Sign up to continue</p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Class */}
          <input
            type="text"
            name="userClass"
            placeholder="Enter your class"
            value={formData.userClass}
            onChange={handleChange}
            required
          />

          {/* Registration */}
          <input
            type="text"
            name="reg"
            placeholder="Enter registration"
            value={formData.reg}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        {/* Error message */}
        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* Login redirect */}
        <div className="login-redirect">

          <p>Already have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;