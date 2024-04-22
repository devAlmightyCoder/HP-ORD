import { SetStateAction, useEffect, useState, createContext } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import QuizMenu from "./components/QuizMenu";
import Quiz from "./components/Quiz";

export const quizContext = createContext(undefined);
function App() {
  const [itemWords, setItemWords] = useState<any[]>([]);

  useEffect(() => {    
      invoke('read_json_files', {directoryPath: 'data'})
        .then((response) => {
          console.log(response);
          setItemWords(response as SetStateAction<any>);
        })
        .catch((error) => console.error('Error fetching items:', error));
  }, []);

  
  return (
    <quizContext.Provider value={[itemWords, setItemWords]}>
      <QuizMenu></QuizMenu>
      <Quiz></Quiz>
    </quizContext.Provider>
  );
}

export default App;
