import React, { useContext } from 'react'
import { quizContext } from '../App';
const Quiz = () => {
    const [itemWords] = useContext(quizContext);
    
  return (
    <div className="container">
        <div>
            <h1>Säsong: {itemWords[0]?.glossary.season}</h1>
        
            {
            itemWords.length > 0 && itemWords[0]?.glossary.title.length > 4 ? 
            <p>År: {itemWords[0]?.glossary.title.substring(0, itemWords[0]?.glossary.title.length - 2)}</p> : 
            <p>{itemWords.length > 0 ? itemWords[0]?.glossary.title : "No title available"}</p>
            }   
        </div>
        <div className='question-card'>
          <ul className="list-ul">
          {itemWords.length > 0 && itemWords[0]?.glossary.glossaryList.map((entry: any, idx: any) => (
            <li className='list-li' key={idx}>
                <h3 className='h3-header'>{entry.question}</h3>
              <span className='question'>A: {entry.a}</span>
              <span className='question'>B: {entry.b}</span>
              <span className='question'>C: {entry.c}</span>
              <span className='question'>D: {entry.d}</span>
              <span className='question'>E: {entry.e}</span>
              </li> 
          ))}
          </ul>
        </div>
    </div>
  )
}

export default Quiz
