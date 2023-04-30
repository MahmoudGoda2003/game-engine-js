import React from "react";
import "./MainMenu.css";
import { Link } from "react-router-dom";

const menuItems = [
  { iconClass: "fas fa-chess-queen", id: "8queens" },
  { iconClass: "fas fa-chess-board", id: "checkers" },
  { iconClass: "fas fa-circle", id: "connect4" },
  { iconClass: "fas fa-th", id: "XO" },
  { iconClass: "far fa-edit", id: "sudoku" },
  { iconClass: "fas fa-chess", id: "chess" },
];

function MainMenu() {
  return (
    <nav className="menu">
      <input className="menu-toggler" type="checkbox" />
      <label htmlFor="menu-toggler"></label>
      <ul>
        {menuItems.map((item) => (
          <li className="menu-item" key={item.id}>
            <Link
              className={item.iconClass}
              id={item.id}
              to={`/game/${item.id}`}
            ></Link>
          </li>
        ))}
      </ul>
      <div className="container">
        <span>Select Game</span>
      </div>
    </nav>
  );
}

export default MainMenu;
