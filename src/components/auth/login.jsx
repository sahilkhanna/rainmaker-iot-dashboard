import React, { useState } from "react";
import RainMaker from "../rainmaker/rainmaker";
import PropTypes from "prop-types";
import { loadingSVG } from "../helper/helper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsFillCloudRainFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Switch from "@mui/material/Switch";
async function loginUser(credentials) {
  const client = new RainMaker(credentials.user_name, credentials.password);
  const result = await client.authenticate();
  return { result: result, client: client };
}
// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function setRefreshToken(token) {
  sessionStorage.setItem("refreshToken", token);
}

export default function Login({ setClient }) {
  const [loading, setLoading] = useState();
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
      spacing: 8,
    },
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
      spacing: 8,
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const response = await loginUser({
      user_name: email,
      password,
    });
    setLoading(false);
    if ((response.result.status = 200)) {
      setRefreshToken(response.client.refreshToken);
      setClient(response.client);
    }
  };

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        {/* <Paper elevated={0} sx={{ p: 2, mx: "auto" }}> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <BsFillCloudRainFill />
            </IconContext.Provider>
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Rainmaker IoT Dashboard
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained">
              {loading ? loadingSVG : "Sign In"}
            </Button>
          </Box>
        </Box>

        <Switch checked={light} onChange={() => setLight(!light)} />
        {/* </Paper> */}
      </Container>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setClient: PropTypes.func.isRequired,
};
