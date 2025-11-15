import React, { useState, useEffect } from "react";
import "../../style/admin-panel/dashboard-overview.css";
import { OverviewCard } from "./index.js";
import { getAllUUIDs } from "../../utils/api.js";

const DashboardOverview = () => {
  const [uuids, setUuids] = useState([]);
  useEffect(() => {
    getAllUUIDs().then(setUuids);
  }, []);

  return (
    <div className="dashboard-overview">
      {uuids.map((a) => {
        return (
          <div key={a.uuid}>
            <OverviewCard artistUuid={a.uuid} songUuid={a.song.uuid} />
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
