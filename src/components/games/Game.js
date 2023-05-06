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
        return this.startGame(state);
    }, 1000);

    return this.init(init);
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

  drawGameBoard(rowNum, colNum, name, ElementType) {
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
            />
          );
        } else {
          cells.push(
            <ElementType
              key={`${row}-${col}`}
              name={"black" + name}
              className={cellName}
              id={`${row}${col}`}
            />
          );
        }
      }
    }
    return <div className={"board" + name}>{cells}</div>;
  }
}
export default Game;
