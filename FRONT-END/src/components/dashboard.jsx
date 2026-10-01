import { useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  return (
    <div className="dashboard-container">

      <div className="dashboard-box">

        <h1>User Dashboard</h1>

        {user ? (
          <>
            <div className="welcome-section">
              <h2>Welcome, {user.name} 👋</h2>
              <p>Your account has been created successfully.</p>
            </div>

            <div className="user-details">

              <h3>Account Details</h3>

              <div className="detail-row">
                <span>ID</span>
                <strong>{user.id}</strong>
              </div>

              <div className="detail-row">
                <span>Name</span>
                <strong>{user.name}</strong>
              </div>

              <div className="detail-row">
                <span>Class</span>
                <strong>{user.class}</strong>
              </div>

              <div className="detail-row">
                <span>Registration</span>
                <strong>{user.reg}</strong>
              </div>

            </div>

            <div className="dashboard-actions">

              <button
                onClick={() => navigate("/api-tester")}
              >
                Open API Tester
              </button>

              <button
                className="logout-btn"
                onClick={() => navigate("/login")}
              >
                Logout
              </button>

            </div>
          </>
        ) : (
          <div className="no-user">

            <h2>No User Data Found</h2>

            <p>
              Please create an account or login first.
            </p>

            <button onClick={() => navigate("/signup")}>
              Create Account
            </button>

            <button onClick={() => navigate("/login")}>
              Login
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;