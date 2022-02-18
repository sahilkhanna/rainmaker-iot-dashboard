import React from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
const CardHeaderTypography = styled(Typography)(({ theme }) => ({
  "&": {
    color: theme.palette.primary.main,
  },
}));
function NodeExplorer(nodeDetails) {
  console.log(nodeDetails);
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
              <CardHeaderTypography variant="h6">
                {device.name}
              </CardHeaderTypography>
              {device.params.map((param, idx) => {
                return (
                  <React.Fragment>
                    <Container>
                      <Typography
                        display={"inline"}
                        key={
                          nodeDetails.id +
                          "paramName" +
                          device.name +
                          param.name
                        }
                        sx={{ color: "text.secondary" }}
                      >
                        {param.name}:{" "}
                      </Typography>
                      <Typography
                        display={"inline"}
                        key={
                          nodeDetails.id +
                          "paramName" +
                          device.name +
                          param.name +
                          "val"
                        }
                      >
                        {nodeDetails.params[device.name][param.name]}
                        {"\n"}
                      </Typography>
                      {"\n"}
                      {param.properties.indexOf("write") >= 0 ? (
                        <Typography
                          key={
                            nodeDetails.id +
                            "paramName" +
                            device.name +
                            param.name +
                            idx
                          }
                        >
                          writeable
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Container>
                  </React.Fragment>
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
