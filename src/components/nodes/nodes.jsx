import React, { Component } from "react";
import Swagger from "swagger-client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const OPENAPI_URL = "/data/Rainmaker_Swagger.yaml";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function epochToJsDate(ts) {
  const dateObj = new Date(ts);
  return dateObj.toString();
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
async function getUserNodes(token) {
  const apiClient = await Swagger({
    url: OPENAPI_URL,
    responseContentType: "application/json",
    authorizations: { AccessToken: token },
  });
  try {
    // console.log(apiClient);
    const response = await apiClient.apis["User Node Association"].getUserNodes(
      { version: "v1", node_details: true }
    );
    console.log(response.body);
    return response.body;
  } catch (error) {
    console.log(error);
  }
}

class Nodes extends Component {
  state = { nodes: [], total: 0, node_details: [] };
  async componentDidMount() {
    const UserNodes = await getUserNodes(this.props.auth);
    this.setState(UserNodes);
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="node table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Node id</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Last Published</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Firmware</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.node_details.map((node) => (
              <StyledTableRow
                key={node.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {node.id}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{
                    color: node.status.connectivity.connected
                      ? "success.main"
                      : "error.main",
                  }}
                >
                  {node.status.connectivity.connected ? "Online" : "Offline"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {epochToJsDate(node.status.connectivity.timestamp)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {node.config.info.type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {node.config.info.fw_version}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default Nodes;
