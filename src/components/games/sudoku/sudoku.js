import Game from "../Game";
import React from "react";
import { ScoreBoard } from "../../scoreBoard/scoreBoard.js";

class sudoku extends Game {


    putPieces(board) {
        return (
            <>
                {/* <ScoreBoard
                    score1={this.state.score1}
                    score2={this.state.score2}
                    turn={this.state.turn}
                /> */}
                {super.drawNames("cellsudoku", 9, 9)}
                {board}
            </>
        );
    }
    checkRow(grid, i, j, num) {
        for (let col = 0; col < 9; col++) {
            if (grid[i][col] === num) {
                return false;
            }
        }
        return true;
    }
    checkCol(grid, i, j, num) {
        for (let row = 0; row < 9; row++) {
            if (grid[row][j] === num) {
                return false;
            }
        }
        return true;
    }
    checkBox(grid, i, j, num) {
        const leftBond = Math.floor(j / 3) * 3;
        const rightBond = leftBond + 3; // < only in looping
        const upBond = Math.floor(i / 3) * 3;
        const downBond = upBond + 3;

        for (let n = upBond; n < downBond; n++) {
            for (let m = leftBond; m < rightBond; m++) {
                if (grid[n][m] === num) return false;
            }
        }
        return true;

    }
    isValidMove(state, move) {//1 controller
        if (move.length !== 3) return false;
        console.log("move : " + move);
        const row = move[0] - 1;
        const col = move[1] - 1;
        console.log("move : 2      :: " + move[2]);
        const numPlayed = move[2];
        // goto initaialized
        console.log("row : " + row + " col : " + col + " numPlayed : " + numPlayed + " cond : "+ (row < 0 || row > 8 || col < 0 || col > 8 || numPlayed < 1 || numPlayed > 9 || state.board[row][col] !== 0) );
        if (row < 0 || row > 8 || col < 0 || col > 8 || numPlayed < 1 || numPlayed > 9 || state.board[row][col] !== 0) return false;

        let checkRow = this.checkRow(state.board, row, col, numPlayed);
        let checkCol = this.checkCol(state.board, row, col, numPlayed);
        let checkBox = this.checkBox(state.board, row, col, numPlayed);
        console.log("checkRow : " + checkRow + " checkCol : " + checkCol + " checkBox : " + checkBox);
        if (checkRow && checkCol && checkBox) return true;

        return false;
    }

    updateState(state, move) {//2 controller
        const row = move[0] - 1;
        const col = move[1] - 1;
        const numPlayed = move[2];
        state.board[row][col] = numPlayed;
    }
    updateBoard(state) { //3 edit the draw
        for(let i = 0 ; i < state.rowNum ; i++){
            for(let j = 0 ; j < state.rowNum ; j++){
                if (state.board[i][j] !== 0) {
                    //console.log(i + "" + j);
                    let elem = document.getElementById(i + "" + j);
                    elem.innerHTML = state.board[i][j];
                }

            }
        }
    }

    checkWin(state) { //4
        
    }

    //start generator

    
  
    //end generator




}
export default sudoku;