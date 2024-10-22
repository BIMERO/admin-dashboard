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
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteUser,
  filterUsers,
  getEditUser,
  updateUserStatus,
} from "../../config/apiService";
import MUIDataTable from "mui-datatables";

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
      filterName: filterName || "",
      filterStatus: filterStatus || "",
      filterEmail: filterEmail || "",
      filterType: filterType || "",
    };
    const response = await filterUsers(filters);
    setFilteredUsers(response.data);
  };

  const columns = [
    { name: "id", label: "User ID", options: { sort: true } },
    {
      name: "fullName",
      label: "Full Name",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const user = allusers[tableMeta.rowIndex];
          return `${user.first_name} ${user.last_name}`;
        },
      },
    },
    { name: "email", label: "Email", options: { sort: true } },
    { name: "type", label: "Role", options: { sort: true } },
    { name: "status", label: "Status", options: { sort: true } },
    {
      name: "lastLogin",
      label: "Last Login",
      options: {
        customBodyRender: (value: any) =>
          moment(value).format("YYYY/MM/DD, HH:mm"),
      },
    },

    {
      name: "enable",
      label: "Enable",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const user = allusers[tableMeta.rowIndex];
          return (
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
          );
        },
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const user = allusers[tableMeta.rowIndex];
          return (
            <div
              className="action-btn"
              onClick={() => handleDropdownToggle(user.id)}
            >
              <CiMenuKebab style={{ fontSize: "1.5rem" }} />
              {dropdown === user.id && (
                <div className="dropdown">
                  <p onClick={() => handleEdit(user.id)}>
                    <CiEdit />
                    Edit
                  </p>
                  <p
                    onClick={() => handleDelete(user.id)}
                    style={{ color: "red" }}
                  >
                    <RiDeleteBin6Line />
                    Delete
                  </p>
                </div>
              )}
            </div>
          );
        },
      },
    },
  ];

  const tableData = allusers.map((user) => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}}`,
    email: user.email,
    type: user.type,
    status: user.status,
    lastLogin: user.lastLogin,
    action: "",
    enable: "",
  }));

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

          {/* <div className="filters">
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
          </div> */}

          <div className="users-table">
            <MUIDataTable
              title={""}
              data={tableData}
              columns={columns}
              options={{
                filterType: "checkbox",
                responsive: "standard",
                selectableRows: "none",
                elevation: 0,
              }}
            />
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
