import Game from '../Game.js'
class XO extends Game{
  drawer(){
    return(
    this.drawGameBoard(3,3))
  }
}
export default XO