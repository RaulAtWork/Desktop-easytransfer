import React from "react";
import { TransmitForm } from "../components/TransmitForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

export default function Send() {
  return (
    <>
      <div className="flex-row color-transmission">
        <h1 className="color-transmission">TRANSMISSION MODE</h1>
        <FontAwesomeIcon icon={faFileImport} className="icon-big ml-auto" />
      </div>
      <TransmitForm />
    </>
  );
}
