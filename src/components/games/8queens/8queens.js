import React from "react";
import Game from "../Game.js";

class Queens extends Game {
 
  updateBoard(state) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8 ; j++) {
        var element = document.getElementById(`${i}${j}`);
        element.innerHTML = "";
        if (state.board[i][j] === 5) {
          const piece = document.createElement("div");
          piece.className = "fas fa-chess-queen";
          element.append(piece);
        }
      }
    }
    const stateDiv = document.querySelector(".state");
    stateDiv.textContent = state.count === 0 ? "solved" : "unsolved";
  }
  putPieces(board) {
    return (
      <>
        <div className="state">unsolved</div>
        {super.drawNames(8,8)}
        {board}
      </>
    );
  }
  isValidMove(state, input) {
    if(input.length != 2 || Math.floor(input/10) > 7 || Math.floor(input/10) < 0 || input % 10 > 7 || input % 10 < 0) return false;
    if (state.board[Math.floor(input / 10)][input % 10] === 5) {
      state.undo = 1;
      return true;
    }
    if (state.board[Math.floor(input / 10)][input % 10] !== 0) return false;
    return true;
  }
  updateState(state, input) {
    this.markBoard(state, input, state.undo?-1:1);
    state.move = input;
    state.count+=state.undo?1:-1;
    state.undo = 0;
    console.log(state.board);
  }
  checkWin(state) {
    return state.count === 0;
  }
  markBoard(state, id, mark) {
    const row = Math.floor(id / 10);
    const col = id % 10;
    for (let i = 0; i < 8; i++) {
      state.board[row][i] += mark;
      state.board[i][col] += mark;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      state.board[i][j] += mark;
    }
    for (let i = row, j = col; i >= 0 && j < 8; i--, j++) {
      state.board[i][j] += mark;
    }
    for (let i = row, j = col; i < 8 && j >= 0; i++, j--) {
      state.board[i][j] += mark;
    }
    for (let i = row, j = col; i < 8 && j < 8; i++, j++) {
      state.board[i][j] += mark;
    }
    state.board[row][col] -= mark;
  }
}

export default Queens;
