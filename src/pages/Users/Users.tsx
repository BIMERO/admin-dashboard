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
import { User } from "../../interfaces/User";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteUser,
  filterUsers,
  getEditUser,
  updateUserStatus,
} from "../../config/apiService";

const Users = ({
  allusers,
  setAllUsers,
  onAddUser,
}: {
  allusers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onAddUser: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dropdown, setDropdown] = useState<number | null>(null);
  const [filterName, setFilterName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allusers);

  const handleDropdownToggle = (userId: number) => {
    setDropdown(dropdown === userId ? null : userId);
  };

  const handleEdit = async (userId: number) => {
    const response = await getEditUser(userId);
    setSelectedUser(response.data);
    setShowEditModal(true);
    setDropdown(null);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowEditModal(false);
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await deleteUser(userId); // Assuming deleteUser is an API call
      // Update the state to remove the deleted user
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      setDropdown(null); // Assuming this clears the dropdown or some state
      alert("user has been deleted");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optional: Handle error (e.g., show a notification)
    }
  };

  const handleToggle = async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await updateUserStatus(userId, { status: newStatus }); // Send POST request
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      alert("user status has been updated");
    } catch (error) {
      console.error("Error updating user status:", error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  const handleFilter = async () => {
    const filters = {
      filterName: filterName || null,
      filterStatus: filterStatus || null,
      filterEmail: filterEmail || null,
      filterType: filterType || null,
    };
    const response = await filterUsers(filters);
    setFilteredUsers(response.data);
  };

  return (
    <div style={{ position: "relative" }}>
      <section>
        <h1>User Management</h1>
        <div className="user-mgt">
          <div
            className="user-header"
            style={{ justifyContent: "space-between" }}
          >
            <h2>
              All Users <span>{allusers.length}</span>
            </h2>
            <button onClick={onAddUser}>
              <FaUserPlus />
              Create User
            </button>
          </div>

          <div className="filters">
            <div className="inputs">
              <input
                type="text"
                placeholder="Search Name...."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <input
                type="text"
                placeholder="Search Email...."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>

            <div className="inputs">
              <input
                type="text"
                placeholder="Search type...."
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </div>
            <div className="inputs">
              <input
                type="text"
                placeholder="Search type...."
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              />
            </div>
            <button onClick={handleFilter}>Filter</button>
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
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Enable
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allusers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="left">{user.id}</TableCell>
                      <TableCell align="left">{`${user.first_name} ${user.last_name}`}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.type}</TableCell>
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
                            <p onClick={() => handleEdit(user.id)}>
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
                      <TableCell align="left">
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            name={`check-${user.id}`}
                            id={`check-${user.id}`}
                            checked={user.status === "active"}
                            onChange={() => handleToggle(user.id, user.status)}
                          />
                          <label
                            htmlFor={`check-${user.id}`}
                            className="toggle-btn"
                          ></label>
                        </div>
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
          allUsers={allusers}
        />
      )}
    </div>
  );
};

export default Users;
