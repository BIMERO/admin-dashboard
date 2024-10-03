import React, { useState } from "react";
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
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div>
        {/* <h2>ADMIN Dashboard</h2> */}
        <img src="/logo.jpg" alt="logo" className="logo" />
        <div className="sidebar_list">
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <CiGrid41 style={{ fontSize: "24px" }} />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/users"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <LuUsers style={{ fontSize: "24px" }} />
                Users
              </NavLink>
            </li>
            <li className="sidebar_dropdown">
              <span onClick={toggleDropdown} className="sidebar_dropdown">
                API Management
                <IoIosArrowDown style={{ fontSize: "24px" }} />
              </span>
              {isDropdownOpen && (
                <ul>
                  <li>
                    <NavLink
                      to={"/logs"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleSidebar}
                    >
                      <VscListSelection style={{ fontSize: "24px" }} />
                      API Call Logs
                    </NavLink>
                  </li>
                  <NavLink
                    to={"/api-management"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={toggleSidebar}
                  >
                    <VscListSelection style={{ fontSize: "24px" }} />
                    API Endpoints
                  </NavLink>
                  <li>
                    <NavLink
                      to={"/api-keys"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleSidebar}
                    >
                      <LiaKeySolid style={{ fontSize: "24px" }} />
                      API Keys
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/settings"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleSidebar}
                    >
                      <IoSettingsOutline style={{ fontSize: "24px" }} />
                      API Settings
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to={"/notifications"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <MdOutlineNotificationImportant style={{ fontSize: "24px" }} />
                Alerts & Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <PiFileTextBold style={{ fontSize: "24px" }} />
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/support"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <BiSupport style={{ fontSize: "24px" }} />
                Support
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/audit-logs"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <AiOutlineAudit style={{ fontSize: "24px" }} />
                Audit Logs
              </NavLink>
            </li>
          </ul>

          <ul>
            <li>
              <NavLink
                to={"logout"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={toggleSidebar}
              >
                <LuLogOut style={{ fontSize: "24px" }} />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
