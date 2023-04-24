import React from 'react'
import Game from '../Game.js'
import "./checkers.css"
import { ScoreBoard } from '../../scoreBoard/scoreBoard.js'

class checkers extends Game{

    constructor(props){
        super(props)
        this.state = {
            turn: true,
            board: new Array(64).fill(""),
        };
    }

    drawer(state){
        if(state === undefined){
          return this.inite()
        }  
    }

    inite(){
        const board = this.drawGameBoard(8,8, "checkers");
        const cells = board.props.children.map((cell, index) => {
            return React.cloneElement(cell, {
            onClick: (event) => this.controller(this.state, event)
            });
        });
        this.setState({
            turn: true,
            board: new Array(64),
        });
        this.putPieces();
        return (
            <>
            <ScoreBoard score1={this.state.score1} score2={this.state.score2} turn={this.state.turn}/>
            <div className="boardcheckers">{cells}</div>
            </>
        )
    }

    putPieces(){
        console.log(this.state.board);
    }
}
export default checkers