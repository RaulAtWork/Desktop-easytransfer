import { Formik } from "formik";
import React, { useState } from "react";
import { validationSchema } from "../utils/validator";
import ErrorMessage from "./Error";
import cn from "classnames";
import FilesInput from "./FilesInput";
import ToggleButton from "./ToggleButton";
import { transmissionEmitEvent } from "../logic/TauriHandler";


export function TransmitForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  function handleSubmit(values) {
    transmissionEmitEvent(values) 
    //TODO handle the waiting time
  }

  return (
    <Formik
      initialValues={{
        IP: "",
        folder: "",
        files: [],
        port: 4040,
        chunkSize: 100,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form className="form" on onSubmit={handleSubmit}>
          <button type="button" onClick={resetForm}>
            Reset form
          </button>
          {/* Destination IP*/}
          <label htmlFor="IP"> Destination IP</label>
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
        
          {/*Files to transfer*/}
          <label htmlFor="files">Files to transfer</label>
          <FilesInput
            id="files"
            setFileList={(newValue) => {
              setFieldValue("files", newValue);
            }}
            className={cn({
              "is-invalid": touched.files && errors.files,
              "is-valid": touched.files && !errors.files,
            })}
            fileList={values.files}
          />
          <ErrorMessage touched={touched.files} error={errors.files} />

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
            Send!
          </button>
        </form>
      )}
    </Formik>
  );
}
