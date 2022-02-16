import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { RiNodeTree } from "react-icons/ri";
import { IoCloudDoneSharp, IoCloudOfflineSharp } from "react-icons/io5";
import { loadingSVG } from "../helper/helper";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./dashboard.css";
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
    console.log(nodeDetails);
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(0.5),
      textAlign: "center",
    }));
    const StyledAccordion = styled(Accordion)(({ theme }) => ({
      color: theme.palette.text.secondary,
    }));
    return (
      <React.Fragment>
        <Box sx={{ minwidth: 500, minHeight: 500 }}>
          <Masonry columns={4} spacing={2}>
            <Paper key={nodeDetails.id + "Detail"}>
              <StyledAccordion expanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>ID: {nodeDetails.id}</Typography>
                  {Object.keys(nodeDetails.config.info).map((key) => {
                    return (
                      <Typography key={nodeDetails.id + key}>
                        {key} : {nodeDetails.config.info[key]}
                      </Typography>
                    );
                  })}
                </AccordionDetails>
              </StyledAccordion>
            </Paper>
            <Paper key={nodeDetails.id + "Attributes"}>
              <StyledAccordion
                expanded={true}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Atrributes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {nodeDetails.config.attributes.map((attr) => {
                    return Object.keys(attr).map((key) => {
                      return (
                        <Typography key={nodeDetails.id + attr[key]}>
                          {attr[key]}
                        </Typography>
                      );
                    });
                  })}
                </AccordionDetails>
              </StyledAccordion>
            </Paper>

            {Object.keys(nodeDetails.params).map((paramName) => {
              return (
                <Paper key={nodeDetails.id + nodeDetails.params[paramName]}>
                  <StyledAccordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">{paramName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {Object.keys(nodeDetails.params[paramName]).map(
                        (paramValue) => {
                          return (
                            <Typography>
                              {paramValue} :{" "}
                              {nodeDetails.params[paramName][paramValue]}
                            </Typography>
                          );
                        }
                      )}
                    </AccordionDetails>
                  </StyledAccordion>
                </Paper>
              );
            })}
          </Masonry>
        </Box>
      </React.Fragment>
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
