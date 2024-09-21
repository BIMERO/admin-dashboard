import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApiLogs from "./pages/apiLogs/ApiLogs";
import APIManagement from "./pages/apiManagement/APIManagement";
import Users from "./pages/Users/Users";
import APIKeys from "./pages/apiKeys/APIKeys";
import Settings from "./pages/settings/Settings";
import Notifications from "./pages/notifications/Notifications";
import Reports from "./pages/reports/Reports";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState: boolean) => !prevState);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="main-content">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/logs" element={<ApiLogs />} />
              <Route path="/api-management" element={<APIManagement />} />
              <Route path="/users" element={<Users />} />
              <Route path="/api-keys" element={<APIKeys />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/support" element={<Reports />} />
              <Route path="/api-call-logs" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
