import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";


export default function Receive(){
    const [progress, setProgress] = useState(0)
    return(
        <>
        <h1>Receive mode</h1>
        <ProgressBar progress={progress}/>
        <input type="range" min='0' max='100' step='5' value={progress} style={{width:"100%"}} onChange={(event) => {setProgress(event.target.value)}}></input>
        </>
    )
}