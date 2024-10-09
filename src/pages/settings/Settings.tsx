import React, { useState } from "react";
import "./settings.css";
import { FaUserPlus } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { SettingsProps } from "./settingsData";

const Settings = ({
  allSettings,
  handleAddSetting,
}: {
  allSettings: SettingsProps[];
  handleAddSetting: () => void;
}) => {
  return (
    <div style={{ position: "relative" }}>
      <section>
        <h1>Settings Management</h1>
        <div className="user-mgt">
          <div
            className="user-header"
            style={{ justifyContent: "space-between" }}
          >
            <h2>All BaseUrls</h2>
            <button onClick={handleAddSetting}>
              <FaUserPlus />
              Create New BaseUrl
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
                      Name
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Base Url
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Base Url Type
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Custom Key
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Custom Value
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      TimeOut
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Max Calls
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allSettings.map((setting, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{setting.name}</TableCell>
                      <TableCell align="left">{setting.description}</TableCell>
                      <TableCell align="left">{setting.baseUrl}</TableCell>
                      <TableCell align="left">{setting.baseUrlType}</TableCell>
                      <TableCell align="left">{setting.customKey}</TableCell>
                      <TableCell align="left">{setting.customValue}</TableCell>
                      <TableCell align="left">{setting.timeOut}</TableCell>
                      {/* <TableCell
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
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
