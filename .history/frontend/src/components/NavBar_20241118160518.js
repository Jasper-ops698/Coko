import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth";
import { signOut } from "firebase/auth"


function NavBar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => console.error("Error during logout:", error));
  };

    const navLinks = [
      { label: 'Home', path: '/' },
      { label: 'Login', path: '/login' },
      { label: 'Sign Up', path: '/signup' },
    ];

    if (user) {
      navLinks.push({ lable: "Dashboard", path: "/dashboard" });
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              COKO
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  color="inherit"
                  sx={{
                    textDecoration: isActive(link.path) ? 'underline' : 'none',
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'block', sm: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
  
        {/* Drawer for Mobile Navigation */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
              {navLinks.map((link) => (
                <ListItem button key={link.path} component={Link} to={link.path}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
}
  

export default NavBar;