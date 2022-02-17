import React from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
function NodeExplorer(nodeDetails) {
  return (
    <Box sx={{ minwidth: 500, minHeight: 500 }}>
      <Masonry columns={4} spacing={2}>
        <Paper
          elevation={3}
          sx={{ padding: "25px" }}
          key={nodeDetails.id + "Detail"}
        >
          <Typography variant="h6">Details</Typography>
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
          <Typography variant="h6">Atrributes</Typography>
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

        {Object.keys(nodeDetails.params).map((paramName) => {
          return (
            <Paper
              sx={{ padding: "25px" }}
              elevation={3}
              key={nodeDetails.id + "paper" + paramName}
            >
              <Typography
                key={nodeDetails.id + "name" + paramName}
                variant="h6"
              >
                {paramName}
              </Typography>
              {Object.keys(nodeDetails.params[paramName]).map((paramValue) => {
                return (
                  <Typography
                    key={nodeDetails.id + paramValue + paramName + "value"}
                  >
                    {paramValue} : {nodeDetails.params[paramName][paramValue]}
                  </Typography>
                );
              })}
            </Paper>
          );
        })}
      </Masonry>
    </Box>
  );
}

export default NodeExplorer;
