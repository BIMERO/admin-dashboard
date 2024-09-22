import React from "react";
import { APIKeysData } from "./APIKeysData";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import moment from "moment";

const APIKeys = () => {
  return (
    <section>
      <h1>API Keys Management</h1>

      <div className="table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key Name</TableCell>
                <TableCell>API Key</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>IP Whitelist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIKeysData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.keyName}</TableCell>
                  <TableCell>{row.apiKey}</TableCell>
                  <TableCell>
                    {moment(row.createdAt).format("YYYY/MM/DD HH:mm")}
                  </TableCell>
                  <TableCell>
                    {moment(row.expiryDate).format("YYYY/MM/DD HH:mm")}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.permissions.join(", ")}</TableCell>
                  <TableCell>
                    {row.ipWhitelist.join(", ")
                      ? row.ipWhitelist.join(", ")
                      : "No IP Whitelist"}
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

export default APIKeys;
