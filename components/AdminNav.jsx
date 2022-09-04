import { AppBar, Toolbar, Typography, IconButton, Link } from "@mui/material";
import { Link as NextLink } from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MohoSVG from "./MohoSVG";

import { useState } from "react";

export default function AdminNav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            fontSize: 30,
            fontWeight: 400,
            fontFamily: "Roboto",
          }}
        >
          <Link sx={{ color: "white" }} href="/">
            <MohoSVG color={"white"} height={50} />
            AUTH
          </Link>
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link component={NextLink} href="/admin/users">
                Users
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link component={NextLink} href="/admin/keys">
                Global Keys
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
