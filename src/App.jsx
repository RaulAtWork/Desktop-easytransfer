import { useState } from "react";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import TabGroup, { Tab } from "./components/TabGroup";

const MODE = { SEND: "send", RECEIVE: "receive" };

function App() {
  return (
    <TabGroup>
      <Tab name="Transmission mode" labelColor="bg-color-transmission">
        <Send />
      </Tab>
      <Tab name="Receive mode" labelColor="bg-color-receive">
        <Receive />
      </Tab>
    </TabGroup>
  );
}

export default App;
