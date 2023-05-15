import Game from "../Game";
import React from "react";
import { ScoreBoard } from "../../scoreBoard/scoreBoard.js";

class chess extends Game{

    putPieces(board){
        const pieces = [["r","h","b","q","k","b","h","r"],["p","p","p","p","p","p","p","p"]];
        const modifiedBoard = board.props.children.map((cell, index) => {
          if(index < 16) {
            const i = index < 8 ? 0 : 1;
            const j = index % 8;
            const piece = React.createElement("img", {src:"/images/pieces/black/"+pieces[i][j].toUpperCase()+".png",name:pieces[i][j].toUpperCase(),key: index,className: "black",id:cell.props.id});
            return React.cloneElement(cell, {children: [piece], id: "0"});
          } else if(index > 47){
            const i = index < 56 ? 1 : 0;
            const j = index % 8;
            const piece = React.createElement("img", {src:"/images/pieces/white/"+pieces[i][j]+".png",name:pieces[i][j],key: index,className: "white",id:cell.props.id});
            return React.cloneElement(cell, {children: [piece], id: "0"});
          }
          return cell;
        });
        return (
            <>
            <ScoreBoard turn={true}/>
            {super.drawNames(8,8)}
            <div className="boardchess">{modifiedBoard}</div>
            </>
          
        )
      }            

    updateBoard(state){
        if(state.clicks === 1){
           document.getElementById(state.curr).style.backgroundColor = "green";
            return;
        }
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var element = document.getElementById(`${i}${j}`);
                if(state.board[i][j] === '' && element.className !== "cellchess"){
                    console.log("=")
                    console.log(`${i}${j}`)
                    element.parentNode.id = `${i}${j}`;
                    element.parentNode.innerHTML = "";
                }else if(state.board[i][j] !== '' && element.name !== state.board[i][j]){
                    if(element.className !== "cellchess"){element = element.parentNode;}
                    element.id = 0;
                    element.innerHTML = "";
                    const piece = document.createElement('img');
                    piece.src = "/images/pieces/"+(state.board[i][j] === state.board[i][j].toLowerCase() ? "white/" : "black/")+state.board[i][j]+".png";
                    piece.className =  state.board[i][j] === state.board[i][j].toLowerCase() ? "white" : "black";
                    piece.key = `${i}-${j}`;
                    piece.id = `${i}${j}`;
                    element.appendChild(piece);
                }
            }
        }
        const score1 = document.querySelector(".player1");
        const score2 = document.querySelector(".player2");
        score1.className = `score player1 ${!state.turn && "inactive"}`;
        score2.className = `score player2 ${state.turn && "inactive"}`;
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
        if(input.length != 2 || Math.floor(input/10) > 7 || Math.floor(input/10) < 0 || input % 10 > 7 || input % 10 < 0) return false;
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
        state.board[Math.floor(input/10)][input%10] = state.clicks?state.board[Math.floor(state.curr/10)][state.curr%10]:state.board[Math.floor(input/10)][input%10];
        state.board[Math.floor(state.curr/10)][state.curr%10] = state.clicks?'':state.board[Math.floor(state.curr/10)][state.curr%10];
        state.curr = input;
        state.turn = state.clicks?this.switchTurn(state):state.turn;
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
        let kings = 0;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(state.board[i][j].toLowerCase() === "k"){
                    kings++;
                }
            }
        }
        console.log(kings);
        return kings !== 2;
    } 
}

export default chess;