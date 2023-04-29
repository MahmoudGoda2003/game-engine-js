import React from 'react'
import Game from '../Game.js'
import { ScoreBoard } from '../../scoreBoard/scoreBoard.js'

class checkers extends Game{
    move = "";
    jump = false;
    constructor(props){
        super(props)
        this.state = {
            turn: true,
            arr: new Array(8).fill().map(() => new Array(8).fill(0))
        };
    }

    drawer(state){
        if(state === undefined){
          return this.inite()
        }  
        this.updateBoard(state)
    }

    updateBoard(state)
    {
        for(var i = 0 ; i < 8 ; i++)
        {
            for(var j = 0 ; j < 8 ; j++)
            {
                if(i % 2 !== j % 2)
                {
                    if(state.arr[i][j] === 1)
                        this.putBlack(""+i+j)
                    else if(state.arr[i][j] === -1)
                        this.putWhite(""+i+j)
                    else
                        this.makeEpty(""+i+j)
                }
            }
        }
    }

    controller(state, move){
        if(this.move === "")
            this.selectSrc(move)
        else if(this.selectDest(move))
        {
            if(this.isValidMove(state, this.move))
            {
                this.updateState(state, this.move)
                this.drawer(state)
                this.move = ""
                if(this.jump && this.getTarget(state) !== "")
                {
                    return;
                }
                this.jump = false;
                state.turn = ! state.turn
                this.toggilColor()
            }
        }
    }


    updateState(state,move){
        const i1 = parseInt(move[0])
        const j1 = parseInt(move[1])
        const i2 = parseInt(move[2])
        const j2 = parseInt(move[3])
        state.arr[i2][j2] = state.arr[i1][j1];
        state.arr[i1][j1] = 0;
        if(this.jump){
            state.arr[i1 + state.arr[i2][j2]][j1 + (j2-j1)/2] = 0
        }
    }

    isValidMove(state, move){
        const i1 = parseInt(move[0])
        const j1 = parseInt(move[1])
        const i2 = parseInt(move[2])
        const j2 = parseInt(move[3])
        // not on the diagonal
        if(Math.abs(j2-j1) !== Math.abs(i2-i1))
        {
            console.log("invalid move1");
            this.move = move.slice(0,2)
            return false;
        }
        // not forward
        if( (  i2 < i1 && state.turn ) || ( i2 > i1 && !state.turn))
        {
            console.log("invalid move2");
            this.move = move.slice(0,2)
            return false;
        }
        // do not jump over a friend
        if(Math.abs(i2-i1) !== 1 && !this.jump)
        {
            this.move = ""+ i1 + j1
            console.log("jump over a friend")
            return false;
        }
        
        
        return true;
    }

    getTarget(state)
    {
        var target = "";
        for(var i = 0 ; i < 8 ; i++)
        {
            for(var j = 0 ; j < 8 ; j++)
            {
                var direction = state.arr[i][j];
                // not empty and balck
                if(direction !== 0 && i%2 !== j %2 &&  i + direction !== -1 && i + direction !== 8) 
                {
                    // has turn
                    if((state.turn && direction === 1) || (!state.turn && direction === -1))
                    {
                        if(j !== 7 && state.arr[i+direction][j+1] === -1 * direction )
                        {
                            var ti = i + direction
                            var tj = j+1
                            
                            if(ti + direction > -1 && 2*tj-j >-1 &&ti + direction < 8 && 2*tj-j < 8 &&state.arr[ti+direction][tj + (tj - j)] === 0)
                            {
                                target = "" + ti + tj;
                                this.jump = true;
                                console.log("target +ve is " + target)
                                return target;
                            }
                        }
                        if(j !== 0 && state.arr[i+direction][j-1] === -1 * direction)
                        {
                            ti = i + direction;
                            tj = j -1;
                            
                            if(ti + direction > -1 && 2*tj-j >-1 &&ti + direction < 8 && 2*tj-j < 8 &&  state.arr[ti+direction][tj + (tj - j)] === 0)
                            {
                                target = "" + ti + tj;
                                this.jump = true;
                                console.log("target -ve is " + target)
                                return target;
                            }
                        }
                        
                    }
                }
            }
        }
        this.jump = false
        return target;
    }

    toggilColor(){
        const score1 = document.querySelector(".p1-score");
        const score2 = document.querySelector(".p2-score");
        score1.className = `score p1-score ${!this.state.turn && "inactive"}`;
        score2.className = `score p2-score ${this.state.turn && "inactive"}`;
    }

    inite(){
        const board = this.drawGameBoard(8,8, "checkers","div");
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
        c.style.width = "50px"
        c.style.height = "50px"
        c.style.backgroundColor = "white"
        c.style.borderRadius = "100%"
        c.style.border = "2px solid black"
    }

    putBlack(n){
        const c = document.getElementById(n);
        c.style.width = "50px"
        c.style.height = "50px"
        c.style.backgroundColor = "black"
        c.style.borderRadius = "100%"
        c.style.border = "2px solid white"
    }

    selectSrc(src){
        var t = this.getTarget(this.state)
        var n = src.target.id
        const i1 = parseInt(n[0])
        const j1 = parseInt(n[1])
        
        // there is no possible jump
        if(t === "")
        {
            if((this.state.turn &&  this.state.arr[i1][j1] !== 1) || (!this.state.turn &&  this.state.arr[i1][j1] !== -1))
                return;
            this.move = n;
            const c = document.getElementById(src.target.id);
            c.style.border = "2px solid red"
        }
        // there must be a jump
        else
        {
            var direction = this.state.arr[i1][j1]
            // stand on correct place
            if(i1+ direction == t[0] && Math.abs(j1 - t[1]) == 1)
            {
                this.move = n;
                const c = document.getElementById(src.target.id);
                c.style.border = "2px solid red"
            }
        }
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
            if(this.jump)
            {
                if(Math.abs(i1 - parseInt(this.move[0])) === Math.abs(j1 - parseInt(this.move[1])) && Math.abs(j1 - parseInt(this.move[1])) === 2)
                {
                    this.move = this.move+n;
                    return true;
                }
                return false;
            }
            this.move = this.move+n;
            return true;
        }
    }

    putPieces()
    {
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