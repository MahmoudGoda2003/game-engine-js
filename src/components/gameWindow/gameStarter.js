import React from 'react';
import { useParams } from 'react-router-dom';
import './gameWindow.css'
import XO from "../games/tic tack toe/tic tack toes"

export const GameStarter = () => {
  const { id } = useParams();
  console.log(id);
  const game = getGame(id);
  return(
    game.drawer()
  );
};
function getGame(gameName){
  if(gameName==="XO"){
    let game = new XO
    return new XO();
  }
}
