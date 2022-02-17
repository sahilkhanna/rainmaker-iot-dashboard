import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Nodes from "../nodes/nodes";
import Header from "../header/header";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import Container from "@mui/material/Container";
function App() {
  const [token, setToken] = useState();
  const [client, setClient] = useState();
  const [light, setLight] = React.useState(false);
  const themeLight = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#b53f87",
      },
      secondary: {
        main: "#f50057",
      },
    },
    spacing: 8,
  });

  const themeDark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#b53f87",
      },
      secondary: {
        main: "#f50057",
      },
    },
    spacing: 8,
  });
  if (!token) {
    return <Login setToken={setToken} setClient={setClient} />;
  }
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />

      <Container component="main" maxWidth="false" sx={{ p: 2 }}>
        <Router>
          <Header theme={light ? themeLight : themeDark} />
          <Routes>
            <Route exact path="/" element={<h1>hi</h1>} />
            <Route
              exact
              path="/nodes"
              element={
                <Nodes RMaker={client} theme={light ? themeLight : themeDark} />
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
      </Container>
      <Switch checked={light} onChange={() => setLight(!light)} />
    </ThemeProvider>
  );
}

export default App;
