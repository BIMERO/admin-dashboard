import React from "react";
import "./navbar.css";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { Avatar } from "@mui/material";

const Navbar = ({ toggleSidebar }: any) => {
  return (
    <div className="navbar">
      <nav>
        <div className="menu" onClick={toggleSidebar}>
          <IoMenu style={{ fontSize: "24px" }} />
        </div>
        <h2 style={{ padding: "0px" }}>ADMIN Dashboard</h2>
        <div className="profile">
          <FaRegBell style={{ fontSize: "24px" }} />
          <div className="profile-info">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              style={{ width: "2rem", height: "2rem" }}
            />
            <p>Profile</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
