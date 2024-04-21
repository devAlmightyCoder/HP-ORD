import { SetStateAction, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [itemWords, setItemWords] = useState<any[]>([]);
  // async function greet() {
  //   //Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  
  // }

  useEffect(() => {    
      invoke('read_json_files', {directoryPath: 'data'})
        .then((response) => {
          console.log(response);
          setItemWords(response as SetStateAction<any>);
        })
        .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="container">
      {console.log("hej", itemWords[0])}

      <div>
          <p>Säsong: {itemWords[0].glossary.season}</p>
      
          {
            itemWords.length > 0 && itemWords[0].glossary.title.length > 4 ? 
            <p>År: {itemWords[0].glossary.title.substring(0, itemWords[0].glossary.title.length - 2)}</p> : 
            <p>{itemWords.length > 0 ? itemWords[0].glossary.title : "No title available"}</p>
          }   
      </div>
      <ul className="list">
      {itemWords[0] !== 'undefined' && itemWords[0]?.glossary.glossaryList.map((entry: any, idx: any) => (
          <li key={idx}>
            <h3>{entry.question}</h3>
            <p>A: {entry.a}</p>
            <p>B: {entry.b}</p>
            <p>C: {entry.c}</p>
            <p>D: {entry.d}</p>
            <p>E: {entry.e}</p>
          </li> 
 ))}
      </ul>
      {/* <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form> */}

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
