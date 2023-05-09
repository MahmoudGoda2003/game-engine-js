import Game from "../Game";
import React from "react";
import { ScoreBoard } from "../../scoreBoard/scoreBoard.js";

class connect4 extends Game {

  putPieces(board) {

    return (
      <>
        <ScoreBoard turn={true}/>
        {super.drawNames(6, 7)}
        {board}
      </>
    );
  }
  isEmpty(state, row, col) {
    return state.board[row][col] === 0;
  }
  bellowIsFilled(state, row, col) {
    if (row === 5) return true;
    // return state.board[row + 1][col] !== 0;

    return state.board[row + 1][col] !== 0;

  }

  isValidMove(state, move) {//1 controller  //return boolean

    if (move.length !== 2) return false;
    const row = move.charAt(0) - 1;
    const col = move.charCodeAt(1) - "a".charCodeAt(0);
    if (row > 5 || row < 0 || col < 0 || col > 6) return false;
    //console.log(row + "-col "+col)
    if (this.isEmpty(state, row, col) && this.bellowIsFilled(state, row, col)) {
      console.log("valid \n");
      return true;
    } else {
      console.log("invalid");
    }
    return false;
  }

  updateState(state, move) {//2 controller
    const row = move.charAt(0) - 1;
    const col = move.charCodeAt(1) - "a".charCodeAt(0);
    state.board[row][col] = state.turn;
    state.turn = state.turn % 2 + 1;
    state.board.map((e) => { console.log(e) });
  }
  checkHorizontal(state, i, j) {
    const turn = state.board[i][j];
    const board = state.board;
    let right = 0;
    let left = 0;
    if (turn === 0) return 0;
    for (let n = j + 1; n < state.colNum; n++) {
      if (board[i][n] === turn) right++;
      else break;
    }
    for (let n = j - 1; n >= 0; n--) {
      if (board[i][n] === turn) left++;
      else break;
    }
    return right + left + 1;

  }
  checkVertical(state, i, j) {
    const turn = state.board[i][j];
    const board = state.board;
    let up = 0;
    let down = 0;
    if (turn === 0) return 0;
    for (let n = i + 1; n < state.rowNum; n++) {
      if (board[n][j] === turn) down++;
      else break;
    }
    for (let n = i - 1; n >= 0; n--) {
      if (board[n][j] === turn) up++;
      else break;
    }
    return up + down + 1;

  }
  checkMainDiagonal(state, i, j) {
    const turn = state.board[i][j];
    const board = state.board;
    let upleft = 0;
    let downright = 0;
    if (turn === 0) return 0;
    for (let n = i - 1, m = j - 1; n >= 0 && m >= 0; n--, m--) {
      if (board[n][m] === turn) upleft++;
      else break;
    }
    for (let n = i + 1, m = j + 1; n < state.rowNum && m < state.colNum; n++, m++) {
      if (board[n][m] === turn) downright++;
      else break;
    }
    return upleft + downright + 1;

  }
  checkNonMainDiagonal(state, i, j) {
    const turn = state.board[i][j];
    const board = state.board;
    let upright = 0;
    let downleft = 0;
    if (turn === 0) return 0;
    for (let n = i - 1, m = j + 1; n >= 0 && m < state.colNum; n--, m++) {
      if (board[n][m] === turn) upright++;
      else break;
    }
    for (let n = i + 1, m = j - 1; n < state.rowNum && m >= 0; n++, m--) {
      if (board[n][m] === turn) downleft++;
      else break;
    }
    return upright + downleft + 1;

  }
  checkWin(state) { //4
    for (let i = 0; i < state.rowNum; i++) {
      for (let j = 0; j < state.colNum; j++) {
        let Hori = this.checkHorizontal(state, i, j);
        let Vert = this.checkVertical(state, i, j);
        let Mdiag = this.checkMainDiagonal(state, i, j);
        let NonMdiag = this.checkNonMainDiagonal(state, i, j);
        if (Hori >= 4 || Vert >= 4 || Mdiag >= 4 | NonMdiag >= 4) {
          console.log("win");
          return true;
        }
      }
    }
    return false;
  }

  updateBoard(state) { //3 edit the draw
    for (let i = 0; i < state.rowNum; i++) {
      for (let j = 0; j < state.colNum; j++) {
        if (state.board[i][j] !== 0) {
          console.log(i + "" + j);
          let elem = document.getElementById(i + "" + j);
          if (state.board[i][j] === 1)
            elem.style.backgroundColor = "blue";
          else if (state.board[i][j] === 2)
            elem.style.backgroundColor = "red";

        }
      }
    }
  }


}
export default connect4;