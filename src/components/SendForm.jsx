import React from "react";

export default function SendForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formInput, setFormInput] = useState({
    IP: "",
    folder: "",
    files: [],
    chunkSize: "",
    port: null,
  });

  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleChange(event) {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  }

  return (
    <>
      {/* Start of the form*/}
      <form className="form" onSubmit={handleSubmit}>

        {/*IP address*/}
        <label>
          Destination IP
          <input
            type="text"
            name="IP"
            value={formInput.IP}
            onChange={handleChange}
          ></input>
        </label>

        {/*Destination Folder*/}
        <label>
          Destination Folder{" "}
          <input
            type="text"
            name="folder"
            value={formInput.folder}
            onChange={handleChange}
          ></input>
        </label>

        {/*Files to transfer*/}
        <label>
          Files to transfer
          <input
            type="text"
            name="files"
            value={formInput.files}
            onChange={handleChange}
          ></input>
        </label>

        {/*Advanced options*/}
        <button
          onClick={(event) => {
            event.preventDefault(); //this prevents the form from submitting
            setShowAdvanced(!showAdvanced);
          }}
        >
          Show Advanced Configuration
        </button>
        {showAdvanced && (
          <div>
            <h2>Advanced Configuration</h2>
            <label>
              Chunk size (MB)
              <input
                type="number"
                min="0"
                name="chunkSize"
                value={formInput.chunkSize}
                onChange={handleChange}
              ></input>
            </label>
            <label>
              Destination Port
              <input
                type="number"
                name="port"
                value={formInput.port}
                onChange={handleChange}
              ></input>
            </label>
          </div>
        )}

        <button type="submit">Send!</button>

        {JSON.stringify(formInput)}
      </form>
    </>
  );
}
