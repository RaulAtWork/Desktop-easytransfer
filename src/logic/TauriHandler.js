import { invoke } from "@tauri-apps/api/tauri";

const EVENTS = {
  TRANSMISSION: "easy-send",
  RECEIVE: "easy-receive",
};

function transmissionParser({ ip, files, port, chunkSize }) {
  //parse it to json
  const jsonMessage = JSON.parse({
    destination_ip: ip,
    destination_port: port,
    files: files,
    chunk_size: chunkSize,
  });
}

export function transmissionEmitEvent(payload) {
  invoke(EVENTS.TRANSMISSION, transmissionParser(payload));
}
