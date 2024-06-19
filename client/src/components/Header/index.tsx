import { AppBar, IconButton, Menu, MenuItem, Theme, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, ListAlt, Person, List, Logout } from '@mui/icons-material';
import React, { useState, MouseEvent, useContext } from "react";
import "./styles.css";
import { AuthContext } from "../../services/AuthService";

const Header = React.memo(() => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { token, logout, user } = useContext(AuthContext);
    const isAuthenticated = Boolean(token);

    const theme: Theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'), {defaultMatches: true});
    
    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" component="div" className="header-text"><ListAlt />&nbsp;Tasks</Typography>
            {isAuthenticated ? (
            <div className="user-info">
                <span>{isSmallScreen ? '' : 'Welcome, '}{user.name}</span>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><Person />&nbsp;Profile</MenuItem>
                    <MenuItem onClick={handleClose}><List />&nbsp;My Tasks</MenuItem>
                    <MenuItem onClick={logout}><Logout />&nbsp;Logout</MenuItem>
                </Menu>
            </div>
          ) : null}
        </Toolbar>
    </AppBar>
});

Header.displayName = 'Header';
export default Header;
