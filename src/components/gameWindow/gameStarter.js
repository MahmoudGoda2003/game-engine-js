import { useParams } from "react-router-dom";
import "./gameWindow.css";
import XO from "../games/tic tack toe/tic tack toes";
import checkers from "../games/checkers/checkers";
import Queens from "../games/8queens/8queens";
import chess from "../games/chess/chess";
import connect4 from "../games/connect4/connect4.js";
import sudoku from "../games/sudoku/sudoku";

function getGame(gameName) {
  if (gameName === "XO") {
    return {
      game: new XO(),
      cssFile: "/css/tic tack toe.css",
      state:{turn: 1,playerNum: 2,board: new Array(9).fill(""),rowNum: 3,colNum: 3,ElementType: "div",game: "xo",innerValue:false}
    };
  }
  if (gameName === "checkers") {
    return {
      game: new checkers(),
      cssFile: "/css/checkers.css",
      state:{turn: 1,playerNum: 2,arr: checkersInitCase(), jump: false,rowNum: 8,colNum: 8,ElementType: "div",game: "checkers",innerValue:false} 
    };
  }
  if (gameName === "8queens") {
    return {
      game: new Queens(),
      cssFile: "/css/8queens.css",
      state: {board: new Array(8).fill().map(() => new Array(8).fill(0)),count: 8,rowNum: 8,colNum: 8,ElementType: "div",game: "queens",undo:0,innerValue:false}
    }
  }
  if (gameName === "chess") {
    return {
      game: new chess(),
      cssFile: "/css/chess.css",
      state: {playerNum: 2,turn: 1,rowNum : 8,colNum : 8,ElementType: "div",game: "chess",curr: null,clicks: 0,board:[['R','H','B','Q','K','B','H','R'],['P','P','P','P','P','P','P','P'],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['p','p','p','p','p','p','p','p'],['r','h','b','q','k','b','h','r']], innerValue:false}
    };
  }
  if(gameName === "connect4"){
    return {
      game : new connect4(),
      cssFile : "/css/connect4.css",
      state: {turn : 1, playerNum: 2, board: new Array(6).fill().map(() => new Array(7).fill(100)),rowNum: 6,colNum: 7, game : "connect4", ElementType: "div", innerValue:false}
    };
  }
  if(gameName === "sudoku"){
    const { result, basicMoves } = sudoku2d();
    return {
      game : new sudoku(), 
      cssFile : "/css/sudoku.css",
      state : {turn : 1, board : result, rowNum: 9,colNum: 9, game : "sudoku", ElementType: "div",innerValue:true, basicMoves: basicMoves, deleteOrDraw:true} // deleteOrDraw = false -> draw, deleteOrDraw = true -> delete
    };
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function removeNumbers(board, percentage) {
  console.log("start remove :");
  // Calculate the number of numbers to remove.
  var count = Math.floor(81 * percentage);

  console.log("count : " + count);


  // Loop while there are still numbers to remove.
  while (count > 0) {
    // Generate a random index.
    let index = Math.floor(Math.random() * 81);

    // Check if the number at the index is not zero.
    if (board[index] !== null) {
      // Set the number at the index to zero.
      console.log("remove element : " + board[index] + " index "+ index);

      board[index] = null;
      count--;
    }
    console.log("end remove");

  }
  return board;
}


function isValid(board, index, value) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 9; i++) {
    if (board[row * 9 + i] === value) return false;
    if (board[i * 9 + col] === value) return false;
    const boxIndex = (boxRow + Math.floor(i / 3)) * 9 + boxCol + (i % 3);
    if (board[boxIndex] === value) return false;
  }
  return true;
}
function generateSudokuHelper(board, index) {
  if (index === board.length) return true; // base case: board is complete
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  nums = shuffle(nums);
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (isValid(board, index, num)) {
      board[index] = num;
      if (generateSudokuHelper(board, index + 1)) {
        return true; // recursive case: board is complete
      }
      board[index] = 0;
    }
  }
  return false;
}

function generateSudoku() {
  const board = Array(81).fill(0);
  generateSudokuHelper(board, 0);
  return removeNumbers(board, Math.random() * 0.7); // remove 50% of the numbers
  
}
function sudoku2d() {
  let board = generateSudoku();
  let basicMoves = new Array(9).fill().map(() => new Array(9).fill(false));
  const result = [];
  for (let i = 0; i < 9; i++) {
    result.push(board.slice(i * 9, i * 9 + 9));
  }
  //result.map((row) => console.log(row)); 
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++){
      if(result[i][j] !== null){
        basicMoves[i][j] = true;
      }
    }
  }
  return {result, basicMoves};
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