import React, { Component } from "react";
import { darken, lighten } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import clsx from "clsx";
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

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

function epochToJsDate(ts) {
  const dateObj = new Date(ts);
  return dateObj.toString();
}

class Nodes extends Component {
  state = { rows: [] };
  async componentDidMount() {
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
    this.setState({ rows: rows });
  }
  render() {
    return (
      <React.Fragment>
        <Box
          sx={{
            height: 400,
            width: "100%",
            color: "#ccc",
            "& .MuiCheckbox-root svg": {
              width: 16,
              height: 16,
              backgroundColor: "transparent",
              border: "1px solid #d9d9d9",
              borderRadius: 2,
            },
            "& .id--cell": {
              fontWeight: "600",
            },
            "& .status-cell.online": {
              color: "#6adc39",
              fontWeight: "600",
            },
            "& .status-cell.offline": {
              color: "#ff5722",
              fontWeight: "600",
            },
            "& .row--Offline": {
              bgcolor: () => getBackgroundColor("#444", "dark"),
              color: "#999",
              "&:hover": {
                bgcolor: () => getHoverBackgroundColor("#444", "dark"),
              },
            },
            "& .row--Online": {
              bgcolor: (theme) => getBackgroundColor("#fff", "dark"),
              color: "#fff",
              fontSize: 16,
              "&:hover": {
                bgcolor: (theme) => getHoverBackgroundColor("#fff", "dark"),
              },
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
              boxShadow: 24,
              color: "#fff",
              backgroundColor: "#111",
              "& .MuiDataGrid-row": {
                color: "#555",
              },
              "& .MuiDataGrid-row:hover": {
                color: "#222",
              },
            }}
          />
        </Box>
      </React.Fragment>
    );
  }
}

export default Nodes;
