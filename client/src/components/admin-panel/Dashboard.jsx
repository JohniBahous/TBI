import React, { useState } from "react";
import "../../style/admin-panel/dashboard.css";
import { HarpIcon } from "../../assets/icons";
import {
  DashboardButton,
  DashboardOverview,
  DashboardUpdate,
  DashboardReplace,
} from "./index.js";
import useAudioStore from "../../stores/useAudioStore.js";

const Dashboard = () => {
  const { loggedinAdmin } = useAudioStore();
  const [action, setAction] = useState("overview");
  return (
    <div className="dashboard">
      <div className="dashboard-addendum">{action}</div>
      <div className="dashboard-left">
        <div className="dashboard-left-buttonField">
          <DashboardButton
            type="button"
            value="OVERVIEW"
            variant="menu"
            onClick={() => setAction("overview")}
          />
          <DashboardButton
            type="button"
            value="UPDATE"
            variant="menu"
            onClick={() => setAction("update")}
          />
          <DashboardButton
            type="button"
            value="REPLACE"
            variant="menu"
            onClick={() => setAction("replace")}
          />
        </div>
        <div className="dashboard-left-adminInfo">
          Logged In Admin: {loggedinAdmin}
          <img className="dashboard-icon" src={HarpIcon} alt="Harp" />
        </div>
      </div>
      <div className="dashboard-right">
        {action === "overview" ? (
          <DashboardOverview />
        ) : action === "update" ? (
          <DashboardUpdate />
        ) : (
          <DashboardReplace />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
