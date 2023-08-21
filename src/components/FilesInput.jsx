import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { invoke } from "@tauri-apps/api";
import React, { useState } from "react";
import { fileNameFromFilePath } from "../utils/utils";

export default function FilesInput({ id, className, fileList, setFileList }) {
  function handleRemoveFile(index) {
    setFileList(fileList.filter((_, i) => i != index));
  }
  async function handleClick() {
    try {
      const response = await invoke("select_files"); // Send message to Rust backend
      const files = response.map((item) => {return{
        path: item,
        name: fileNameFromFilePath(item)
      }})
      setFileList(files);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={"box-container " + className}>
      <label htmlFor={id} className="button-look small">
        Choose Files
      </label>
      <span className="ml-1x">{`${fileList.length} file${
        fileList.length != 1 ? "s" : ""
      } selected`}</span>
      <input
        id={id}
        type="button"
        style={{ display: "none" }}
        onClick={handleClick}
      ></input>
      <ul className="list-files">
        {fileList.map((file, index) => (
          <li key={file.name + index}>
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-1x clickable"
              onClick={() => handleRemoveFile(index)}
            />
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
