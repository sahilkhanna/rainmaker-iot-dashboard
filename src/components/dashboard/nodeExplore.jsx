import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ParamUIType from "./paramUIType";

const CardHeaderTypography = styled(Typography)(({ theme }) => ({
  "&": {
    color: theme.palette.primary.main,
  },
}));

function DisplayParams(device, nodeDetails) {
  return device.params.map((param) => {
    return (
      <Container key={nodeDetails.id + "container" + device.name + param.name}>
        <Typography
          display={"inline"}
          key={nodeDetails.id + "paramName" + device.name + param.name}
          sx={{ color: "text.secondary" }}
        >
          {param.name}:{" "}
        </Typography>
        {ParamUIType(
          param,
          nodeDetails.params[device.name][param.name],
          device.name,
          nodeDetails.id
        )}
        {"\n"}
      </Container>
    );
  });
}
function nodeInfoPopulate(nodeDetails) {
  return (
    <Box sx={{ minwidth: 500, minHeight: 500 }}>
      <Masonry columns={4} spacing={2}>
        <Paper
          elevation={3}
          sx={{ padding: "25px" }}
          key={nodeDetails.id + "Detail"}
        >
          <CardHeaderTypography variant="h6">Details</CardHeaderTypography>
          <Typography>ID: {nodeDetails.id}</Typography>
          {Object.keys(nodeDetails.config.info).map((key) => {
            return (
              <Typography key={nodeDetails.id + "detail" + key}>
                {key} : {nodeDetails.config.info[key]}
              </Typography>
            );
          })}
        </Paper>
        <Paper
          elevation={3}
          sx={{ padding: "25px" }}
          key={nodeDetails.id + "Attributes"}
        >
          <CardHeaderTypography variant="h6">Atrributes</CardHeaderTypography>
          {nodeDetails.config.attributes.map((attr) => {
            return Object.keys(attr).map((key) => {
              return (
                <Typography key={nodeDetails.id + attr[key]}>
                  {attr[key]}
                </Typography>
              );
            });
          })}
        </Paper>

        {nodeDetails.config.devices.map((device) => {
          return (
            <Paper
              sx={{ padding: "25px" }}
              elevation={3}
              key={nodeDetails.id + "paper" + device.name}
            >
              <CardHeaderTypography
                key={nodeDetails.id + "deviceName" + device.name}
                variant="h6"
              >
                {device.name}
              </CardHeaderTypography>
              {DisplayParams(device, nodeDetails)}
            </Paper>
          );
        })}
      </Masonry>
    </Box>
  );
}

class NodeExplorer extends Component {
  state = { nodeDetails: {}, ready: false };
  componentDidMount() {
    this.setState({ nodeDetails: this.props.nodeDetails, ready: true });
  }
  componentDidUpdate(prevProps) {
    if (this.props.nodeDetails !== prevProps.nodeDetails) {
      this.setState({ nodeDetails: this.props.nodeDetails, ready: true });
    }
  }
  render() {
    return this.state.ready ? nodeInfoPopulate(this.state.nodeDetails) : "";
  }
}

export default NodeExplorer;
