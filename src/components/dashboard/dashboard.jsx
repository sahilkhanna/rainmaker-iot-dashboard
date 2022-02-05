import React, { Component } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core/styles";

function FloatingActionButtons() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon /> Node
      </Fab>
    </Box>
  );
}

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>Dashboard</h2>
        {FloatingActionButtons()}
      </React.Fragment>
    );
  }
}

export default Dashboard;
