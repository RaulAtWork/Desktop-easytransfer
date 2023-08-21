import { invoke } from "@tauri-apps/api/tauri";

const EVENTS = {
  TRANSMISSION: "easy-send",
  RECEIVE: "easy-receive",
};

function transmissionParserToJSON({ IP, files, port, chunkSize }) {
  //parse it to json
  const jsonMessage = JSON.stringify({
    destination_ip: IP,
    destination_port: port,
    files: files.map((file) => file.path),
    chunk_size: chunkSize,
  });
  return jsonMessage;
}

export function transmissionEmitEvent(payload) {
  console.log(transmissionParserToJSON(payload));
  invoke(EVENTS.TRANSMISSION, transmissionParserToJSON(payload));
}

function receiveParserToJSON({ IP, folder, port, chunkSize }) {
  //parse it to json
  const jsonMessage = JSON.stringify({
    listenning_ip: IP,
    listenning_port: port,
    folder: folder,
    chunk_size: chunkSize,
  });
  return jsonMessage;
}

export function receiveEmitEvent(payload) {
  console.log(receiveParserToJSON(payload));
  invoke(EVENTS.RECEIVE, receiveParserToJSON(payload));
}
