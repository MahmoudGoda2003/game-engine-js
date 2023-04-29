export class Game{
  drawer(state){
    if(state === undefined){
      return this.init(this.state);
    }
    this.updateBoard(state);
  } 
  init(state){
    const board = this.drawGameBoard(state.rowNum,state.colNum,state.game,state.ElementType,state.events);
    return this.putPieces(board);
  }
  putPieces(board){}

  updateBoard(state){}

  controller(state,move){
     if(!this.isValidMove(state,move)){
      return;
     }
     this.updateState(state,move);
     this.drawer(state);
     this.checkWin(state);
  }
  isValidMove(state,move){}

  updateState(state,move){}

  checkWin(state){}
  

  switchTurn(state) {
    return (state.turn+1)%state.playerNum;
  }

  drawGameBoard(rowNum, colNum, name, ElementType, eventListeners){
    const board = document.querySelector('.board');
    if (board) {
        board.remove();  
    }

    const cells = [];
    const cellName = "cell"+ name;
    for (let row = 0; row < rowNum; row++) {
        for (let col = 0; col < colNum; col++) {
          if((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)){
            cells.push(
              <ElementType key={`${row}-${col}`}
              name={"white"+name}
              className={cellName}
              id={`${row}${col}`} 
              {...eventListeners}
              />
          );
          }else{
            cells.push(
              <ElementType key={`${row}-${col}`}
              name={"black"+name}
              className={cellName}
              id={`${row}${col}`} 
              {...eventListeners}
              />
          );
          }  
        }
    }
    return (
        <div className={"board"+name}>
          {cells}
        </div>
    );
  }
}
export default Game