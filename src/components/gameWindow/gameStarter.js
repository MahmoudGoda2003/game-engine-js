import { useParams } from 'react-router-dom';
import './gameWindow.css'
import XO from "../games/tic tack toe/tic tack toes"
import checkers from '../games/checkers/checkers';
import Queens from '../games/8queens/8queens';

function getGame(gameName){
  if(gameName==="XO"){
    return new XO();
  }
  if(gameName === "checkers"){
    return new checkers();
  }
  if(gameName === "8queens"){
    return new Queens();
  }
}

export const GameStarter = () => {
  const { id } = useParams();
  const game = getGame(id);
  return(
    game.drawer()
  );
};

