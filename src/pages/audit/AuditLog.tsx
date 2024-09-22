import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { auditData } from "./auditData";
import moment from "moment";

const AuditLog = () => {
  return (
    <section>
      <h1>Audit Logs</h1>

      <div className="table">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Log ID
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Action Type
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  User
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Target Resource
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Date, Time
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  IP Address
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
                  Details
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
              {auditData.map((user: any) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.actionType}</TableCell>
                  <TableCell align="left">{user.user}</TableCell>
                  <TableCell align="left">{user.targetResource}</TableCell>
                  <TableCell align="left">
                    {moment(user.dateTime).format("YYYY/MM/DD, HH:mm")}
                  </TableCell>
                  <TableCell align="left">{user.ipAddress}</TableCell>

                  <TableCell align="left">{user.status}</TableCell>

                  <TableCell align="left">{user.details}</TableCell>

                  <TableCell
                    align="left"
                    // onClick={() => handleDropdown(user.id)}
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
                    {/* <MdKeyboardArrowDown style={{ fontSize: "1.25rem" }} />
                      {dropdown === user.id && (
                        <>
                          <div className="dropdown">
                            <p onClick={() => handleEdit(user)}>Edit</p>
                            <p onClick={() => handleDelete(user.id)}>Delete</p>
                          </div>
                        </>
                      )} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default AuditLog;
