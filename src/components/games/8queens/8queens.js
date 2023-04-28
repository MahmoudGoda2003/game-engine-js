import React from 'react'
import Game from '../Game.js'

class Queens extends Game{

    constructor(props){
        super(props)
        this.state = {
            board: new Array(8).fill().map(() => new Array(8).fill(0)),
            count: 8,
            rowNum: 8,
            colNum: 8,
            ElementType: "div",
            game: "queens",
            move: null,
            events:{onClick: (event) => this.controller(this.state, event),onMouseEnter: (event) => this.hover("enter",this.state,event),onMouseLeave: (event) => this.hover("leave",this.state,event)}
        };
    }
    updateBoard(state){
        const piece = document.createElement("div");
        piece.className = "fas fa-chess-queen"
        state.move.target.append(piece);
    }
    putPices(board){
        return (<>
            <div className="state">unsolved</div>
            {board}
            </>
        )
    }
    isValidMove(state, input){
        const id = input.target.id;
        if(id ==="" || state.board[Math.floor(id/10)][id%10]===5){
            this.undo(state,input);
            return false;
        } 
        if(state.board[Math.floor(id/10)][id%10]!== 0) return false;
        return true;
    }
    updateState(state, input){
        const id = input.target.id;
        this.markBoard(state,id,1)
        state.move = input;
        state.count--;
    }
    checkWin(state){
        if(state.count===0){
            const stateDiv = document.querySelector(".state");
            if (stateDiv) {
            stateDiv.textContent = "solved";
            }
        }
    }
    undo(state,input){
        const id = input.target.id===''?input.target.parentNode.id:input.target.id;
        this.markBoard(state,id,-1);
        state.count++;
        document.getElementById(id).innerHTML = '';
        const stateDiv = document.querySelector(".state");
        if (stateDiv) {
        stateDiv.textContent = "unsolved";
        }
    }
    markBoard(state,id, mark){
        const row = Math.floor(id/10);
        const col = id%10;
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
    hover(hover,state,input){
        if(hover==="leave"){
            input.target.style.backgroundColor="";
            return;
        } 
        const id = input.target.id;
        if(state.board[Math.floor(id/10)][id%10]!==0 ){
            input.target.style.backgroundColor="red";
        }else{
            input.target.style.backgroundColor="green";
        }
    }

}

export default Queens