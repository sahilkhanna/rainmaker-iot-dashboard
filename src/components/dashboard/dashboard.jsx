import React, { Component } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { RiNodeTree } from "react-icons/ri";
import { IoCloudDoneSharp, IoCloudOfflineSharp } from "react-icons/io5";
import { loadingSVG } from "../helper/helper";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";

import "./dashboard.css";
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
  state = {
    nodesInfo: { nodes: [], node_details: [{ id: "" }], total: 0 },
    open: false,
  };
  async componentDidMount() {
    const n = await this.props.RMaker.nodes;
    this.setState({ nodesInfo: n });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => this.setState({ open: false });
  card(nodeDetails) {
    const heights = [
      150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
    ];
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(0.5),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));
    const theme = createTheme();
    return (
      <React.Fragment>
        <Box sx={{ width: 500, minHeight: 393, bgcolor: "background.default" }}>
          <Masonry columns={4} spacing={2}>
            {heights.map((height, index) => (
              <ThemeProvider theme={theme}>
                <Item key={index} sx={{ height }}>
                  {index + 1}
                </Item>
              </ThemeProvider>
            ))}
          </Masonry>
        </Box>
      </React.Fragment>
    );
  }
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
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <ProSidebar>
              <Menu iconShape="circle">
                <SubMenu title="Nodes" defaultOpen={true} icon={<RiNodeTree />}>
                  {this.state.nodesInfo.total > 0
                    ? this.state.nodesInfo.node_details.map((node) => {
                        return node.status.connectivity.connected ? (
                          <MenuItem
                            color="#6adc39"
                            icon={<IoCloudDoneSharp color="#6adc39" />}
                          >
                            {node.id}
                            <Link to={node.id} key={"menu" + node.id} />
                          </MenuItem>
                        ) : (
                          <MenuItem icon={<IoCloudOfflineSharp />}>
                            {node.id}
                            <Link to={node.id} key={"menu" + node.id} />
                          </MenuItem>
                        );
                      })
                    : loadingSVG}
                </SubMenu>
              </Menu>
            </ProSidebar>
          </div>
          <div className="dasboard-content">
            {this.state.nodesInfo.total > 0 ? (
              <Routes>
                {this.state.nodesInfo.node_details.map((node) => {
                  return (
                    <Route
                      path={node.id}
                      key={"route" + node.id}
                      element={this.card(node)}
                    />
                  );
                })}
              </Routes>
            ) : (
              loadingSVG
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
