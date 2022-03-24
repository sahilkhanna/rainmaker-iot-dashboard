import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import NodeExplorer from "./nodeExplore";

const CardHeaderTypography = styled(Typography)(({ theme }) => ({
  "&": {
    color: theme.palette.primary.main,
  },
}));

function groupInfoPopulate(groupDetails) {
  return (
    <React.Fragment>
      <Box sx={{ minwidth: 500, minHeight: 500 }}>
        <Masonry columns={4} spacing={2}>
          <Paper
            elevation={3}
            sx={{ padding: "25px" }}
            key={groupDetails.group_id + "Detail"}
          >
            <CardHeaderTypography variant="h6">Details</CardHeaderTypography>
            <Typography>Name: {groupDetails.group_name}</Typography>
          </Paper>
        </Masonry>
      </Box>
    </React.Fragment>
  );
}

class GroupExplorer extends Component {
  state = { groupDetails: {}, ready: false };
  async componentDidMount() {
    const groupDeets = await this.props.RMaker.getUserGroupDetails(
      this.props.groupDetails.group_id
    );
    console.dir(groupDeets);
    this.setState({ groupDetails: this.props.groupDetails, ready: true });
  }
  componentDidUpdate(prevProps) {
    if (this.props.groupDetails !== prevProps.groupDetails) {
      this.setState({ groupDetails: this.props.groupDetails, ready: true });
    }
  }
  render() {
    return this.state.ready ? groupInfoPopulate(this.state.groupDetails) : "";
  }
}

export default GroupExplorer;
