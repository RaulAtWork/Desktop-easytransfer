import * as Yup from "yup";

const VALIDATION_MESSAGES = {
  CHUNK: "Chunk size must be greater than 0.",
  PORT: "Port must be between 1000 and 9999.",
  IPADDRESS: "IP address is not valid.",
};

/**
 * Validates if an IP address has a valid format
 * @param {string} ipAddress IP address to validate
 * @returns {boolean} true if valid, false if not
 */
function isValidIPAddress(ipAddress) {
  const ipAddressRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipAddressRegex.test(ipAddress);
}
/**
 * Validates if the chunk size is allowed
 * @param {number} chunkSize
 * @returns {boolean} true if allowed, false if not
 */
function isValidChunkSize(chunkSize) {
  if (chunkSize > 0) return true;
  else return false;
}

/**
 * Validates if the port is valid and allowed
 * @param {number} port
 * @returns true if valid, false if not
 */
function isValidPort(port) {
  if (port >= 1000 && port <= 9999) return true;
  else return false;
}

const IPValidator = Yup.string()
  .required("IP address is required")
  .test("IP Address Format", VALIDATION_MESSAGES.IPADDRESS, isValidIPAddress);

const portValidator = Yup.number()
  .required("A port must be provided.")
  .test("Port allowed?", VALIDATION_MESSAGES.PORT, isValidPort);

const chunkSizeValidator = Yup.number()
  .required("A chunk size must be provided")
  .test("Chunk allowed?", VALIDATION_MESSAGES.CHUNK, isValidChunkSize);

export const validationSchemaTransmission = Yup.object().shape({
  IP: IPValidator,
  files: Yup.array().min(1, "Select at least one file"),
  port: portValidator,
  chunkSize: chunkSizeValidator,
});

export const validationSchemaReceive = Yup.object().shape({
  IP: IPValidator,
  port: portValidator,
  chunkSize: chunkSizeValidator,
  folder: Yup.string().required("Destination folder is required"),
});
