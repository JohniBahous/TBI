import React, { useState, useEffect } from "react";
import "../../style/admin-panel/admin-login.css";
import "../../style/admin-panel/form-field.css";

import { getAllAdmins } from "../../utils/api.js";
import AdminFormField from "./AdminFormField.jsx";

const AdminLogIn = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    document.title = "BRAGI || ADMIN PANEL LOGIN";
  }, []);

  useEffect(() => {
    getAllAdmins().then(setAdmins);
  }, []);

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-addendum">ADMIN LOGIN</div>
        <div className="admin-login-container-item-set">
          {admins.map((a) => (
            <AdminFormField key={a.uuid} admin={a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLogIn;
