import { makeStyles, MenuList, ThemeProvider } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { IconContext } from "react-icons";
import { BsFillCloudRainFill } from "react-icons/bs";
const headersData = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Nodes",
    href: "/nodes",
  },
];

const profileLinks = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Logut",
    href: "/logout",
  },
];
const useStyles = makeStyles(() => ({
  header: {
    paddingRight: "19px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    padding: "15px",
    borderRadius: "5px",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
export default function Header(props) {
  const { logo, menuButton, toolbar } = useStyles();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const headerLogo = (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
      className={logo}
    >
      <IconContext.Provider value={{ size: "1.5em" }}>
        <BsFillCloudRainFill />
      </IconContext.Provider>
      &nbsp;Rainmaker IoT Dashboard
    </Typography>
  );
  const getProfileMenu = () => {
    return profileLinks.map(({ label, href }) => {
      return (
        <MenuItem
          key={"menu" + label}
          onClick={handleCloseUserMenu}
          component={NavLink}
          to={href}
        >
          <Typography textAlign="center">{label}</Typography>
        </MenuItem>
      );
    });
  };
  const profile = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Profile" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ width: 120, maxWidth: "100%", mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuList>{getProfileMenu()}</MenuList>
      </Menu>
    </Box>
  );
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          key={label}
          size="small"
          // color={"primary"}
          exact={"true"}
          to={href}
          component={NavLink}
          className={menuButton}
          sx={{
            ":hover": {
              color: "white",
            },
          }}
          variant={"text"}
        >
          {label}
        </Button>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {headerLogo}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {getMenuButtons()}
        </Box>
        {profile}
      </Toolbar>
    );
  };
  console.log(props.theme.palette);
  return (
    <header>
      <ThemeProvider theme={props.theme}>
        <AppBar position="fixed" color="primary">
          {displayDesktop()}
        </AppBar>
        <Toolbar />
      </ThemeProvider>
    </header>
  );
}
