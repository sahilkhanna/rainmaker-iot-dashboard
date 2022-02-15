import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Nodes from "../nodes/nodes";
import Header from "../header/header";

import { ThemeProvider, createTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@mui/material/Paper";
import { Switch } from "@material-ui/core";
function App() {
  const [token, setToken] = useState();
  const [client, setClient] = useState();
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  if (!token) {
    return <Login setToken={setToken} setClient={setClient} />;
  }
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <Paper style={{ height: "100vh" }}>
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<h1>hi</h1>} />
            <Route exact path="/nodes" element={<Nodes RMaker={client} />} />
            <Route
              exact
              path="/dashboard/*"
              element={<Dashboard RMaker={client} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
    //     <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
    //   </Paper>
    // </ThemeProvider>
  );
}

export default App;
