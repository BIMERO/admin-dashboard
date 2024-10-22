import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login/Login";
import { RoutesData } from "./components/Routes/Routes";
import Register from "./pages/auth/Register/Register";
import CreateAccount from "./pages/auth/Create";
import LoadingPage from "./pages/Loading";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState: boolean) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/:account_type"
            element={<CreateAccount />}
            loader={({ params }) => {
              console.log(params);

              if (
                !["basic", "regular", "premium"].includes(
                  params.account_type ?? ""
                )
              ) {
                return redirect("/register");
              }
              return null;
            }}
          />
          <Route path=":account_type?">
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
                        <div className="pages" onClick={closeSidebar}>
                          {route.element}
                        </div>
                      </div>
                    </div>
                  }
                />
              );
            })}
            {/* {RoutesData.map((route) => {
              return (
                <Route
                  index
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
                        <div className="pages" onClick={closeSidebar}>
                          {route.element}
                        </div>
                      </div>
                    </div>
                  }
                />
              );
            })} */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
