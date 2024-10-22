import React, { useState } from "react";
import "./apimanagement.css";
import EditForm from "./EditForm";
import { FaUserPlus } from "react-icons/fa6";
import { getEditApi } from "../../config/apiService";
import { APIs } from "../../interfaces/APIs";
import MUIDataTable, { TableBody, TableHead } from "mui-datatables";
import { CiMenuKebab } from "react-icons/ci";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "../../components/Modal/Modal";

const APIManagement = ({
  allAPIs,
  onAddAPI,
  setAllAPIs,
  loading,
}: {
  allAPIs: any[];
  setAllAPIs: React.Dispatch<React.SetStateAction<APIs[]>>;
  onAddAPI: () => void;
  loading: boolean;
}) => {
  const [dropdown, setDropdown] = useState<number | null>(null);
  const [selectedAPI, setSelectedAPI] = useState<APIs | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDropdownToggle = (userId: number) => {
    setDropdown(dropdown === userId ? null : userId);
  };

  const handleApiEdit = async (userId: number) => {
    const response = await getEditApi(userId);
    setSelectedAPI(response.data);
    setShowEditModal(true);
    setDropdown(null);
  };

  const handleSaveEdit = (updatedAPI: APIs) => {
    setAllAPIs((prevAPIs) =>
      prevAPIs.map((api) => (api.id === updatedAPI.id ? updatedAPI : api))
    );
    setShowEditModal(false);
  };

  const handleDelete = (ApiId: number) => {
    setAllAPIs((prevAPIs) => prevAPIs.filter((api) => api.id !== ApiId));
    setDropdown(null);
  };

  const columns = [
    {
      name: "endpoint",
      label: "Endpoint",
      options: {
        filter: true,
        setCellProps: () => ({
          style: {
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }),
      },
    },
    {
      name: "method",
      label: "Method",
      options: {
        filter: true,
        customBodyRender: (value: string) => {
          const methodClass =
            value === "get"
              ? "get-method"
              : value === "put"
              ? "put-method"
              : value === "post"
              ? "post-method"
              : value === "delete"
              ? "delete-method"
              : value === "patch"
              ? "patch-method"
              : "";

          return <span className={methodClass}>{value.toUpperCase()}</span>;
        },
        setCellProps: () => ({ style: { fontWeight: 600 } }),
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
      },
    },
    {
      name: "enabled",
      label: "Enabled",
      options: {
        customBodyRender: (value: string) =>
          value === "enabled" ? "False" : "True",
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const endpointId = tableMeta.rowData[0];
          return (
            <div
              onClick={() => handleDropdownToggle(endpointId)}
              className="action-btn"
            >
              <CiMenuKebab style={{ fontSize: "1.5rem" }} />
              {dropdown === endpointId && (
                <div className="dropdown">
                  <p onClick={() => handleApiEdit(endpointId)}>Edit</p>
                  <p onClick={() => handleDelete(endpointId)}>Delete</p>
                  <p onClick={() => setShowModal(true)}>View</p>
                </div>
              )}
            </div>
          );
        },
        setCellProps: () => ({ style: { fontWeight: 600 } }),
      },
    },
  ];

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
          {/* {loading ? (
            <>Loading...</>
          ) : (
            <>
              {allAPIs.length > 0 ? (
                <>
                  <TableContainer>
                    <Table sx={{}} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold" }}
                          >
                            Endpoint
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold" }}
                          >
                            Method
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold" }}
                          >
                            Description
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold" }}
                          >
                            Enabled
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold" }}
                          >
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
                            <TableCell align="left">
                              {endpoint.endpoint}
                            </TableCell>
                            <TableCell align="left">
                              <p
                                className={
                                  endpoint.method === "get"
                                    ? "get-method"
                                    : endpoint.method === "put"
                                    ? "put-method"
                                    : endpoint.method === "post"
                                    ? "post-method"
                                    : endpoint.method === "delete"
                                    ? "delete-method"
                                    : endpoint.method === "patch"
                                    ? "patch-method"
                                    : ""
                                }
                              >
                                {endpoint.method}
                              </p>
                            </TableCell>
                            <TableCell align="left">
                              {endpoint.description}
                            </TableCell>
                            <TableCell align="left">
                              {endpoint.enabled === "enabled"
                                ? "False"
                                : "True"}
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={() => handleDropdownToggle(endpoint.id)}
                              style={{
                                position: "relative",
                                cursor: "pointer",

                                color: "#4318ff",
                                fontWeight: "bold",
                              }}
                            >
                              View Details{" "}
                              <MdKeyboardArrowDown
                                style={{ fontSize: "1.25rem" }}
                              />
                              {dropdown === endpoint.id && (
                                <>
                                  <div className="dropdown">
                                    <p
                                      onClick={() => handleApiEdit(endpoint.id)}
                                    >
                                      Edit
                                    </p>
                                    <p
                                      onClick={() => handleDelete(endpoint.id)}
                                    >
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
                </>
              ) : (
                <>
                  <div>
                    <p>No APIs found</p>
                  </div>
                </>
              )}
            </>
          )} */}

          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {allAPIs.length > 0 ? (
                <MUIDataTable
                  title={""}
                  data={allAPIs.map((endpoint: any) => ({
                    endpoint: endpoint.endpoint,
                    method: endpoint.method,
                    description: endpoint.description,
                    enabled: endpoint.enabled,
                    action: endpoint.id, // For actions like View/Edit/Delete
                  }))}
                  columns={columns}
                  options={{
                    filterType: "checkbox",
                    responsive: "vertical",
                    selectableRows: "none",
                    download: false,
                    print: false,
                    viewColumns: false,
                    elevation: 0,
                    search: false,
                    sort: false,
                    filter: false,
                  }}
                />
              ) : (
                <div>
                  <p>No APIs found</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {showEditModal && selectedAPI && (
        <EditForm
          row={selectedAPI}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showModal && <Modal />}
    </>
  );
};

export default APIManagement;
