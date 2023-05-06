import React from "react";
import "./scoreBoard.css";

export const ScoreBoard = ({ turn }) => {
  return (
    <div className="scoreBoard">
      <span className={`score player1 ${!turn && "inactive"}`}>
        player1
      </span>
      <span className={`score player2 ${turn && "inactive"}`}>
        player2
      </span>
    </div>
  );
};
export default React.memo(ScoreBoard);
