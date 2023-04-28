import Game from "../Game";
import React from "react";

class chess extends Game{
    constructor(props){
        super(props);
        this.state = {
            playerNum: 2,
            turn: 0,
            rowNum : 8,
            colNum : 8,
            ElementType: "div",
            game: "chess",
        };
    }
    putPices(board){
        const pieces = [["rook","knight","bishop","queen","king","bishop","knight","rook"],["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]];
        const modifiedBoard = board.props.children.map((cell, index) => {
            if(index < 16) {
                const i = index < 7 ? 0 : 1;
                const j = index % 8;
                const piece = React.createElement("img", {src:"/pieces/black/"+pieces[i][j]+".png",key: index,className: "piece"});
                return React.cloneElement(cell, {children: [piece]});
            }else if(index > 47){
                const i = index <  56 ? 1 : 0;
                const j = index % 8;
                const piece = React.createElement("img", {src:"/pieces/white/"+pieces[i][j]+".png",key: index,className: "piece"});
                return React.cloneElement(cell, {children: [piece]});
            }
            return cell;
        });
        return (
            <div className="boardchess">{modifiedBoard}</div>
        )
    }
}

export default chess;