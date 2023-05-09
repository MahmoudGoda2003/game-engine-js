export class Game {
  drawer(state) {
    if (state === undefined) {
      return this.init(this.state);
    }
    this.updateBoard(state);
  }
  init(state) {
    const board = this.drawGameBoard(
      state.rowNum,
      state.colNum,
      state.game,
      state.ElementType,
      state.events
    );
    return this.putPieces(board);
  }
  putPieces(board) {}

  updateBoard(state) {}

  getinput() {
    let input = null;
    while(input===null){
     input = prompt("Enter your move");
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
        //
        console.log(state.board);
        //
        return this.startGame(state);
    }, 1000);

    return <>
      {/* <div>{this.drawNames("cell"+init.game,init.rowNum,init.colNum)}</div> */}
      <div>{this.init(init)}</div>
      
    </>
    
  }

  controller(state, move) {
    if (!this.isValidMove(state, move)) {
      return;
    }
    this.updateState(state, move);
    //this.drawer(state);
    //this.checkWin(state);
    return state;
  }
  isValidMove(state, move) {}

  updateState(state, move) {}

  checkWin(state) {}

  switchTurn(state) {
    return (state.turn + 1) % state.playerNum;
  }

  drawGameBoard(rowNum, colNum, name, ElementType, grid) {
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
            >
              {grid[row][col]}
            </ElementType>
          );
        } else {
          cells.push(
            <ElementType
              key={`${row}-${col}`}
              name={"black" + name}
              className={cellName}
              id={`${row}${col}`}
            >
              {grid[row][col]}
            </ElementType>
          );
        }
        grid[row][col] = 100; // basic value user can't delete it
      }
    }
    return <div className={"board" + name}>{cells}</div>
  }

  drawNames(cellName, rowNum, colNum){
    const allLetters = "abcdefghi";
    const allNums = "123456789";
    var startI = 0;
    const letters = [];
    const nums = [];
    for(let col = 0 ; col < colNum; col++)
    {
      letters.push(<span 
        className={cellName}
        id={`${col}`}>
        {allLetters[startI++]}
        </span>
      )
    }
    startI=0;
    for (let row = 0; row < rowNum; row++) {
      nums.push(<span 
        className={cellName}
        id={`n${row}`}>
        {allNums[startI++]}
        </span>
      )
    }
    return <div className="names">
      <div className="allLetters">{letters}</div>
      <div className="allnums">{nums}</div>
    </div>
    
  }
}
export default Game;
