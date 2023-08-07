export const VALIDATION_MESSAGES = {
  CHUNK: "Chunk size must be greater than 0.",
  PORT: "Port must be between 1000 and 9999.",
  IPADDRESS: "IP address is not valid.",
};

/**
 * Validates if an IP address has a valid format
 * @param {string} ipAddress IP address to validate
 * @returns {boolean} true if valid, false if not
 */
export function isValidIPAddress(ipAddress) {
  const ipAddressRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipAddressRegex.test(ipAddress);
}
/**
 * Validates if the chunk size is allowed
 * @param {number} chunkSize
 * @returns {boolean} true if allowed, false if not
 */
export function isValidChunkSize(chunkSize) {
  if (chunkSize > 0) return true;
  else return false;
}

/**
 * Validates if the port is valid and allowed
 * @param {number} port
 * @returns true if valid, false if not
 */
export function isValidPort(port) {
  if (port >= 1000 && port <= 9999) return true;
  else return false;
}
