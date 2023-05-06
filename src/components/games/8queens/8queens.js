import React from "react";
import Game from "../Game.js";

class Queens extends Game {
 
  updateBoard(state) {
    if(state.undo){
      document.getElementById(state.move).innerHTML = "";
      const stateDiv = document.querySelector(".state");
      if (stateDiv) {stateDiv.textContent = "unsolved";}
      state.undo=0;
      return;
    }
    if(state.count === 0 ){
      const stateDiv = document.querySelector(".state");
      if (stateDiv) {
        stateDiv.textContent = "solved";
      }
    }
    const piece = document.createElement("div");
    piece.className = "fas fa-chess-queen";
    document.getElementById(state.move).append(piece);
  }
  putPieces(board) {
    return (
      <>
        <div className="state">unsolved</div>
        {board}
      </>
    );
  }
  isValidMove(state, input) {
    if(input.length > 2 || Math.floor(input/10) > 7 || Math.floor(input/10) < 0 || input % 10 > 7 || input % 10 < 0) return false;
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
