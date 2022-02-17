import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Nodes from "../nodes/nodes";
import Header from "../header/header";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import GlobalStyles from "@mui/material/GlobalStyles";
function App() {
  const [token, setToken] = useState();
  const [client, setClient] = useState();
  const [light, setLight] = React.useState(false);
  const themeLight = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#e4f0e2",
      },
    },
  });

  const themeDark = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#222222",
      },
    },
  });
  if (!token) {
    return (
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Login setToken={setToken} setClient={setClient} />
        <Switch checked={light} onChange={() => setLight(!light)} />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#aaa" },
        }}
      />
      <Paper>
        <CssBaseline />
        <div className="App">
          <div className="wrapper">
            <Router>
              <Header theme={light ? themeLight : themeDark} />
              <Routes>
                <Route exact path="/" element={<h1>hi</h1>} />
                <Route
                  exact
                  path="/nodes"
                  element={
                    <Nodes
                      RMaker={client}
                      theme={light ? themeLight : themeDark}
                    />
                  }
                />
                <Route
                  exact
                  path="/dashboard/*"
                  element={
                    <Dashboard
                      RMaker={client}
                      theme={light ? themeLight : themeDark}
                    />
                  }
                />
              </Routes>
            </Router>
          </div>
        </div>
        <Switch checked={light} onChange={() => setLight(!light)} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
