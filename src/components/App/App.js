import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Welcome from "../welcome/welcome";
import Nodes from "../nodes/nodes";
import Header from "../header/header";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Rainmaker IoT Dashboard</h1>
        {/* <Header auth={token} /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Nodes auth={token} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
