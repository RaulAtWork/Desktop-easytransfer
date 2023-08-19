import React from 'react';
import { invoke } from "@tauri-apps/api/tauri";

const TestFilesInput = () => {
  const handleSelectFiles = async () => {
    try {
      const response = await invoke('select_files'); // Send message to Rust backend
      console.log(response)
      const filePaths = response.filePaths; // Retrieve absolute paths of selected files
      console.log(filePaths); // Do something with the file paths
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="button" value="Select Files" onClick={handleSelectFiles} />
    </div>
  );
};

export default TestFilesInput;