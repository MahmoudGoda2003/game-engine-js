import React from 'react'
import Game from '../Game.js'
import "./checkers.css"
import { ScoreBoard } from '../../scoreBoard/scoreBoard.js'

class checkers extends Game{
    move = "";
    constructor(props){
        super(props)
        this.state = {
            turn: true,
            arr: new Array(8)
        };
        for(var i = 0 ; i  < 8 ; i++)
        {
            this.state.arr[i] = new Array(8).fill(0);
        }
    }

    drawer(state){
        if(state === undefined){
          return this.inite()
        }  
    }

    controller(state, input){
        if(this.move === "")
            this.selectSrc(input)
        else if(this.selectDest(input))
        {
            const i1 = parseInt(this.move[0])
            const j1 = parseInt(this.move[1])
            const i2 = parseInt(this.move[2])
            const j2 = parseInt(this.move[3])
            if(Math.abs(j2-j1) !== Math.abs(i2-i1))
            {
                console.log("invalid move1");
                this.move = this.move.slice(0,2)
                return;
            }
                
            if( ( (j2 < j1 && i2 < i1) && state.turn ) || ((j2 > j1 && i2 > i1) && !state.turn))
            {
                console.log("invalid move2");
                this.move = this.move.slice(0,2)
                return;
            }
            state.arr[i2][j2] = state.arr[i1][j1]
            state.arr[i1][j1] = 0;
            this.makeEpty(this.move.slice(0,2))
            if(state.turn)
                this.putBlack(this.move.slice(2,5))
            else
            {
                
                this.putWhite(this.move.slice(2,5))
            }
            this.move = ""
            state.turn = ! state.turn
        }
      }

    inite(){
        const board = this.drawGameBoard(8,8, "checkers");
        const cells = board.props.children.map((cell, index) => {
            return React.cloneElement(cell, {
            onClick: (event) => this.controller(this.state, event)
            });
        });
        this.putPieces();
        return (
            <>
            <ScoreBoard score1={this.state.score1} score2={this.state.score2} turn={this.state.turn}/>
            <div className="boardcheckers">{cells}</div>
            </>
        )
    }

    makeEpty(n){
        const c = document.getElementById(n);
        c.style.backgroundColor = "grey"
        c.style.border = "none"
    }

    putWhite(n){
        const c = document.getElementById(n);
        c.style.backgroundColor = "white"
        c.style.borderRadius = "100%"
        c.style.border = "2px solid black"
    }

    putBlack(n){
        const c = document.getElementById(n);
        c.style.backgroundColor = "black"
        c.style.borderRadius = "100%"
        c.style.border = "2px solid white"
    }

    selectSrc(src){
        var n = src.target.id
        const i1 = parseInt(n[0])
        const j1 = parseInt(n[1])
        if((this.state.turn &&  this.state.arr[i1][j1] !== 1) || (!this.state.turn &&  this.state.arr[i1][j1] !== -1))
            return;
        this.move = n;
        const c = document.getElementById(src.target.id);
        c.style.border = "2px solid red"
    }

    selectDest(src){
        var n = src.target.id
        const i1 = parseInt(n[0])
        const j1 = parseInt(n[1])
        // destination not empty
        if(this.state.arr[i1][j1] !== 0)
        {
            if((this.state.turn &&  this.state.arr[i1][j1] !== 1) || (!this.state.turn &&  this.state.arr[i1][j1] !== -1))
                return false;
            const c = document.getElementById(this.move);
            if(this.state.arr[i1][j1] === 1)
                c.style.border = "2px solid white"
            else
            c.style.border = "2px solid black"
            this.selectSrc(src)
            return false;
        }else{
            this.move = this.move+n;
            return true;
        }
    }

    putPieces(){
        for(var i = 0 ; i < 8 ; i++)
        {
            for(var j = 0 ; j < 8 ; j++)
            {
                if(i%2 !== j %2)
                {
                    if(i < 3)
                    {   
                        this.state.arr[i][j] = 1;
                    }
                    else if(i > 4)
                    {
                        this.state.arr[i][j] = -1;
                    }
                }
            }
        }
    }
}
export default checkers