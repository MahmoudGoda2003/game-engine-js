import React from "react";
import Game from "../Game.js";
import { ScoreBoard } from "../../scoreBoard/scoreBoard.js";

class XO extends Game {
  
  updateBoard(state) {
    for(let i = 0; i < state.board.length; i++){
      var element = document.getElementById(`${Math.floor(i/3)}${i%3}`);
      element.innerHTML = "";
      if(state.board[i] !== ""){ 
        const piece = document.createElement("div");
        piece.className = state.board[i] === "o" ? "circle" : "cross";
        element.append(piece);
      }
    }
    const score1 = document.querySelector(".player1");
    const score2 = document.querySelector(".player2");
    score1.className = `score player1 ${!state.turn && "inactive"}`;
    score2.className = `score player2 ${state.turn && "inactive"}`;
  }

  putPieces(board) {
    return (
      <>
        <ScoreBoard
          turn={true}
        />
        {super.drawNames(3,3)}
        {board}
      </>
    );
  }
  isValidMove(state, input) {
    if(input.length != 2 || Math.floor(input/10) > 2 || Math.floor(input/10) < 0 || input % 10 > 2 || input % 10 < 0) return false;
    if (state.board[(input % 10) + 3 * Math.floor(input / 10)] !== "" || input === "")
      return false;
    return true;
  }
  updateState(state, input) {
    state.board[(input % 10) + 3 * Math.floor(input / 10)] = state.turn ? "o" : "x";
    state.turn = this.switchTurn(state);
  }

  checkWin(state) {
    const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let win = false;
    for (let i = 0; i < winStates.length; i++) {
      const array = winStates[i];
      win = array.every((cell) => state.board[cell] === (!state.turn ? "o" : "x"));
      if (win) {
        break;
      }
    }
    return win;
  }
  
}

export default XO;
