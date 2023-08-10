import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FilesInput({
  id,
  onChange,
  className,
  fileList,
  removeFile,
}) {
  return (
    <div className={"box-container "+className}>
      <input //FIXME: when deleting files the file count is not updatedº
        type="file"
        multiple
        id={id}
        onChange={onChange}
      ></input>
      <ul className="list-files"> 
        {fileList.map((file, index) => (//TODO limit the heigh to x and use scrolling
          <li key={file.name + index}>
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-1x clickable"
              onClick={() => removeFile(index)}
            />
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
