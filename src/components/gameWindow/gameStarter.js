import { useParams } from 'react-router-dom';
import './gameWindow.css'
import XO from "../games/tic tack toe/tic tack toes"
import checkers from '../games/checkers/checkers';

function getGame(gameName){
  if(gameName==="XO"){
    return new XO();
  }
  if(gameName === "checkers"){
    return new checkers();
  }
}

export const GameStarter = () => {
  const { id } = useParams();
  const game = getGame(id);
  return(
    game.drawer()
  );
};

