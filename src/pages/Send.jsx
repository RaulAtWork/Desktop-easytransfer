import React, { useState } from "react";

export default function Send() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const advancedConfiguration = (
    <div>
      <h2>Advanced Configuration</h2>
      <label>
        Chunk size
        <input type="number"></input>
      </label>
      <label>
        Destination Port
        <input type="text"></input>
      </label>
    </div>
  );

  return (
    <>
      <h1>Send Mode</h1>
      <form className="form">
        <label>
          Destination IP<input type="text"></input>
        </label>
        <label>
          Destination Folder <input type="text"></input>
        </label>
        <label>
          Files to transfer<input type="text"></input>
        </label>
        <button
          onClick={(event) => {
            event.preventDefault() //this prevents the form from submitting
            setShowAdvanced(!showAdvanced);
          }}
        >
          Show Advanced Configuration
        </button>
        {showAdvanced && advancedConfiguration }
        <button type="submit">Send!</button>
      </form>
    </>
  );
}
