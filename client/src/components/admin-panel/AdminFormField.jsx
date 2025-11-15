import React, { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import "../../style/admin-panel/admin-login.css";
import "../../style/admin-panel/form-field.css";
import { DashboardButton } from "./index.js";
import { EyeIcon, EyeSlashIcon } from "../../assets/icons";
import { adminLogin, adminAudit } from "../../utils/api.js";
import useAudioStore from "../../stores/useAudioStore.js";

const AdminFormField = ({ admin }) => {
  const { setLoggedinAdmin, setLoggedinAdminUuid } = useAudioStore();
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleClick = async (uuid, password) => {
    try {
      const res = await adminLogin(uuid, { password });

      if (res.success) {
        setLoggedinAdmin(admin.name);
        setLoggedinAdminUuid(admin.uuid);

        const payload = {
          uuid: uuid,
          name: admin.name,
          action: "Log In",
        };
        await adminAudit(payload);

        setLocation("/admin/main");
      } else {
        alert(res.message);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="admin-login-container-item" key={admin.uuid}>
        <div className="admin-login-container-item-title">ADMIN</div>
        <div className="admin-login-container-item-name">{admin.name}</div>
        <form
          onSubmit={handleSubmit((data) => {
            handleClick(admin.uuid, data.password);
          })}
        >
          <div className="admin-login-container-item-input">
            <div className="form-field-input-wrapper">
              <input
                id={admin.uuid}
                className="form-field-input"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                {...register(`password`, {
                  required: "Password is required",
                })}
              ></input>
              <img
                className="form-field-input-icon"
                onClick={togglePasswordVisiblity}
                src={passwordShown ? EyeSlashIcon : EyeIcon}
              ></img>
            </div>
          </div>
          <div className="form-field-submit-button">
            <DashboardButton
              id={admin.uuid}
              type="submit"
              value="Submit"
              variant="utility"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormField;
