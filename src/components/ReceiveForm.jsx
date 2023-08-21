import { Formik } from "formik";
import React, { useState } from "react";
import { validationSchemaTransmission } from "../utils/validator";
import ErrorMessage from "./Error";
import cn from "classnames";
import FilesInput from "./FilesInput";
import ToggleButton from "./ToggleButton";
import { receiveEmitEvent } from "../logic/TauriHandler";


export function ReceiveForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  function handleSubmit(values) {
    receiveEmitEvent(values)
  }

  return (
    <Formik
      initialValues={{
        IP: "",
        folder: "",
        port: 3287,
        chunkSize: 100,
      }}
      validationSchema={validationSchemaTransmission}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form className="form" onSubmit={handleSubmit}>
          <button type="button" onClick={resetForm}>
            Reset form
          </button>
          {/* Listenning IP*/}
          <label htmlFor="IP">Listening IP</label>
          <input
            type="text"
            id="IP"
            value={values.IP}
            onChange={handleChange}
            className={cn({
              "is-invalid": touched.IP && errors.IP,
              "is-valid": touched.IP && !errors.IP,
            })}
          ></input>
          <ErrorMessage touched={touched.IP} error={errors.IP} />

           {/*TODO Destination Folder*/}
        <label htmlFor="folder">Destination Folder </label>
          <input
            id="folder"
            type="text"
            value={values.folder}
            onChange={handleChange}
            className={cn({
              "is-invalid": touched.folder && errors.folder,
              "is-valid": touched.folder && !errors.folder,
            })}
          ></input>
          <ErrorMessage touched={touched.folder} error={errors.folder} />

          {/*Advanced options*/}

          <ToggleButton
            isToggled={showAdvanced}
            label={"Show Advanced Configuration"}
            handleToggle={() => {
              setShowAdvanced(!showAdvanced);
            }}
          />

          {showAdvanced && (
            <div className="form">
              <label htmlFor="chunkSize">Chunk size (MB)</label>
              <input
                type="number"
                id="chunkSize"
                value={values.chunkSize}
                onChange={handleChange}
                className={cn({
                  "is-invalid": touched.chunkSize && errors.chunkSize,
                  "is-valid": touched.chunkSize && !errors.chunkSize,
                })}
              ></input>
              <ErrorMessage
                touched={touched.chunkSize}
                error={errors.chunkSize}
              />

              <label htmlFor="port">Destination Port</label>
              <input
                type="number"
                id="port"
                value={values.port}
                onChange={handleChange}
                className={cn({
                  "is-invalid": touched.port && errors.port,
                  "is-valid": touched.port && !errors.port,
                })}
              ></input>
              <ErrorMessage touched={touched.port} error={errors.port} />
            </div>
          )}
          <br />
          <button type="submit" className="w-100 button-highlight">
            Start Listening!
          </button>
        </form>
      )}
    </Formik>
  );
}
