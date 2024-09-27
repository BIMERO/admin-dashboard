import React, { useState } from "react";
import "./apimanagement.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import EditForm from "./EditForm";
import { FaUserPlus } from "react-icons/fa6";
import { HeaderProps } from "../../../interfaces/Headers";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // restrict to common HTTP methods
  description: string;
  headers: HeaderProps[];
  payload: Record<string, any>; // flexible type for payload (can be empty or contain data)
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any; // allows additional parameters if needed
  };
  enabled: boolean;
  baseUrlId: string;
}

const APIManagement = ({
  allAPIs,
  onAddAPI,
  setAllAPIs,
}: {
  allAPIs: any[];
  setAllAPIs: React.Dispatch<React.SetStateAction<any[]>>;
  onAddAPI: () => void;
}) => {
  const [dropdown, setDropdown] = useState<number | null>(null);
  const [selectedAPI, setSelectedAPI] = useState<APIManagementProps | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDropdownToggle = (userId: number) => {
    setDropdown(dropdown === userId ? null : userId);
  };

  const handleEdit = (user: APIManagementProps) => {
    setSelectedAPI(user);
    setShowEditModal(true);
    setDropdown(null);
  };

  const handleSaveEdit = (updatedAPI: APIManagementProps) => {
    setAllAPIs((prevAPIs) =>
      prevAPIs.map((api) => (api.id === updatedAPI.id ? updatedAPI : api))
    );
    setShowEditModal(false);
  };

  const handleDelete = (ApiId: number) => {
    setAllAPIs((prevAPIs) => prevAPIs.filter((api) => api.id !== ApiId));
    setDropdown(null);
  };

  return (
    <>
      <section className="api_management">
        <h1>API Endpoints Management</h1>

        <div
          className="user-header"
          style={{ justifyContent: "space-between" }}
        >
          <h2>
            All APIs <span>{allAPIs.length}</span>
          </h2>
          <button onClick={onAddAPI}>
            <FaUserPlus />
            Add New API
          </button>
        </div>
        <div className="table_container">
          <TableContainer>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Endpoint
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Method
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Enabled
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAPIs.map((endpoint) => (
                  <TableRow
                    key={endpoint.endpoint}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">{endpoint.endpoint}</TableCell>
                    <TableCell align="left">
                      <p
                        className={
                          endpoint.method === "GET"
                            ? "get-method"
                            : endpoint.method === "PUT"
                            ? "put-method"
                            : endpoint.method === "POST"
                            ? "post-method"
                            : endpoint.method === "DELETE"
                            ? "delete-method"
                            : endpoint.method === "PATCH"
                            ? "patch-method"
                            : ""
                        }
                      >
                        {endpoint.method}
                      </p>
                    </TableCell>
                    <TableCell align="left">{endpoint.description}</TableCell>
                    <TableCell align="left">
                      {endpoint.enabled ? "True" : "False"}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleDropdownToggle(endpoint.id)}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        color: "#4318ff",
                        fontWeight: "bold",
                      }}
                    >
                      View Details{" "}
                      <MdKeyboardArrowDown style={{ fontSize: "1.25rem" }} />
                      {dropdown === endpoint.id && (
                        <>
                          <div className="dropdown">
                            <p onClick={() => handleEdit(endpoint)}>Edit</p>
                            <p onClick={() => handleDelete(endpoint.id)}>
                              Delete
                            </p>
                          </div>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>

      {showEditModal && selectedAPI && (
        <EditForm
          row={selectedAPI}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default APIManagement;
