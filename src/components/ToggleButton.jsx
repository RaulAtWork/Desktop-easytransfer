import React from "react";

export default function ToggleButton({ isToggled, handleToggle, label }) {
  return (
    <div className="toggle-container">
      <div
        className={`toggle-button ${isToggled ? "on" : "off"}`}
        onClick={handleToggle}
      >
        <div className="slider"></div>
      </div>
      <label>{label}</label>
    </div>
  );
}
