import { useState } from "react";
import Send from "./pages/Send";
import Receive from "./pages/Receive";

const MODE = { SEND: "send", RECEIVE: "receive" };

function App() {
  const [mode, setMode] = useState(MODE.SEND);

  function changeMode(newMode) {
    setMode(newMode)
  }
  return (
    <>
      <button disabled={mode === MODE.SEND} onClick={()=> {changeMode(MODE.SEND)}}>Send mode</button>
      <button disabled={mode === MODE.RECEIVE} onClick={()=> {changeMode(MODE.RECEIVE)}}>Receive mode</button>
      {mode === MODE.SEND && <Send />}
      {mode === MODE.RECEIVE && <Receive />}
    </>
  );
}

export default App;
