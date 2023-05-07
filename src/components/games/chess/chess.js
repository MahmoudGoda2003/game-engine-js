import Game from "../Game";
import React from "react";

class chess extends Game{

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
           document.getElementById(state.curr).style.backgroundColor = "green";
            return;
        }
        const currParent = document.getElementById(state.curr).parentNode;
        let currNode = document.getElementById(state.curr);
        if(currNode.className!=="cellchess"){
            currParent.id = state.curr;
            currParent.innerHTML = "";
            currNode = currParent;
        }
        const prevParent = document.getElementById(state.prev).parentNode;
        const prev = prevParent.removeChild(document.getElementById(state.prev));
        prevParent.id = state.prev;
        prev.style.backgroundColor = "";
        prev.id=currNode.id;
        currNode.id="0"
        currNode.appendChild(prev);
    }

    getColor(board,id){
        const row = Math.floor(id/10);
        const col = id%10;
        console.log(board);
        if(board[row][col] === '') return "cellchess";
        if(board[row][col] === board[row][col].toLowerCase()) return "white";
        return "black";
    }

    isValidMove(state, input){
        if(input.length > 2 || Math.floor(input/10) > 7 || Math.floor(input/10) < 0 || input % 10 > 7 || input % 10 < 0) return false;
        if(state.curr === null && this.getColor(state.board,input) !== "white") return false;
        if((state.clicks === 0 && (this.getColor(state.board,input) !== (state.turn === 0 ? "black" : "white")))) return false;
        if(state.curr === null || state.clicks === 0) return true;
        const currid = input;
        const previd = state.curr;
        const dy = Math.floor(currid/10) - Math.floor(previd/10);
        const dx = currid%10 - previd%10;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const pieceColor = this.getColor(state.board,state.curr);
        
        if (dx === 0 && dy === 0) {
            return false;
        }

        if (pieceColor !== (state.turn === 0 ? "black" : "white")) {
            return false;
        }
        let valid = true;
        switch(state.board[Math.floor(state.curr/10)][state.curr%10].toLowerCase()){
            case "p": valid = this.validatePown(state.board, pieceColor, dy, absDy, absDx, previd, currid); break;
            case "r": valid = this.validateRook(state.board, pieceColor, dy, dx, previd, currid); break;
            case "h": valid = this.validateKnight(state.board, pieceColor, absDy, absDx, currid); break;
            case "b": valid = this.validateBishop(state.board, pieceColor, dy, dx, absDx, absDy, previd, currid); break;
            case "q": valid = this.validateQueen(state.board, pieceColor, dy, dx, absDx, absDy, previd, currid); break;
            case "k": valid = this.validateKing(state.board, pieceColor, dy, dx, absDx, absDy, currid); break;
        }
        if(!valid){
            if(this.getColor(state.board,input) === (state.turn === 0 ? "black" : "white")){  
                document.getElementById(state.curr).style.backgroundColor = "";
                state.clicks = 0;
                valid = true;
            }
        }
        
        return valid;
    }

    updateState(state, input){
        state.prev = state.clicks?state.curr:null;
        state.curr = input;
        state.turn = state.clicks?this.switchTurn(state):state.turn;
        if(state.clicks && state.board[Math.floor(input/10)][input%10].toLowerCase() === 'k'){state.kings--;}
        state.board[Math.floor(input/10)][input%10] = state.clicks?state.board[Math.floor(state.prev/10)][state.prev%10]:state.board[Math.floor(input/10)][input%10];
        state.clicks = (state.clicks+1)%2;
    }

    validatePown(board, pieceColor, dy, absDy, absDx, previd, currid){

        if (pieceColor === "white" && dy >= 0 || pieceColor === "black" && dy <= 0) {
            return false;
        }

        if (absDy === 1 && absDx === 1 && this.getColor(board, currid) !== (pieceColor === "white"?"black":"white") ) {
            return false;
        }

        if (absDy === 1 && absDx === 0) {
            if (this.getColor(board, currid) !== "cellchess") {
              return false;
            }
        } else if (absDy === 2 && absDx === 0) {
            if ((this.getColor(board, currid) !== "cellchess" || this.getColor(board, (Math.floor(previd/10)+(pieceColor==="white"?-1:1))*10+previd%10) !== "cellchess") ||
                (pieceColor==="white"?Math.floor(previd/10)!==6:Math.floor(previd/10)!==1)){
              return false;
            }
        } else if (absDy>=2 || absDx>1){
            return false;
        }
        return true;
    }

    validateRook(board, pieceColor, dy, dx, previd, currid){
        if (dx !== 0 && dy !== 0) {
            return false;
        }
        if(this.getColor(board, currid) === pieceColor){
            return false;
        }
        if (dx === 0) {
            const direction = dy > 0 ? 1 : -1;
            for (let i = Math.floor(previd/10) + direction; i !== Math.floor(currid/10); i += direction) {
              if (this.getColor(board, i*10+previd%10) !== "cellchess") {
                return false;
              }
            }
        } 
        else {
            const direction = dx > 0 ? 1 : -1;
            for (let i = previd%10 + direction; i !== currid%10; i += direction) {
                if (this.getColor(board, Math.floor(previd/10)*10+i) !== "cellchess") {
                    return false;
                }
            }
        }
        return true;
    }

    validateKnight(board, pieceColor, absDy, absDx, currid){
        if (absDx !== 1 && absDx !== 2 || absDy !== 1 && absDy !== 2 || absDx + absDy !== 3 || this.getColor(board, currid) === pieceColor) {
            return false;
        }
        return true;
    }

    validateBishop(board, pieceColor, dy, dx, absDx, absDy, previd, currid){
        if (absDx !== absDy) {
            return false;
        }
        if(this.getColor(board, currid) === pieceColor){
            return false;
        }
        const directionX = dx > 0 ? 1 : -1;
        const directionY = dy > 0 ? 1 : -1;
        for (let i = 1; i < absDx; i++) {
            const x = previd%10 + i * directionX;
            const y = Math.floor(previd/10) + i * directionY;
            if (this.getColor(board, y*10+x) !== "cellchess") {
                 return false;
            }
        }
        return true;
    }

    validateQueen(board, pieceColor, dy, dx, absDx, absDy, previd, currid){
        if (absDx !== absDy && dx !== 0 && dy !== 0) {
            return false;
        }
        if(this.getColor(board, currid) === pieceColor){
            return false;
        }
        if (dx === 0) {
            const direction = dy > 0 ? 1 : -1;
            for (let i = Math.floor(previd/10) + direction; i !== Math.floor(currid/10); i += direction) {
              if (this.getColor(board, i*10+previd%10) !== "cellchess") {
                return false;
              }
            }
        } 
        else if (dy === 0) {
            const direction = dx > 0 ? 1 : -1;
            for (let i = previd%10 + direction; i !== currid%10; i += direction) {
                if (this.getColor(board, Math.floor(previd/10)*10+i) !== "cellchess") {
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
                if (this.getColor(board, y*10+x) !== "cellchess") {
                    return false;
                }
            }
        }
        return true;
    }   

    validateKing(board, pieceColor, dy, dx, absDx, absDy, currid){
        if (absDx > 1 || absDy > 1) {
            return false;
        }
        if(this.getColor(board, currid) === pieceColor){
            return false;
        }
        return true;
    }
    checkWin(state){
       return state.kings === 1;
    } 
}

export default chess;