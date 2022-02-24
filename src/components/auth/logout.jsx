import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loadingSVG } from "../helper/helper";
import { BsFillCloudRainFill } from "react-icons/bs";
import { IconContext } from "react-icons";

import { Navigate } from "react-router-dom";

export default function Login({ setClient }) {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
    setClient({ connected: false });
  }, 2000);
  return (
    <Container component="main" maxWidth="xs">
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
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          Logging Out &nbsp;{loading ? loadingSVG : <Navigate to="/" />}
        </Typography>
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setClient: PropTypes.func.isRequired,
};
