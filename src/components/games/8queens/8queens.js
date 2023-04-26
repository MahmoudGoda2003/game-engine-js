import React from 'react'
import Game from '../Game.js'
import "./8queens.css"

class Queens extends Game{

    constructor(props){
        super(props)
        this.state = {
            board: new Array(8).fill().map(() => new Array(8).fill("")),
            count: 8,
            stack: new Array(8).fill(0)
        };
    }
    drawer(state){
        if(state === undefined){
            return this.init()
        }
        const piece = document.createElement("div");
        piece.className = "fas fa-chess-queen"
        state.target.append(piece);
    }
    controller(state, input){
        const id = input.target.id;
        if(state.board[Math.floor(id/10)][id%10]!=="" || id === "") return;
        this.drawer(input)
        this.markBoard(state,id,"-")
        state.count--;
        state.stack.push(id)
        if(state.count===0){
            const stateDiv = document.querySelector(".state");
            if (stateDiv) {
            stateDiv.textContent = "solved";
            }
        }
    }
    undo(state){
        const id=state.stack.pop()
        this.setState({
            count: state.count+1
        })
        const stateDiv = document.querySelector(".state");
        if (stateDiv) {
        stateDiv.textContent = "unsolved";
        }
    }
    markBoard(state,id, mark){
        const row = Math.floor(id/10);
        const col = id%10;
        for (let i = 0; i < 8; i++) {
            state.board[row][i] = mark;
            state.board[i][col] = mark;
        }
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            state.board[i][j] = mark;
        }
        for (let i = row, j = col; i >= 0 && j < 8; i--, j++) {
            state.board[i][j] = mark;
        }
        for (let i = row, j = col; i < 8 && j >= 0; i++, j--) {
            state.board[i][j] = mark;
        }
        for (let i = row, j = col; i < 8 && j < 8; i++, j++) {
            state.board[i][j] = mark;
         }
    }
    hover(hover,state,input){
        if(hover==="leave"){
            input.target.style.backgroundColor="";
            return;
        } 
        const id = input.target.id;
        if(state.board[Math.floor(id/10)][id%10]!=="" ){
            input.target.style.backgroundColor="red";
        }else{
            input.target.style.backgroundColor="green";
        }
    }

    init(){
        const board = this.drawGameBoard(8,8, "queens","div");
        const cells = board.props.children.map((cell, index) => {
            return React.cloneElement(cell, {
            onClick: (event) => this.controller(this.state, event),
            onMouseEnter: (event) => this.hover("enter",this.state,event),
            onMouseLeave: (event) => this.hover("leave",this.state,event)
            });
        });
        return (<>
            <div className="state">unsolved</div>
            <div className="boardqueens">{cells}</div>
            </>
        )
    }
}

export default Queens