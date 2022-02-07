import { makeStyles } from "@material-ui/core";
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
    backgroundColor: "#111000",
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
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    "&:hover": {
      background: "#eee",
      color: "#111",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
export default function Header() {
  const { header, logo, menuButton, toolbar } = useStyles();

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
      Rainmaker IoT Dashboard
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
          <Avatar alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
        {getProfileMenu()}
      </Menu>
    </Box>
  );
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          key={label}
          color={"inherit"}
          exact={"true"}
          to={href}
          component={NavLink}
          className={menuButton}
          variant={"outlined"}
        >
          {label}
        </Button>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar disableGutters className={toolbar}>
        {headerLogo}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {getMenuButtons()}
        </Box>
        {profile}
      </Toolbar>
    );
  };
  return (
    <header>
      <AppBar position="fixed" className={header}>
        {displayDesktop()}
      </AppBar>
      <Toolbar />
    </header>
  );
}
