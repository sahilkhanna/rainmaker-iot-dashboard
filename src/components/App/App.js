import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Nodes from "../nodes/nodes";
import Header from "../header/header";
import RainMaker from "../rainmaker/rainmaker";
function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  let RMaker = new RainMaker(token);
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<h1>hi</h1>} />
            <Route exact path="/nodes" element={<Nodes RMaker={RMaker} />} />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard RMaker={RMaker} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
