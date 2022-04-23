import React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Button, Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SidebarCustom = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="simple-menu"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ minWidth: "40px" }}
            >
                <MoreVertRoundedIcon
                    style={{ color: "black", maxWidth: "22px" }}
                />
            </Button>
            <Menu
                id="simple-menu"
                onClick={handleClose}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{ "aria-labelledby": "simple-menu" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Setting</MenuItem>
                <MenuItem onClick={() => signOut(auth)}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default SidebarCustom;
