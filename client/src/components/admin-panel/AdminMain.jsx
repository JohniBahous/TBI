import React, { useEffect } from "react";
import "../../style/admin-panel/admin-main.css";
import { Dashboard } from "./index.js";

const AdminMain = () => {
  useEffect(() => {
    document.title = "BRAGI || ADMIN PANEL MAIN";
  }, []);
  return (
    <div className="admin-main">
      <Dashboard />
    </div>
  );
};

export default AdminMain;
