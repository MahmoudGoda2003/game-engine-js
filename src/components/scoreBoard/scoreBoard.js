import React from 'react'
import "./scoreBoard.css"

export const ScoreBoard = ({score1,score2,turn}) => {
  return (
    <div className="scoreBoard">
       <span className={`score p1-score ${!turn && "inactive"}`}>p1 - {score1}</span>
       <span className={`score p2-score ${turn && "inactive"}`}>p2 - {score2}</span>
        </div>
  )
}
export default React.memo(ScoreBoard)