import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<h1>hi</h1>} />
            <Route exact path="/nodes" element={<Nodes auth={token} />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
