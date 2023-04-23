import './App.css';
import {Routes, Route} from "react-router-dom";
import MainMenu from "./components/mainMenu/MainMenu";
import { GameStarter } from './components/gameWindow/gameStarter';
function App() {
  return (
      <Routes>
        <Route path='/' element={<MainMenu/>}></Route>
        <Route path='/game/:id' element={<GameStarter/>}></Route>
      </Routes>
  );
}

export default App;
