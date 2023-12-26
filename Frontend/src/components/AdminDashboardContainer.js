import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./admin.css";
import AdminSideBar2 from "./AdminSideBar2";
import AdminDashboard2 from "./AdminDashboard2";
import Footer from "./Footer";

function AdminDashboardContainer() {
  const location = useLocation();
  const isAdminDashboardPage = location.pathname === "/admin/dashboard";
  const adminRow3Class = isAdminDashboardPage
    ? "admin-row3-white"
    : "admin-row3";

  // Use state to manage isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Use a local variable to avoid race condition
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedIn = user ? true : false;

    // Set isLoggedIn state
    setIsLoggedIn(loggedIn);

    console.log(localStorage.getItem("user"));
    console.log(loggedIn);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="row admin-row1">
            <div className="col col-md-2">
              <AdminSideBar2 />
            </div>
            <div className="col col-md-10">
              <AdminDashboard2 />
            </div>
          </div>
          <div className={`row ${adminRow3Class}`}>
            <Footer />
          </div>
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}

export default AdminDashboardContainer;
