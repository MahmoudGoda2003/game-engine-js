import { useParams } from 'react-router-dom';
import './gameWindow.css'
import XO from "../games/tic tack toe/tic tack toes"
import checkers from '../games/checkers/checkers';
import Queens from '../games/8queens/8queens';
import chess from '../games/chess/chess';

function getGame(gameName){
  if (gameName === 'XO') {
    return {
      game: new XO(),
      cssFile: "/css/tic tack toe.css"
    };
  }
  if (gameName === 'checkers') {
    return {
      game: new checkers(),
      cssFile: '/css/checkers.css',
    };
  }
  if (gameName === '8queens') {
    return {
      game: new Queens(),
      cssFile: '/css/8queens.css',
    };
  }
  if (gameName === 'chess') {
    return {
      game: new chess(),
      cssFile: '/css/chess.css',
    };
  }
}

export const GameStarter = () => {
  const { id } = useParams();
  const {game,cssFile} = getGame(id);
  return(
    <>
    <link rel="stylesheet" href={cssFile} />
    {game.drawer()}
    </>
  );
};

