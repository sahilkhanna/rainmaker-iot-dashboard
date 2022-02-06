import React, { Component } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#111",
  border: "2px solid #000",
  borderRadius: "15px!important",
  boxShadow: 10,
  p: 4,
};
function FloatingActionButtons(handleEvent) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        onClick={handleEvent}
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
  state = { nodesInfo: {}, open: false };
  async componentDidMount() {
    const n = await this.props.RMaker.nodes;
    this.setState({ nodesInfo: n });
  }

  handleOpen = () => {
    console.log(this.state.open);
    this.setState({ open: true });
  };
  handleClose = () => this.setState({ open: false });
  nodeList() {
    return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <Box sx={ModalStyle}></Box>
        </Fade>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        <h2>Dashboard</h2>
        {FloatingActionButtons(this.handleOpen)}
        {this.nodeList()}
      </React.Fragment>
    );
  }
}

export default Dashboard;
