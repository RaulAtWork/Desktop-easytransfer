import { Formik } from "formik";
import React, { useState } from "react";
import {
  VALIDATION_MESSAGES,
  isValidChunkSize,
  isValidIPAddress,
  isValidPort,
} from "../utils/validator";
import * as Yup from "yup";
import ErrorMessage from "./Error";
import cn from "classnames";
import { event } from "@tauri-apps/api";
import FilesInput from "./FilesInput";

export function SendForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validationSchema = Yup.object().shape({
    IP: Yup.string()
      .required("IP address is required")
      .test(
        "IP Address Format",
        VALIDATION_MESSAGES.IPADDRESS,
        isValidIPAddress
      ),
    folder: Yup.string().required("Destination folder is required"),
    files: Yup.array().min(1, "Select at least one file"),
    port: Yup.number()
      .required("A port must be provided.")
      .test("Port allowed?", VALIDATION_MESSAGES.PORT, isValidPort),
    chunkSize: Yup.number()
      .required("A chunk size must be provided")
      .test("Chunk allowed?", VALIDATION_MESSAGES.CHUNK, isValidChunkSize),
  });

  function handleSubmit(values) {
    console.log("Form submitted");
    console.log(values);
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
      }) => (
        <form className="form" on onSubmit={handleSubmit}>
          {/* Destination IP*/}
          <label htmlFor="IP">IP</label>
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

          {/*Destination Folder*/}
          <label htmlFor="folder">Destination Folder </label>
          <input
            id="folder"
            type="text"
            value={values.folder}
            onChange={handleChange}
            className={cn({
              "is-invalid": touched.folder && errors.folder,
              "is-valid": touched.files && !errors.folder,
            })}
          ></input>
          <ErrorMessage touched={touched.folder} error={errors.folder} />

          {/*Files to transfer*/}
          <label htmlFor="files">Files to transfer</label>
          <FilesInput
            id="files"
            onChange={(event) => {
              setFieldValue("files", Array.from(event.currentTarget.files));
            }}
            className={cn({
              "is-invalid": touched.files && errors.files,
              "is-valid": touched.files && !errors.files,
            })}
            fileList={values.files}
            removeFile={(index) => {
              setFieldValue(
                "files",
                values.files.filter((_, i) => i != index)
              );
            }}
          />
          <ErrorMessage touched={touched.files} error={errors.files} />

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

          <button type="submit" className="w-100">
            Send!
          </button>
        </form>
      )}
    </Formik>
  );
}
