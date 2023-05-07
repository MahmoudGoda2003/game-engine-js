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
      state:{turn: 0,playerNum: 2,board: new Array(9).fill(""),rowNum: 3,colNum: 3,ElementType: "div",game: "xo",move: null}
    };
  }
  if (gameName === "checkers") {
    return {
      game: new checkers(),
      cssFile: "/css/checkers.css",
    };
  }
  if (gameName === "8queens") {
    return {
      game: new Queens(),
      cssFile: "/css/8queens.css",
      state: {board: new Array(8).fill().map(() => new Array(8).fill(0)),count: 8,rowNum: 8,colNum: 8,ElementType: "div",game: "queens",move: null,undo:0}}}
  if (gameName === "chess") {
    return {
      game: new chess(),
      cssFile: "/css/chess.css",
      state: {playerNum: 2,turn: 1,rowNum : 8,colNum : 8,ElementType: "div",game: "chess",curr: null,prev: null,clicks: 0, kings:2,board:[['R','H','B','Q','K','B','H','R'],['P','P','P','P','P','P','P','P'],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['p','p','p','p','p','p','p','p'],['r','h','p','q','k','p','h','r']]}
    };
  }
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