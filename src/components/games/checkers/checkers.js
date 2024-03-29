import React from "react";
import Game from "../Game.js";
import { ScoreBoard } from "../../scoreBoard/scoreBoard.js";

class checkers extends Game {


  updateBoard(state) {
    console.log(state.arr)
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (i % 2 !== j % 2) {
          if (state.arr[i][j] === 1) this.putBlack("" + i + j);
          else if (state.arr[i][j] === -1) this.putWhite("" + i + j);
          else this.makeEpty("" + i + j);
        }
      }
    }
    this.toggilColor(state)

  }

  updateState(state, move) {
    console.log("in update state")
    const i1 = parseInt(move[0]);
    const j1 = parseInt(move[1]);
    const i2 = parseInt(move[2]);
    const j2 = parseInt(move[3]);
    state.arr[i2][j2] = state.arr[i1][j1];
    state.arr[i1][j1] = 0;
    if (state.jump) {
      state.arr[i1 + state.arr[i2][j2]][j1 + (j2 - j1) / 2] = 0;
    }
    console.log(state.arr)
    if(!state.jump || state.jump && this.getTarget(state) === ""){
      state.turn = this.switchTurn(state)
      console.log(state.turn)
    }
    return state
  }

  isValidMove(state, move) {
    if(move.length !== 4)
      return false
    const i1 = parseInt(move[0]);
    const j1 = parseInt(move[1]);
    const i2 = parseInt(move[2]);
    const j2 = parseInt(move[3]);
    // check src
    if(!this.selectSrc(move.slice(0,2), state)){
      console.log("wrong source cell")
      return false
    }
    // check dest
    if(!this.selectDest(move.slice(2),state,move.slice(0,2))){
      console.log("wrong destnation cell")
      return false
    }
    // not on the diagonal
    if (Math.abs(j2 - j1) !== Math.abs(i2 - i1)) {
      console.log("invalid move1");
      return false;
    }
    // not forward
    if ((i2 < i1 && !state.turn) || (i2 > i1 && state.turn)) {
      console.log("invalid move2");
      return false;
    }
    // do not jump over a friend
    if (Math.abs(i2 - i1) !== 1 && !state.jump) {
      console.log("jump over a friend");
      return false;
    }
    return true;
  }

  checkWin(state) {
    var c1 = 0;
    var c2 = 0;
    for(var i = 0 ; i < 8 ; i++)
    {
      for(var j = 0 ; j < 8 ; j++){
        if (i % 2 !== j % 2){
          if(state.arr[i][j] === -1)
            c1++
          if(state.arr[i][j] === 1)
            c2++
        }
        if(c1 !== 0 && c2 !== 0)
          return false
      }
    }
    return true
  }

  getTarget(state) {
    var target = "";
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var direction = state.arr[i][j];
        // not empty and balck
        if (
          direction !== 0 &&
          i % 2 !== j % 2 &&
          i + direction !== -1 &&
          i + direction !== 8
        ) {
          // has turn
          if (
            (!state.turn && direction === 1) ||
            (state.turn && direction === -1)
          ) {
            if (j !== 7 && state.arr[i + direction][j + 1] === -1 * direction) {
              var ti = i + direction;
              var tj = j + 1;

              if (
                ti + direction > -1 &&
                2 * tj - j > -1 &&
                ti + direction < 8 &&
                2 * tj - j < 8 &&
                state.arr[ti + direction][tj + (tj - j)] === 0
              ) {
                target = "" + ti + tj;
                state.jump = true;
                console.log("target +ve is " + target);
                return target;
              }
            }
            if (j !== 0 && state.arr[i + direction][j - 1] === -1 * direction) {
              ti = i + direction;
              tj = j - 1;

              if (
                ti + direction > -1 &&
                2 * tj - j > -1 &&
                ti + direction < 8 &&
                2 * tj - j < 8 &&
                state.arr[ti + direction][tj + (tj - j)] === 0
              ) {
                target = "" + ti + tj;
                state.jump = true;
                console.log("target -ve is " + target);
                return target;
              }
            }
          }
        }
      }
    }
    state.jump = false;
    return target;
  }

  /*switchTurn(state) {
    state.turn = !state.turn;
  }*/

  toggilColor(state) {
    const score1 = document.querySelector(".player1");
    const score2 = document.querySelector(".player2");
    score1.className = `score player1 ${!state.turn && "inactive"}`;
    score2.className = `score player2 ${state.turn && "inactive"}`;
  }

  makeEpty(n) {
    const c = document.getElementById(n);
    c.style.backgroundColor = "grey";
    c.style.border = "none";
  }

  putWhite(n) {
    const c = document.getElementById(n);
    c.style.width = "50px";
    c.style.height = "50px";
    c.style.backgroundColor = "white";
    c.style.borderRadius = "100%";
    c.style.border = "2px solid blue";
  }

  putBlack(n) {
    const c = document.getElementById(n);
    c.style.width = "50px";
    c.style.height = "50px";
    c.style.backgroundColor = "black";
    c.style.borderRadius = "100%";
    c.style.border = "2px solid red";
  }

  selectSrc(src,state) {
    var t = this.getTarget(state);
    const i1 = parseInt(src[0]);
    const j1 = parseInt(src[1]);
    // there is no possible jump only check turn
    if (t === "") {
      if ((!state.turn && state.arr[i1][j1] !== 1) ||(state.turn && state.arr[i1][j1] !== -1))
        return false;
      else 
        return true;
    }
    // there must be a jump check that the src is valid
    else {
      var direction = state.arr[i1][j1];
      // stand on correct place
      if (i1 + direction == t[0] && Math.abs(j1 - t[1]) == 1) 
        return true
      else 
        return false
    }
  }

  selectDest(dest, state, src) {
    const i1 = parseInt(dest[0]);
    const j1 = parseInt(dest[1]);

    // destination not empty
    if (state.arr[i1][j1] !== 0) {
      console.log("not empty dest")
      return false;
    } 
    // may be valid
    else {
      // there is a jump
      if (state.jump) {
        // correct jump
        if (
          Math.abs(i1 - parseInt(src[0])) ===
            Math.abs(j1 - parseInt(src[1])) &&
          Math.abs(j1 - parseInt(src[1])) === 2
        ) {
          return true;
        }
        // not correct jump
        return false;
      }
      // empty and no jump 
      // more check will happen in isValidMove
      return true;
    }
  }

  putPieces(board) {
    
    return (
      <>
        <ScoreBoard turn={true}/>
        {super.drawNames(8,8)}
        {board}
      </>
    );
  }
}
export default checkers;
