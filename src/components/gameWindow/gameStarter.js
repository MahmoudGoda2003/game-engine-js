import { useParams } from 'react-router-dom';
import './gameWindow.css'
import XO from "../games/tic tack toe/tic tack toes"

function getGame(gameName){
  if(gameName==="XO"){
    return new XO();
  }
}

export const GameStarter = () => {
  const { id } = useParams();
  const game = getGame(id);

  return(
    game.drawer()
  );
};

