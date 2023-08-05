import React from "react";

export default function ProgressBar({progress}) {
  return (
    <div>
      <div style={{ width: "100%", background: "#ddd", height: "20px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "#007bff",
            height: "100%",
          }}
        />
      </div>
      <p>Progress: {progress}%</p>
    </div>
  );
}
