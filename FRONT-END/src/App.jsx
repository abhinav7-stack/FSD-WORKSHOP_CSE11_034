import { Routes, Route } from "react-router-dom";

import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/dashboard.jsx";
import ApiTester from "./components/api_tester.jsx";

function App() {
  return (
    <Routes>

      {/* Signup */}
      <Route
        path="/"
        element={<Signup />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* API Tester */}
      <Route
        path="/api-tester"
        element={<ApiTester />}
      />

    </Routes>
  );
}

export default App;