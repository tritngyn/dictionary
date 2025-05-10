import React from "react";
import { NavLink } from "react-router-dom";

import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
function NAV({ darkMode, setDarkMode }) {
    return (
        <div className="topnav">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>HOME</NavLink>
            <NavLink to="/user" className={({ isActive }) => isActive ? "active" : ""}> USER </NavLink>
            <div className="nav-right">
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </div>
        </div>
    );
}

export default NAV;
