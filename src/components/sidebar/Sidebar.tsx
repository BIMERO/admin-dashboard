import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { VscListSelection } from "react-icons/vsc";
import { PiFileTextBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuUsers } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { LiaKeySolid } from "react-icons/lia";

const Sidebar = ({ isOpen }: any) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div>
        {/* <h2>ADMIN Dashboard</h2> */}
        <img src="/logo.jpg" alt="logo" className="logo" />
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <CiGrid41 style={{ fontSize: "24px" }} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"logs"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <VscListSelection style={{ fontSize: "24px" }} />
              API Call Logs
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"users"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LuUsers style={{ fontSize: "24px" }} />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"api-management"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <VscListSelection style={{ fontSize: "24px" }} />
              API Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"api-keys"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LiaKeySolid style={{ fontSize: "24px" }} />
              API Keys
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"settings"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IoSettingsOutline style={{ fontSize: "24px" }} />
              API Settings
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"notifications"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MdOutlineNotificationImportant style={{ fontSize: "24px" }} />
              Alerts & Notifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"reports"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <PiFileTextBold style={{ fontSize: "24px" }} />
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"support"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <BiSupport style={{ fontSize: "24px" }} />
              Support
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"audit-logs"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <AiOutlineAudit style={{ fontSize: "24px" }} />
              Audit Logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"logout"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LuLogOut style={{ fontSize: "24px" }} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
