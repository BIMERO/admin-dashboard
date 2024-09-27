import React from "react";
import { FaUserPlus } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { notificationsData } from "./notificationsData";
import moment from "moment";

const Notifications = () => {
  return (
    <section>
      <h1>User Management</h1>
      <div className="user-mgt">
        <div
          className="user-header"
          style={{ justifyContent: "space-between" }}
        >
          <h2>
            Alerts & Notifications <span>{notificationsData.length}</span>
          </h2>
          <button>
            <FaUserPlus />
            Add New Notification
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
                    Alert ID
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Message
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Receipients
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
                    Delivery Method
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Date/Time
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
                {notificationsData.map((user: any) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="left">{user.message}</TableCell>
                    <TableCell align="left">
                      <p>{user.type}</p>
                    </TableCell>
                    <TableCell align="left">{user.recipients}</TableCell>
                    <TableCell align="left">{user.deliveryMethod}</TableCell>
                    <TableCell align="left">{user.status}</TableCell>
                    <TableCell align="left">
                      {moment(user.timestamp).format("YYYY/MM/DD, HH:mm")}
                    </TableCell>
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
      </div>
    </section>
  );
};

export default Notifications;
