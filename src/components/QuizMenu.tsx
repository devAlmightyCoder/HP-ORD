import React, { useContext } from 'react'
import { quizContext } from '../App';

const QuizMenu = () => {
    const [itemWords] = useContext(quizContext);

    const handleClick = function(e) {
      console.log(e); //will log the index of the clicked item
    }
  return (
    <>
    <div className="list-block">
      {itemWords.length > 0 ? (
        <ul className="list-ul"> 
          {itemWords.map((item: { glossary: { title: string; season: any; }; }, index: React.Key | null | undefined) => (
            <li data-index={index + 1} onClick={handleClick} key={index}>
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
