import React, { Component } from "react";
// import { darken, lighten } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { loadingSVG } from "../helper/helper";
const columns = [
  {
    field: "id",
    headerName: "Node ID",
    width: 290,
    cellClassName: "id--cell",
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    cellClassName: (params) =>
      clsx("status-cell", {
        online: params.value === "Online",
        offline: params.value === "Offline",
      }),
  },
  {
    field: "lastpublished",
    headerName: "Last Published",
    width: 550,
  },
  {
    field: "type",
    headerName: "Type",
    width: 110,
  },
  {
    field: "firmware",
    headerName: "Firmware",
    width: 110,
  },
];

function epochToJsDate(ts) {
  const dateObj = new Date(ts);
  return dateObj.toString();
}

class Nodes extends Component {
  state = { rows: [], loading: false };
  async componentDidMount() {
    this.setState({ loading: true });
    const n = await this.props.RMaker.nodes;
    let rows = [];
    n.node_details.forEach((node) => {
      let row = {
        id: node.id,
        status: node.status.connectivity.connected ? "Online" : "Offline",
        lastpublished: epochToJsDate(node.status.connectivity.timestamp),
        type: node.config.info.type,
        firmware: node.config.info.fw_version,
      };
      rows = rows.concat(row);
    });
    this.setState({ rows: rows, loading: false });
  }
  render() {
    return (
      <React.Fragment>
        <Box
          sx={{
            height: 700,
            width: "100%",
            "& .id--cell": {
              fontWeight: "200",
            },
            "& .status-cell.online": {
              color: "#6adc39",
              fontWeight: "600",
            },
            "& .status-cell.offline": {
              color: "#ff5722",
            },
            "& .row--Offline": {
              fontSize: 12,
            },
            "& .row--Online": {
              fontWeight: "600",
              fontSize: 14,
            },
          }}
        >
          <DataGrid
            rows={this.state.rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowClassName={(params) => `row--${params.row.status}`}
            sx={{
              boxShadow: 14,
            }}
          />
        </Box>
        {this.state.loading ? loadingSVG : ""}
      </React.Fragment>
    );
  }
}

export default Nodes;
