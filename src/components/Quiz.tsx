import React, { useContext } from 'react'
import { quizContext } from '../App';
const Quiz = () => {
    const [itemWords] = useContext(quizContext);
    
  return (
    <div className="container">
        <div>
            <p>Säsong: {itemWords[0]?.glossary.season}</p>
        
            {
            itemWords.length > 0 && itemWords[0]?.glossary.title.length > 4 ? 
            <p>År: {itemWords[0]?.glossary.title.substring(0, itemWords[0]?.glossary.title.length - 2)}</p> : 
            <p>{itemWords.length > 0 ? itemWords[0]?.glossary.title : "No title available"}</p>
            }   
        </div>
        <ul className="list">
        {itemWords.length > 0 && itemWords[0]?.glossary.glossaryList.map((entry: any, idx: any) => (
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
    </div>
  )
}

export default Quiz
