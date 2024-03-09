import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Auth/auth.slice";

export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store?.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <nav className="fixed top-0 w-full px-[6%] py-4 flex items-center justify-between bg-slate-700 z-50">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-purple-500 cursor-pointer"
      >
        <span>Library</span>
      </div>

      <div className="cursor-pointer">
        <Avatar
          sx={{ bgcolor: deepPurple[500] }}
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          {userData.name.charAt(0).toUpperCase()}
        </Avatar>
        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="p-4 flex flex-col gap-4">
            <div
              onClick={() => {
                navigate("/personal-library");
                handleClose();
              }}
              className="flex items-center gap-2 cursor-pointer hover:bg-purple-500 hover:text-white"
            >
              <LibraryBooksIcon />
              <p className="text-lg font-semibold">My Library</p>
            </div>
            <div
              onClick={() => {
                dispatch(logout())
                handleClose();
              }}
              className="flex items-center gap-2 cursor-pointer hover:bg-purple-500 hover:text-white"
            >
              <LogoutIcon />
              <p className="text-lg font-semibold">LogOut</p>
            </div>
          </div>
        </Popover>
      </div>
    </nav>
  );
}
