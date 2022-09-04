import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import { Link as NextLink } from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import MohoSVG from "./MohoSVG";

import { useState } from "react";
import { auth } from "../services/firebase";

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
          sx={{
            flexGrow: 1,
            fontSize: 27,
            fontWeight: 600,
          }}
        >
          <Link sx={{ color: "white" }} href="/">
            <MohoSVG color={"white"} height={45} />
            AUTH
          </Link>
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="admin navigation options"
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
            <MenuItem onClick={handleClose}>
              <Link component={NextLink} href="/code">
                Your QR Code
              </Link>
            </MenuItem>
            <MenuItem onClick={() => auth.signOut()}>Sign-Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
