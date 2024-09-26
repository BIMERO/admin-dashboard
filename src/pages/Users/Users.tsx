import React, { useState } from "react";
import "./users.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaUserPlus } from "react-icons/fa6";
import moment from "moment";
import EditUserForm from "./EditUserForm";
import { User } from "../../../interfaces/User";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const Users = ({
  allusers,
  setAllUsers,
  onAddUser,
}: {
  allusers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onAddUser: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dropdown, setDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (userId: number) => {
    setDropdown(dropdown === userId ? null : userId);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setDropdown(null);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowEditModal(false);
  };

  const handleDelete = (userId: number) => {
    setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setDropdown(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <section>
        <h1>User Management</h1>
        <div className="user-mgt">
          <div className="user-header">
            <h2>
              All Users <span>{allusers.length}</span>
            </h2>
            <button onClick={onAddUser}>
              <FaUserPlus />
              Add New User
            </button>
          </div>

          <div className="table">
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      User ID
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Full Name
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Last Login
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allusers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="left">{user.id}</TableCell>
                      <TableCell align="left">{user.fullName}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.role}</TableCell>
                      <TableCell align="left">{user.status}</TableCell>
                      <TableCell align="left">
                        {moment(user.lastLogin).format("YYYY/MM/DD, HH:mm")}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          color: "#4318ff",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleDropdownToggle(user.id)}
                      >
                        View Details{" "}
                        <MdKeyboardArrowDown style={{ fontSize: "1.25rem" }} />
                        {dropdown === user.id && (
                          <div className="dropdown">
                            <p onClick={() => handleEdit(user)}>
                              <CiEdit />
                              Edit
                            </p>
                            <p
                              onClick={() => handleDelete(user.id)}
                              style={{
                                color: "red",
                              }}
                            >
                              <RiDeleteBin6Line />
                              Delete
                            </p>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>

      {showEditModal && selectedUser && (
        <EditUserForm
          user={selectedUser}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Users;
