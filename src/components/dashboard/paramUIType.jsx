import React from "react";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function isWriteable(paramConfig) {
  if (paramConfig.properties.indexOf("write") >= 0) return true;
  else return false;
}
function ParamUIType(paramConfig, value, deviceName, nodeID) {
  switch (paramConfig.ui_type) {
    case "esp.ui.toggle":
      return (
        <Switch key={nodeID + deviceName + paramConfig.name} checked={value} />
      );
    case "esp.ui.text":
      return (
        <Typography
          display={"inline"}
          key={nodeID + deviceName + paramConfig.name}
        >
          {value}
          {"\n"}
        </Typography>
      );
    case "esp.ui.slider":
      const marks = [
        {
          value: paramConfig.bounds.min,
          label: paramConfig.bounds.min,
        },
        {
          value: value,
          label: value,
        },
        {
          value: paramConfig.bounds.max,
          label: paramConfig.bounds.max,
        },
      ];
      return (
        <Slider
          disabled={!isWriteable(paramConfig)}
          valueLabelDisplay="auto"
          step={paramConfig.bounds.step}
          marks={marks}
          min={paramConfig.bounds.min}
          max={paramConfig.bounds.max}
          defaultValue={value}
          aria-label="slider"
          key={nodeID + deviceName + paramConfig.name}
        />
      );
    case "esp.ui.dropdown":
      const values = [...Array(paramConfig.bounds.max).keys()];
      return (
        <FormControl
          key={nodeID + deviceName + paramConfig.name + "form"}
          fullWidth
        >
          <InputLabel
            key={nodeID + deviceName + paramConfig.name + "input"}
            id={nodeID + deviceName + paramConfig.name}
          ></InputLabel>
          <Select
            labelId={paramConfig.name}
            id={paramConfig.name}
            value={value}
            key={nodeID + deviceName + paramConfig.name + "dropdown"}
          >
            {values.map((val) => {
              return (
                <MenuItem
                  key={nodeID + deviceName + paramConfig.name + "menu" + val}
                  value={val}
                >
                  {val}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );

    default:
      break;
  }
}

export default ParamUIType;
