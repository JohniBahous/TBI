import React from "react";
import "../../style/admin-panel/dashboard-button.css";

const DashboardButton = (props) => {
  return (
    <input
      type={props.type}
      onClick={props.onClick}
      value={props.value}
      variant={props.variant}
      id=""
      alt=""
      className={[
        `dashboard-button`,
        `dashboard-button-${props.variant}`,
        (props.variant === "toggle") & props.isToggled
          ? `dashboard-button-toggle-activated`
          : null,
      ].join(" ")}
    ></input>
  );
};

export default DashboardButton;
