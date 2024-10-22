import React, { useState } from "react";
// import { apiLogsData } from "./apiLogData";
import { ApiData } from "../apiManagement/ApiData";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import "./apilogs.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../../components/customSelect/CustomSelect";
import { MdOutlineFileDownload } from "react-icons/md";
import MakeCall from "./MakeCall";
import MUIDataTable from "mui-datatables";
import { CiMenuKebab } from "react-icons/ci";

const ApiLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [makeCallModal, setMakeCallModal] = useState(false);

  const filteredLogs = ApiData.filter((log) => {
    const withinDateRange = true;
    //   (!startDate || new Date(log.timeStamp) >= startDate) &&
    //   (!endDate || new Date(log.timeStamp) <= endDate);

    return (
      log.endpoint.includes(searchQuery) &&
      (filterMethod === "" || log.method === filterMethod) &&
      (filterStatus === "" || log.status === filterStatus) &&
      withinDateRange
    );
  });

  const handleView = (row: any) => {
    setSelectedRow(row);
    setViewDetails(true);
  };

  const closeView = () => {
    setSelectedRow(null);
    setViewDetails(false);
  };

  const methodoptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "PATCH", value: "PATCH" },
  ];
  const statusOptions = [
    { label: "Success", value: "Success" },
    { label: "Failed", value: "Failed" },
  ];

  const handleMakeCall = () => {
    setMakeCallModal(true);
  };

  const handleCloseCall = () => {
    setMakeCallModal(false);
  };

  const columns = [
    {
      name: "id",
      label: "User ID",
      options: {
        sort: true,
        setCellProps: () => ({ style: { fontWeight: 700 } }),
      },
    },
    {
      name: "endpoint",
      label: "Endpoints",
      options: {
        sort: true,
      },
    },
    {
      name: "method",
      label: "Method",
      options: {
        customBodyRender: (value: string) => {
          const methodClass =
            value === "GET"
              ? "get-method"
              : value === "PUT"
              ? "put-method"
              : value === "POST"
              ? "post-method"
              : value === "DELETE"
              ? "delete-method"
              : value === "PATCH"
              ? "patch-method"
              : "";

          return <span className={methodClass}>{value}</span>;
        },
      },
    },
    {
      name: "responseTime",
      label: "Response Time",
      options: {
        customBodyRender: (value: string) => (
          <p style={{ textAlign: "center" }}>{value}</p>
        ),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value: string) => {
          const statusClass =
            value === "Success"
              ? "success"
              : value === "Failed"
              ? "failed"
              : "";

          return <span className={statusClass}>{value}</span>;
        },
      },
    },
    {
      name: "timestamp",
      label: "Last Login",
      options: {
        customBodyRender: (value: string) =>
          moment(value).format("YYYY/MM/DD, HH:mm"),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const user = filteredLogs[tableMeta.rowIndex];
          return (
            <div className="action-btn" onClick={() => handleView(user)}>
              <CiMenuKebab style={{ fontSize: "1.5rem" }} />
            </div>
          );
        },
      },
    },
  ];

  const data = filteredLogs.map((log) => ({
    id: log.id,
    endpoint: log.endpoint,
    method: log.method,
    responseTime: "", // log.responseTime,
    status: log.status,
    timestamp: "", // log.timeStamp,
    action: "",
  }));

  return (
    <>
      <section>
        <div
          className="user-header"
          style={{ justifyContent: "space-between" }}
        >
          <h1>API Call Logs</h1>

          <button className="call-btn" onClick={handleMakeCall}>
            Make an API Call
          </button>
        </div>

        <div className="filters">
          <div className="inputs">
            <input
              type="text"
              placeholder="Search...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CustomSelect
            options={methodoptions}
            placeholder="Select Method"
            value={filterMethod}
            onSelect={(value) => setFilterMethod(value)}
          />
          <CustomSelect
            options={statusOptions}
            placeholder="Select Status"
            value={filterMethod}
            onSelect={(value) => setFilterStatus(value)}
          />

          <div className="dates">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText="Start Date"
              selectsStart
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              placeholderText="End Date"
              selectsEnd
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
          </div>

          {/* <button
            onClick={() => {
              setSearchQuery("");
              setFilterMethod("");
              setFilterStatus("");
              setStartDate(null);
              setEndDate(null);
            }}
          >
            Clear Filters
          </button> */}
          <button
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            Download <MdOutlineFileDownload />
          </button>
        </div>

        <div className="users-table">
          {/* <TableContainer>
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
                    Endpoints
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Method
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Response Time
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
                {filteredLogs.map((user: any) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      <p>{user.id}</p>
                    </TableCell>
                    <TableCell align="left">
                      <p>{user.endpoint}</p>
                    </TableCell>
                    <TableCell align="left">
                      <p
                        className={
                          user.method === "GET"
                            ? "get-method"
                            : user.method === "PUT"
                            ? "put-method"
                            : user.method === "POST"
                            ? "post-method"
                            : user.method === "DELETE"
                            ? "delete-method"
                            : user.method === "PATCH"
                            ? "patch-method"
                            : ""
                        }
                      >
                        {user.method}
                      </p>
                    </TableCell>
                    <TableCell align="left">
                      <p style={{ textAlign: "center" }}>{user.responseTime}</p>
                    </TableCell>
                    <TableCell align="left">
                      <p
                        className={
                          user.status === "Success"
                            ? "success"
                            : user.status === "Failed"
                            ? "failed"
                            : ""
                        }
                      >
                        {user.status}
                      </p>
                    </TableCell>
                    <TableCell align="left">
                      {moment(user.timestamp).format("YYYY/MM/DD, HH:mm")}
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
                      onClick={() => handleView(user)}
                    >
                      View Details
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          <MUIDataTable
            title={""}
            data={data}
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
        </div>
      </section>

      <Modal open={viewDetails} onClose={closeView}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            API Log Details
          </Typography>

          {selectedRow && (
            <div>
              <Typography>ID: {selectedRow.id}</Typography>
              <Typography>Endpoint: {selectedRow.endpoint}</Typography>
              <Typography>Method: {selectedRow.method}</Typography>
              <Typography>Response Time: {selectedRow.responseTime}</Typography>
              <Typography>Status: {selectedRow.status}</Typography>
              <Typography>
                Timestamp:{" "}
                {moment(selectedRow.timestamp).format("YYYY/MM/DD, HH:mm")}
              </Typography>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={closeView}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {makeCallModal && <MakeCall handleCloseCall={handleCloseCall} />}
    </>
  );
};

export default ApiLogs;
