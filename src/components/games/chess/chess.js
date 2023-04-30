import Game from "../Game";
import React from "react";

class chess extends Game{

    constructor(props){
        super(props);
        this.state = {
            playerNum: 2,
            turn: 1,
            rowNum : 8,
            colNum : 8,
            ElementType: "div",
            game: "chess",
            events: {onClick: (event) => this.controller(this.state, event)},
            curr: null,
            prev: null,
            clicks: 0,
        };
    }

    putPieces(board){
        const pieces = [["rook","knight","bishop","queen","king","bishop","knight","rook"],["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]];
        const modifiedBoard = board.props.children.map((cell, index) => {
          if(index < 16) {
            const i = index < 8 ? 0 : 1;
            const j = index % 8;
            const piece = React.createElement("img", {src:"/pieces/black/"+pieces[i][j]+".png",name:pieces[i][j],key: index,className: "black",id:cell.props.id});
            return React.cloneElement(cell, {children: [piece], id: "0"});
          } else if(index > 47){
            const i = index < 56 ? 1 : 0;
            const j = index % 8;
            const piece = React.createElement("img", {src:"/pieces/white/"+pieces[i][j]+".png",name:pieces[i][j],key: index,className: "white",id:cell.props.id});
            return React.cloneElement(cell, {children: [piece], id: "0"});
          }
          return cell;
        });
        return (
          <div className="boardchess">{modifiedBoard}</div>
        )
      }            

    updateBoard(state){
        if(state.prev === null){
            state.curr.target.style.backgroundColor = "green";
            return;
        }
        console.log(state);
        const currParent = state.curr.target.parentNode;
        let currNode = state.curr.target;
        if(state.curr.target.className!=="cellchess"){
            currParent.id = state.curr.target.id;
            currParent.innerHTML = "";
            currNode = currParent;
        }
        const prevParent = state.prev.target.parentNode;
        prevParent.id = state.prev.target.id;
        const prev = prevParent.removeChild(state.prev.target);
        prev.style.backgroundColor = "";
        prev.id=currNode.id;
        currNode.id="0"
        currNode.appendChild(prev);
    }

    isValidMove(state, input){
        if(state.curr === null && input.target.className!=="white") return false;
        if((state.clicks === 0 && (input.target.className !== (state.turn === 0 ? "black" : "white")))) return false;
        if(state.curr === null || state.clicks === 0) return true;
        const currid = input.target.id;
        const previd = state.curr.target.id;
        const dy = Math.floor(currid/10) - Math.floor(previd/10);
        const dx = currid%10 - previd%10;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const pieceColor = state.curr.target.className;
        
        if (dx === 0 && dy === 0) {
            return false;
        }

        if (pieceColor !== (state.turn === 0 ? "black" : "white")) {
            return false;
        }
        let valid = true;
        switch(state.curr.target.name){
            case "pawn": valid = this.validatePown(pieceColor, dy, absDy, absDx, previd, currid); break;
            case "rook": valid = this.validateRook(pieceColor, dy, dx, previd, currid); break;
            case "knight": valid = this.validateKnight(pieceColor, absDy, absDx, currid); break;
            case "bishop": valid = this.validateBishop(pieceColor, dy, dx, absDx, absDy, previd, currid); break;
            case "queen": valid = this.validateQueen(pieceColor, dy, dx, absDx, absDy, previd, currid); break;
            case "king": valid = this.validateKing(pieceColor, dy, dx, absDx, absDy, currid); break;
        }
        if(!valid){
            if(input.target.className === (state.turn === 0 ? "black" : "white")){
                state.curr.target.style.backgroundColor = "";
                state.curr = input;
                state.curr.target.style.backgroundColor = "green";
            }
        }
        
        return valid;
    }

    updateState(state, input){
        state.prev = state.clicks?state.curr:null;
        state.curr = input;
        state.turn = state.clicks?this.switchTurn(state):state.turn;
        state.clicks = (state.clicks+1)%2;
    }

    validatePown(pieceColor, dy, absDy, absDx, previd, currid){

        if (pieceColor === "white" && dy >= 0 || pieceColor === "black" && dy <= 0) {
            return false;
        }

        if (absDy === 1 && absDx === 1 && document.getElementById(currid).className !== (pieceColor === "white"?"black":"white") ) {
            return false;
        }

        if (absDy === 1 && absDx === 0) {
            if (document.getElementById(currid).className !== "cellchess") {
              return false;
            }
        } else if (absDy === 2 && absDx === 0) {
            if ((document.getElementById(currid).className !== "cellchess" || document.getElementById((Math.floor(previd/10)+(pieceColor==="white"?-1:1))*10+previd%10).className !== "cellchess") ||
                (pieceColor==="white"?Math.floor(previd/10)!==6:Math.floor(previd/10)!==1)){
              return false;
            }
        } else if (absDy>=2 || absDx>1){
            return false;
        }
        return true;
    }

    validateRook(pieceColor, dy, dx, previd, currid){
        if (dx !== 0 && dy !== 0) {
            return false;
        }
        if(document.getElementById(currid).className === pieceColor){
            return false;
        }
        if (dx === 0) {
            const direction = dy > 0 ? 1 : -1;
            for (let i = Math.floor(previd/10) + direction; i !== Math.floor(currid/10); i += direction) {
              if (document.getElementById(i*10+previd%10).className !== "cellchess") {
                return false;
              }
            }
        } 
        else {
            const direction = dx > 0 ? 1 : -1;
            for (let i = previd%10 + direction; i !== currid%10; i += direction) {
                if (document.getElementById(Math.floor(previd/10)*10+i).className !== "cellchess") {
                    return false;
                }
            }
        }
        return true;
    }

    validateKnight(pieceColor, absDy, absDx, currid){
        if (absDx !== 1 && absDx !== 2 || absDy !== 1 && absDy !== 2 || absDx + absDy !== 3 || document.getElementById(currid).className === pieceColor) {
            return false;
        }
        return true;
    }

    validateBishop(pieceColor, dy, dx, absDx, absDy, previd, currid){
        if (absDx !== absDy) {
            return false;
        }
        if(document.getElementById(currid).className === pieceColor){
            return false;
        }
        const directionX = dx > 0 ? 1 : -1;
        const directionY = dy > 0 ? 1 : -1;
        for (let i = 1; i < absDx; i++) {
            const x = previd%10 + i * directionX;
            const y = Math.floor(previd/10) + i * directionY;
            if (document.getElementById(y*10+x).className !== "cellchess") {
                 return false;
            }
        }
        return true;
    }

    validateQueen(pieceColor, dy, dx, absDx, absDy, previd, currid){
        if (absDx !== absDy && dx !== 0 && dy !== 0) {
            return false;
        }
        if(document.getElementById(currid).className === pieceColor){
            return false;
        }
        if (dx === 0) {
            const direction = dy > 0 ? 1 : -1;
            for (let i = Math.floor(previd/10) + direction; i !== Math.floor(currid/10); i += direction) {
              if (document.getElementById(i*10+previd%10).className !== "cellchess") {
                return false;
              }
            }
        } 
        else if (dy === 0) {
            const direction = dx > 0 ? 1 : -1;
            for (let i = previd%10 + direction; i !== currid%10; i += direction) {
                if (document.getElementById(Math.floor(previd/10)*10+i).className !== "cellchess") {
                    return false;
                }
            }
        } 
        else {
            const directionX = dx > 0 ? 1 : -1;
            const directionY = dy > 0 ? 1 : -1;
            for (let i = 1; i < absDx; i++) {
                const x = previd%10 + i * directionX;
                const y = Math.floor(previd/10) + i * directionY;
                if (document.getElementById(y*10+x).className !== "cellchess") {
                    return false;
                }
            }
        }
        return true;
    }   

    validateKing(pieceColor, dy, dx, absDx, absDy, currid){
        if (absDx > 1 || absDy > 1) {
            return false;
        }
        if(document.getElementById(currid).className === pieceColor){
            return false;
        }
        return true;
    }
    checkWin(state){
        const kings = document.getElementsByName("king");
        if(kings.length === 1){
          this.removeEvents();
        }
    } 
    removeEvents() {
        const cells = document.querySelectorAll(".cellchess");
        cells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
    }
}

export default chess;