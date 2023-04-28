import React from 'react'
import Game from '../Game.js'
import { ScoreBoard } from '../../scoreBoard/scoreBoard.js'

class XO extends Game {

  constructor(props){
    super(props)
    this.state = {
      turn: 0,
      playerNum: 2,
      board: new Array(9).fill(""),
      rowNum: 3,
      colNum: 3,
      ElementType: "div",
      game: "xo",
      move: null,
      score1: 0,
      score2: 0,
      events:{onClick: (event) => this.controller(this.state, event)}
    };
  }

  updateBoard(state){
    const piece = document.createElement("div");
    piece.className = this.state.turn ? "circle" : "cross";
    state.move.target.append(piece);
  }

  putPices(board){
    return (
      <>
        <ScoreBoard score1={this.state.score1} score2={this.state.score2} turn={!this.state.turn}/>
        {board}
      </>
    )
  }
  isValidMove(state, input){
    const id = input.target.id;
    if(state.board[(id%10)+3*Math.floor(id/10)]!=="" || id === "") return false;
    return true;
  }
  updateState(state, input){
    const id = input.target.id;
    state.board[(id%10)+3*Math.floor(id/10)] = state.turn ? "o" : "x";
    state.move = input;
    state.turn = !this.switchTurn(state);
  }

  checkWin(state){
    const winStates = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
    winStates.forEach(array =>{
      let win = array.every(cell => state.board[cell]===(!state.turn?"o":"x"))
      if(win){
        if(state.turn){
          state.score1= this.state.score1 + 1;
        } else {
          state.score2= this.state.score2 + 1;
        }
        this.removeEvents()
        return;
      }
    })
    this.updateScoreboard(state);
  }

  updateScoreboard(state) {
    const score1 = document.querySelector(".p1-score");
    const score2 = document.querySelector(".p2-score");
    score1.textContent = `p1 - ${state.score1}`;
    score2.textContent = `p2 - ${state.score2}`;
    score1.className = `score p1-score ${state.turn && "inactive"}`;
    score2.className = `score p2-score ${!state.turn && "inactive"}`;
  }
  
  removeEvents(){
    const cells = document.querySelectorAll(".cellxo")
    cells.forEach(cell => cell.replaceWith(cell.cloneNode(true)))
  }
}

export default XO
