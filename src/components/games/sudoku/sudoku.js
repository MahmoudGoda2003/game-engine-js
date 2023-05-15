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
                {super.drawNames(9, 9)}
                {board}
            </>
        );
    }
    checkRow(grid, i, j, num) {
        for (let col = 0; col < 9; col++) {
            console.log("grid[i][col] : " + grid[i][col]);
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
    deletePiece(state, move) {
        const row = move[0];
        const col = move[1];
        console.group("in delete " + row + " " + col);

        console.log(state.basicMoves[row][col] === false && state.board[row][col] !== null);
        if (state.basicMoves[row][col] === false && state.board[row][col] !== null) {
            console.log("deletePiece : true");
            return true;
        }
        console.log("deletePiece : false");
        return false;

    }

    checkIsMoveDelete(move) {
        // const numPlayed1 = parseInt(move[2]) + 1;
        const numPlayed2 = parseInt(move[3]) + 1;
        if (move.length === 4 && move[2] === "4" && numPlayed2 === 4)
            return true;
        return false;
    }

    isValidMove(state, move) {//1 controller
        console.log("move : " + move);
        //if (move.length !== 3) return false; // move is not valid
        console.log("chech delete return : " + this.checkIsMoveDelete(move));
        if (this.checkIsMoveDelete(move)) {
            state.deleteOrDraw = false;
            console.log("in del");
            console.log(" size : ------" + state.basicMoves.length + " basic moves : \n");
            state.basicMoves.map((row) => console.log(row));

            if (this.deletePiece(state, move)) {
                console.log("in del true");
                return true;
            }
            else{
                console.log("in del false");
                return false;
            }
                
        }
        state.deleteOrDraw = true;
        if (move.length !== 3) return false;
        console.log("move : " + move);
        const row = move[0];
        const col = move[1];
        console.log(typeof move);
        console.log("move : 2      :: " + move[2]);
        const numPlayed = parseInt(move[2]) + 1;
        console.log(typeof col);

        // goto initaialized
        console.log("row : " + row + " col : " + col + " numPlayed : " + numPlayed + " cond : " + (row < 0 || row > 8 || col < 0 || col > 8 || numPlayed < 1 || numPlayed > 9 || state.board[row][col] !== null));
        if (row < 0 || row > 8 || col < 0 || col > 8 || numPlayed < 1 || numPlayed > 9 || state.board[row][col] !== null) return false;

        let checkRow = this.checkRow(state.board, row, col, numPlayed);
        let checkCol = this.checkCol(state.board, row, col, numPlayed);
        let checkBox = this.checkBox(state.board, row, col, numPlayed);
        console.log("checkRow : " + checkRow + " checkCol : " + checkCol + " checkBox : " + checkBox + "grid :" + state.board);
        if (checkRow && checkCol && checkBox) return true;

        return false;
    }

    updateState(state, move) {//2 controller
        const row = move[0];
        const col = move[1];
        console.log(typeof move);
        const numPlayed = state.deleteOrDraw ? parseInt(move[2]) + 1 : null;
        state.board[row][col] = numPlayed;
    }
    updateBoard(state) { //3 edit the draw
        for (let i = 0; i < state.rowNum; i++) {
            for (let j = 0; j < state.rowNum; j++) {
                if (state.board[i][j] !== null) {
                    //console.log(i + "" + j);
                    let elem = document.getElementById(i + "" + j);
                    elem.innerHTML = state.board[i][j];
                }else {
                    let elem = document.getElementById(i + "" + j);
                    elem.innerHTML = "";
                }

            }
        }
    }

    checkWin(state) { //4
        let freq = [];
        for (let i = 0; i < 27; i++) {
            freq[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        // rows 0 -> 8  cols 9 -> 17  boxes 18 -> 26
        for (let i = 0; i < state.rowNum; i++) {
            for (let j = 0; j < state.colNum; j++) {
                let num = state.board[i][j];
                if (num !== null) {
                    freq[i][num - 1]++; // increment the freq of the number in the row
                    freq[j + 9][num - 1]++; // increment the freq of the number in the col
                    let row = Math.floor(i / 3);
                    let col = Math.floor(j / 3);
                    let transforamtion = row * 3 + col;
                    freq[transforamtion + 18][num - 1]++; // increment the freq of the number in the box
                }
            }
        }
        for (let i = 0; i < 27; i++) {
            for (let j = 0; j < 9; j++) {
                if (freq[i][j] !== 1) return false;
            }
        }
        console.log("win");
        return true;

    }




}
export default sudoku;