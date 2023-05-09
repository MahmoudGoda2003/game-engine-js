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
                {super.drawNames("cellconnect4", 6, 7)}
                {board}
            </>
        );
    }
    isValidMove(state, move) {//1 controller

    }

    updateState(state, move) {//2 controller

    }

    checkWin(state) { //4

    }

    updateBoard(state) { //3 edit the draw

    }











}
export default sudoku;