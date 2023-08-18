import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons";
import { ReceiveForm } from "../components/ReceiveForm";

export default function Receive() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <div className="flex-row color-receive">
        <h1 className="color-receive">RECEIVE MODE</h1>{" "}
        <FontAwesomeIcon
          icon={faSatelliteDish}
          flip="horizontal"
          className="icon-big ml-auto"
        />
      </div>
      <ReceiveForm/>

      <div className="form">
        <ProgressBar progress={progress} />
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={progress}
          style={{ width: "100%" }}
          onChange={(event) => {
            setProgress(event.target.value);
          }}
        ></input>
      </div>






    </>
  );
}
