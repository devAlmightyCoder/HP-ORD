import React, { useContext } from 'react'
import { quizContext } from '../App';

const QuizMenu = () => {
    const [itemWords] = useContext(quizContext);

  return (
    <>
    <div className="list-block">
      {itemWords.length > 0 ? (
        <ul className="list"> 
          {itemWords.map((item: { glossary: { title: string; season: any; }; }, index: React.Key | null | undefined) => (
            <li key={index}>
              <h2 className='nav-menu'>{item.glossary.title.length > 4 ? 
                  `${item.glossary.title.substring(0, item.glossary.title.length - 2)} -  ${item.glossary.season}` :
                  `${item.glossary.title} - ${item.glossary.season}`
              }</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
      </div>
    </>
  )
}

export default QuizMenu
