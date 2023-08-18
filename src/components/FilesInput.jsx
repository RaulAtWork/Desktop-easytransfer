import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function FilesInput({ id, className, fileList, setFileList }) {
  function handleChange(event) {
    setFileList(Array.from(event.target.files));
  }
  function handleRemoveFile(index) {
    setFileList(fileList.filter((_, i) => i != index));
  }

  return (
    <div className={"box-container " + className}>
      <label htmlFor={id} className="button-look small">
        Choose Files
      </label>
      <span className="ml-1x">{`${fileList.length} file${fileList.length != 1 ? "s" : ""} selected`}</span>
      <input
        type="file"
        multiple
        id={id}
        onChange={handleChange}
        style={{ display: "none" }}
      ></input>
      <ul className="list-files">
        {fileList.map(
          (
            file,
            index
          ) => (
            <li key={file.name + index}>
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-1x clickable"
                onClick={() => handleRemoveFile(index)}
              />
              {file.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
