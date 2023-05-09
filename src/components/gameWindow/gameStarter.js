import { useParams } from "react-router-dom";
import "./gameWindow.css";
import XO from "../games/tic tack toe/tic tack toes";
import checkers from "../games/checkers/checkers";
import Queens from "../games/8queens/8queens";
import chess from "../games/chess/chess";

function getGame(gameName) {
  if (gameName === "XO") {
    return {
      game: new XO(),
      cssFile: "/css/tic tack toe.css",
      state:{turn: 1,playerNum: 2,board: new Array(9).fill(""),rowNum: 3,colNum: 3,ElementType: "div",game: "xo"}
    };
  }
  if (gameName === "checkers") {
    return {
      game: new checkers(),
      cssFile: "/css/checkers.css",
      state:{turn: false, arr: checkersInitCase(), jump: false,rowNum: 8,colNum: 8,ElementType: "div",game: "checkers"} 
    };
  }
  if (gameName === "8queens") {
    return {
      game: new Queens(),
      cssFile: "/css/8queens.css",
      state: {board: new Array(8).fill().map(() => new Array(8).fill(0)),count: 8,rowNum: 8,colNum: 8,ElementType: "div",game: "queens",undo:0}}}
  if (gameName === "chess") {
    return {
      game: new chess(),
      cssFile: "/css/chess.css",
      state: {playerNum: 2,turn: 1,rowNum : 8,colNum : 8,ElementType: "div",game: "chess",curr: null,clicks: 0,kings:2,board:[['R','H','B','Q','K','B','H','R'],['P','P','P','P','P','P','P','P'],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['p','p','p','p','p','p','p','p'],['r','h','b','q','k','b','h','r']]}
    };
  }
}

function checkersInitCase(){
  var arr = new Array(8).fill().map(() => new Array(8).fill(0))
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i % 2 !== j % 2) {
        if (i < 3) {
          arr[i][j] = 1;
        } else if (i > 4) {
          arr[i][j] = -1;
        }
      }
    }
  }
  return arr
}

export function GameStarter(){
  const { id } = useParams();
  const { game, cssFile, state } = getGame(id);
  return (
    <>
      <link rel="stylesheet" href={cssFile} />
      {game.startGame(state)}
    </>
  );
};