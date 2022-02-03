import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Welcome from "../welcome/welcome";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Rainmaker IoT Dashboard</h1>
        <Welcome auth={token} />
        <Router>
          <Routes>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
