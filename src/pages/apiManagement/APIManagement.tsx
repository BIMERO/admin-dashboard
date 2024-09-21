import React, { useState } from "react";
import "./apimanagement.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { apiManagementData } from "../../mockdata";
import { MdKeyboardArrowDown } from "react-icons/md";
import EditForm from "./EditForm";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // restrict to common HTTP methods
  description: string;
  headers: {
    "Content-Type": string;
    [key: string]: string; // allows additional header fields if needed
  };
  payload: Record<string, any>; // flexible type for payload (can be empty or contain data)
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any; // allows additional parameters if needed
  };
  enabled: boolean;
}

const APIManagement = () => {
  const [dropdown, setDropdown] = useState<number | null>(null);
  const data = apiManagementData as APIManagementProps[];
  const [initialPage, setInitialPage] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEditing, setShowEditing] = useState<APIManagementProps | null>(
    null
  );

  const handleDropdown = (id: number) => {
    setDropdown((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: number) => {
    data.filter((row) => row.id !== id);
  };

  const handleEdit = (row: APIManagementProps) => {
    setInitialPage(false);
    setShowForm(true);
    setShowEditing(row);
  };

  const getMethodClass = (method: APIManagementProps["method"]) => {
    switch (method) {
      case "GET":
        return "get-method";
      case "POST":
        return "post-method";
      case "PUT":
        return "put-method";
      case "DELETE":
        return "delete-method";
      case "PATCH":
        return "patch-method";
      default:
        return "";
    }
  };

  return (
    <>
      {initialPage && (
        <section className="api_management">
          <h1>API Endpoints Management</h1>
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
                  {data.map((endpoint) => (
                    <TableRow
                      key={endpoint.endpoint}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{endpoint.endpoint}</TableCell>
                      <TableCell
                        align="left"
                        className={getMethodClass(endpoint.method)}
                      >
                        {endpoint.method}
                      </TableCell>
                      <TableCell align="left">{endpoint.description}</TableCell>
                      <TableCell align="left">
                        {endpoint.enabled ? "True" : "False"}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => handleDropdown(endpoint.id)}
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
      )}

      {showForm && showEditing && (
        <EditForm
          row={showEditing}
          onSave={(updatedRow) => {
            data.map((item) => (item.id === updatedRow.id ? updatedRow : item));
            setShowForm(false);
            setInitialPage(true);
          }}
        />
      )}
    </>
  );
};

export default APIManagement;
