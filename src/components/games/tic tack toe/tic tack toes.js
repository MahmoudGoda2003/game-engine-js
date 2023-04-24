import React from 'react'
import Game from '../Game.js'
import "./tic tack toe.css"
import { ScoreBoard } from '../../scoreBoard/scoreBoard.js'

class XO extends Game {

  constructor(props){
    super(props)
    this.state = {
      turn: true,
      board: new Array(9),
      score1: 0,
      score2: 0
    };
  }

  drawer(state){
    if(state === undefined){
      return this.inite()
    }
    const piece = document.createElement("div");
    piece.className = this.state.turn ? "circle" : "cross";
    state.target.append(piece);
  }

  controller(state, input){
    const id = input.target.id
    if(state.board[(id%10)+3*Math.floor(id/10)]!=="") return;
    state.board[(id%10)+3*Math.floor(id/10)] = state.turn ? "o" : "x";
    this.drawer(input)
    this.checkWin(state)
    this.setState({
      turn: !state.turn
    })
    this.updateScoreboard()
  }

  checkWin(state){
    const winStates = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
    winStates.forEach(array =>{
      let win = array.every(cell => state.board[cell]===(state.turn?"o":"x"))
      if(win){
        if(state.turn){
          this.setState({score1: this.state.score1 + 1});
        } else {
          this.setState({score2: this.state.score2 + 1});
        }
        this.removeEvents()
        return
      }
    })
  }

  updateScoreboard() {
    const score1 = document.querySelector(".p1-score");
    const score2 = document.querySelector(".p2-score");
    score1.textContent = `p1 - ${this.state.score1}`;
    score2.textContent = `p2 - ${this.state.score2}`;
    score1.className = `score p1-score ${!this.state.turn && "inactive"}`;
    score2.className = `score p2-score ${this.state.turn && "inactive"}`;
  }
  
  removeEvents(){
    const cells = document.querySelectorAll(".cellxo")
    cells.forEach(cell => cell.replaceWith(cell.cloneNode(true)))
  }

  inite(){
    const board = this.drawGameBoard(3,3, "xo");
    const cells = board.props.children.map((cell, index) => {
      return React.cloneElement(cell, {
        onClick: (event) => this.controller(this.state, event)
      });
    });
    this.setState({
      turn: true,
      board: new Array(9).fill(""),
    });
    return (
      <>
        <ScoreBoard score1={this.state.score1} score2={this.state.score2} turn={this.state.turn}/>
        <div className="boardxo">{cells}</div>
      </>
    )
  }
}

export default XO
