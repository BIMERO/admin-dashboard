import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login"; // Add this import
import { RoutesData } from "./components/Routes/Routes";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState: boolean) => !prevState);
  };

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          {RoutesData.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <div className="app-container">
                    <Sidebar
                      isOpen={isSidebarOpen}
                      toggleSidebar={toggleSidebar}
                    />
                    <div className="main-content">
                      <Navbar toggleSidebar={toggleSidebar} />
                      <div className="pages">{route.element}</div>
                    </div>
                  </div>
                }
              />
            );
          })}

          {/* <Route
            path="/dashboard"
            element={
              <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <Navbar toggleSidebar={toggleSidebar} />
                  {}
                </div>
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <Dashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/logs"
            element={
              <div className="app-layout">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <ApiLogs />
                </div>
              </div>
            }
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
