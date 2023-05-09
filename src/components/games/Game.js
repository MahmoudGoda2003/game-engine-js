export class Game {
  drawer(state) {
    this.updateBoard(state);
  }
  init(state) {
    const board = this.drawGameBoard(
      state.rowNum,
      state.colNum,
      state.game,
      state.ElementType,
      state.board,
      state.innerValue,
    );
    return this.putPieces(board);
  }
  putPieces(board) {}

  updateBoard(state) {}

  convertStringToInt(input) {
    if(input===null){return null}
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      if(i%2===0){
        if (charCode < 49 || charCode > 57) { 
          return null;
        }
        result += charCode - 49;
        continue;
      }
      if (charCode >= 97 && charCode <= 106) { 
        result += charCode - 97;
      } else if (charCode >= 65 && charCode <= 74) { 
        result += charCode - 65;
      }else{
        return null;
      }
    }
    return result;
  }

  getinput() {
    let input = null;
    while(input===null){
      input = this.convertStringToInt(prompt("Enter your move"));
    }
    return  input;
  }

  startGame(init) {
    setTimeout(() => {
        const input = this.getinput();
        var state = this.controller(init, input);
        if(state!==undefined){
          this.drawer(state);
        }else{
          state=init
          alert("invalid move");
        }
        if(this.checkWin(state)){return}
        return this.startGame(state);
    }, 1000);

    return this.init(init);
  }

  controller(state, move) {
    if (!this.isValidMove(state, move)) {
      return;
    }
    this.updateState(state, move);
    return state;
  }
  isValidMove(state, move) {}

  updateState(state, move) {}

  checkWin(state) {}

  switchTurn(state) {
    return (state.turn + 1) % state.playerNum;
  }

  drawGameBoard(rowNum, colNum, name, ElementType, values, innerValue) {
    const board = document.querySelector(".board");
    if (board) {
      board.remove();
    }
    const cells = [];
    const cellName = "cell" + name;
    for (let row = 0; row < rowNum; row++) {
      for (let col = 0; col < colNum; col++) {
        if (
          (row % 2 === 0 && col % 2 === 0) ||
          (row % 2 === 1 && col % 2 === 1)
        ) {
          cells.push(
            <ElementType
              key={`${row}-${col}`}
              name={"white" + name}
              className={cellName}
              id={`${row}${col}`}
            >{innerValue?values[row][col]:null} </ElementType>
          );
        } else {
          cells.push(
            <ElementType
              key={`${row}-${col}`}
              name={"black" + name}
              className={cellName}
              id={`${row}${col}`}
            >{innerValue?values[row][col]:null} </ElementType>
          );
        }
        
      }
    }
    return <div className={"board" + name}>{cells}</div>
  }

  drawNames(rowNum, colNum){
    const allLetters = "abcdefghi";
    const allNums = "123456789";
    var startI = 0;
    const letters = [];
    const nums = [];
    for(let col = 0 ; col < colNum; col++)
    {
      letters.push(<span 
        className="letter"
        key={`l${col}`}
        id={`${col}`}>
        {allLetters[startI++]}
        </span>
      )
    }
    startI=0;
    for (let row = 0; row < rowNum; row++) {
      nums.push(<span 
        className="num"
        key={`n${row}`}
        id={`${row}`}>
        {allNums[startI++]}
        </span>
      )
    }
    return <>
      <div className="allLetters">{letters}</div>
      <div className="allnums">{nums}</div>
    </>
    
  }
}
export default Game;
