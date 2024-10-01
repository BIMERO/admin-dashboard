import moment from "moment";
import React, { useState } from "react";
import { User } from "../../interfaces/User";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaCircleArrowLeft } from "react-icons/fa6";

const roles = ["Admin", "Developer", "Viewer"] as const;
const statuses = ["Active", "Inactive"] as const;

const AddUser = ({
  back,
  saveUser,
}: {
  back: () => void;
  saveUser: (user: User) => void;
}) => {
  const [newUser, setNewUser] = useState({
    id: Date.now(),
    fullName: "",
    email: "",
    role: "",
    status: "",
    lastLogin: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
  });
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleRoleSelect = (role: User["role"]) => {
    setNewUser({ ...newUser, role });
  };

  const handleStatusSelect = (status: User["status"]) => {
    setNewUser({ ...newUser, status });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(newUser);
  };

  return (
    <div className="add-user">
      <div className="user-header">
        <FaCircleArrowLeft className="icon" onClick={back} />
        <h1>Add User</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex-inputs">
          <div className="inputs">
            <label className="">FullName</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={newUser.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
            <label className="">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="flex-inputs">
          <div className="inputs">
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
            <label className="">Address</label>
            <input type="text" name="address" placeholder="Home Address" />
          </div>
        </div>

        <div className="flex-inputs">
          <div className="inputs">
            <label className="">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div className="inputs">
            <label className="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="custom-dropdown">
          <label>Role</label>
          <div
            className="dropdown-header"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          >
            {newUser.role ? newUser.role : "Selected role"}
            <span>
              {roleDropdownOpen ? (
                <MdOutlineKeyboardArrowUp style={{ fontSize: "1.125rem" }} />
              ) : (
                <MdOutlineKeyboardArrowDown style={{ fontSize: "1.125rem" }} />
              )}
            </span>
          </div>
          {roleDropdownOpen && (
            <ul className="dropdown-list">
              {roles.map((role) => (
                <li
                  key={role}
                  onClick={() => {
                    setRoleDropdownOpen(false);
                    handleRoleSelect(role);
                  }}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="custom-dropdown">
          <label>Status</label>
          <div
            className="dropdown-header"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            {newUser.status ? newUser.status : "Selected status"}
            <span>
              {statusDropdownOpen ? (
                <MdOutlineKeyboardArrowUp style={{ fontSize: "1.125rem" }} />
              ) : (
                <MdOutlineKeyboardArrowDown style={{ fontSize: "1.125rem" }} />
              )}
            </span>
          </div>
          {statusDropdownOpen && (
            <ul className="dropdown-list">
              {statuses.map((status) => (
                <li
                  key={status}
                  onClick={() => {
                    setStatusDropdownOpen(false);
                    handleStatusSelect(status);
                  }}
                >
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="btns">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="reset" className="save-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
