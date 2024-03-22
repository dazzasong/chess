import { Box, IconButton, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import whitePawn from "./assets/images/chesspieces/pw.png";
import whiteBishop from "./assets/images/chesspieces/bw.png";
import whiteKnight from "./assets/images/chesspieces/nw.png"
import whiteRook from "./assets/images/chesspieces/rw.png";
import whiteQueen from "./assets/images/chesspieces/qw.png";
import whiteKing from "./assets/images/chesspieces/kw.png";
import blackPawn from "./assets/images/chesspieces/pb.png";
import blackBishop from "./assets/images/chesspieces/bb.png";
import blackKnight from "./assets/images/chesspieces/nb.png";
import blackRook from "./assets/images/chesspieces/rb.png";
import blackQueen from "./assets/images/chesspieces/qb.png";
import blackKing from "./assets/images/chesspieces/kb.png";
import moveAudio from "./assets/sounds/move.mp3";
import captureAudio from "./assets/sounds/capture.mp3";
import checkAudio from "./assets/sounds/check.mp3";
import castleAudio from "./assets/sounds/castle.mp3";
import promoteAudio from "./assets/sounds/promote.mp3";
import tenSecondsAudio from "./assets/sounds/tenseconds.mp3";
import React from "react";

const moveSoundEffect = new Audio(moveAudio); // make sounds overlap...
const captureSoundEffect = new Audio(captureAudio);
const castleSoundEffect = new Audio(castleAudio);

function PromotionCard({ color }) {
  return (
    <Stack
      bgcolor={"gray"}
      border={"solid"}
    >
      <IconButton>
        <img src={color ? blackQueen : whiteQueen} alt={color ? "Black Queen" : "White Queen"} />
      </IconButton>
      <IconButton>
        <img src={color ? blackRook : whiteRook} alt={color ? "Black Rook" : "White Rook"} />
      </IconButton>
      <IconButton>
        <img src={color ? blackKnight : whiteKnight} alt={color ? "Black Knight" : "White Knight"} />
      </IconButton>
      <IconButton>
        <img src={color ? blackBishop : whiteBishop} alt={color ? "Black Bishop" : "White Bishop"} />
      </IconButton>
    </Stack>
  )
}

function ChessSquare({ x, y, piece, selected, destinated, clickSquare }) {
  const shaded = (x + y) % 2 === 0;
  let src;
  let bgcolor;
  switch (piece) {
    case 'pw':
      src = whitePawn;
      break;
    case 'bw':
      src = whiteBishop;
      break;
    case 'nw':
      src = whiteKnight;
      break;
    case 'rw':
      src = whiteRook;
      break;
    case 'qw':
      src = whiteQueen;
      break;
    case 'kw':
      src = whiteKing;
      break;
    case 'pb':
      src = blackPawn;
      break;
    case 'nb':
      src = blackKnight;
      break;
    case 'bb':
      src = blackBishop;
      break;
    case 'rb':
      src = blackRook;
      break;
    case 'qb':
      src = blackQueen;
      break;
    case 'kb':
      src = blackKing;
      break;
    default:
      src = null;
  }
  if (shaded) {
    bgcolor = "darkgoldenrod";
  } else {
    bgcolor = "burlywood";
  }
  if (selected) {
    bgcolor = "#ffff66";
  }
  return (
    <div onClick={() => clickSquare(x, y, selected, destinated)}>
      <Stack
        width={64}
        height={64}
        bgcolor={bgcolor}
        justifyContent="space-between"
        padding={0.2}
      >
        <Typography fontWeight="bold"
          sx={{
            userSelect: "none"
          }}
        >
          {x === 0 ? y + 1 : null}
        </Typography>
        { src && 
          <Box
            sx={{
              position: "absolute",
              userSelect: "none"
            }}
          >
            <img src={src} alt="Chess piece" />
          </Box>
        }
        {destinated && !piece ? <CircleIcon sx={{opacity: 0.2, alignSelf: "center"}} /> : null}
        {destinated && piece ? <CircleOutlinedIcon sx={{fontSize: 72, opacity: 0.2, alignSelf: "center"}} /> : null}
        <Typography fontWeight="bold" alignSelf="end"
          sx={{
            userSelect: "none"
          }}
        >
          {y === 0 ? String.fromCharCode(x + 97) : null}
        </Typography>
      </Stack>
    </div>
  )
}

function ChessColumn({ xAxis, pieces, selectedY, destinationY = [], clickSquare }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} piece={pieces[y]} selected={selectedY === y} destinated={destinationY.includes(y)} clickSquare={clickSquare} />)}
    </Stack>
  )
}

export default function ChessBoard() {
  const initialBoard = [
    ['rw', 'pw', null, null, null, null, 'pb', 'rb'],
    ['nw', 'pw', null, null, null, null, 'pb', 'nb'],
    ['bw', 'pw', null, null, null, null, 'pb', 'bb'],
    ['qw', 'pw', null, null, null, null, 'pb', 'qb'],
    ['kw', 'pw', null, null, null, null, 'pb', 'kb'],
    ['bw', 'pw', null, null, null, null, 'pb', 'bb'],
    ['nw', 'pw', null, null, null, null, 'pb', 'nb'],
    ['rw', 'pw', null, null, null, null, 'pb', 'rb']
  ];
  const [board, setBoard] = React.useState(initialBoard);
  const [turn, setTurn] = React.useState(0);
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const [destinationSquares, setDestinationSquares] = React.useState(null);
  const [castleStateWhite, setCastleStateWhite] = React.useState(0);
  const [castleStateBlack, setCastleStateBlack] = React.useState(0);
  let color = turn ? 'b' : 'w';
  let opposingColor = !turn ? 'b' : 'w';
  function spacesLen(x, y, direction) { // 0=up, 1=right, 2=down, 3=left, 4=upleft, 5=upright, 6=downright, 7=downleft
    switch (direction) {
      case 0:
        return 7 - y;
      case 1:
        return 7 - x;
      case 2:
        return y;
      case 3:
        return x;
      case 4:
        return Math.min(7 - y, x);
      case 5:
        return Math.min(7 - y, 7 - x);
      case 6:
        return Math.min(y, 7 - x);
      case 7:
        return Math.min(y, x);
      default:
        throw new Error("Invalid direction!");
    }
  }
  function clickSquare(x, y, selected, destinated) {
    function canMove(toX, toY) {
      if (toX < 0 || toX > 7 || toY < 0 || toY > 7) {
        return false;
      } else if (board[toX][toY] && board[toX][toY][1] === color) {
        return false;
      }
      // Checks if king will be in check
      let tempBoard = board.map(innerArray => innerArray.slice());
      tempBoard[toX][toY] = tempBoard[x][y];
      tempBoard[x][y] = null;
      let kingX, kingY;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (tempBoard[i][j] === `k${color}`) {
            kingX = i;
            kingY = j;
          }
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 0); i++) {
        if (tempBoard[kingX][kingY+i] === `r${opposingColor}` || tempBoard[kingX][kingY+i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX][kingY+i]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 1); i++) {
        if (tempBoard[kingX+i][kingY] === `r${opposingColor}` || tempBoard[kingX+i][kingY] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX+i][kingY]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 2); i++) {
        if (tempBoard[kingX][kingY-i] === `r${opposingColor}` || tempBoard[kingX][kingY-i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX][kingY-i]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 3); i++) {
        if (tempBoard[kingX-i][kingY] === `r${opposingColor}` || tempBoard[kingX-i][kingY] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX-i][kingY]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 4); i++) {
        if (tempBoard[kingX-i][kingY+i] === `b${opposingColor}` || tempBoard[kingX-i][kingY+i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX-i][kingY+i]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 5); i++) {
        if (tempBoard[kingX+i][kingY+i] === `b${opposingColor}` || tempBoard[kingX+i][kingY+i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX+i][kingY+i]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 6); i++) {
        if (tempBoard[kingX+i][kingY-i] === `b${opposingColor}` || tempBoard[kingX+i][kingY-i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX+i][kingY-i]) {
          break;
        }
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 7); i++) {
        if (tempBoard[kingX-i][kingY-i] === `b${opposingColor}` || tempBoard[kingX-i][kingY-i] === `q${opposingColor}`) {
          return false;
        }
        if (tempBoard[kingX-i][kingY-i]) {
          break;
        }
      }
      return true;
    }
    if (board[x][y] !== null && board[x][y][1] === color && !selected && !destinated) {
      setSelectedSquare([x, y]);
      let lst = [];
      switch (board[x][y]) {
        case 'pw':
          if (!board[x][y+1]) {
            lst.push([x, y+1]);
            if (y === 1 && !board[x][y+2]) {
              lst.push([x, y+2]);
            }
          }
          if (canMove(x-1, y+1) && board[x-1][y+1]) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x+1, y+1) && board[x+1][y+1]) {
            lst.push([x+1, y+1]);
          }
          setDestinationSquares(lst);
          break;
        case 'pb':
          if (!board[x][y-1]) {
            lst.push([x,y-1]);
            if (y === 6 && !board[x][y-2]) {
              lst.push([x, y-2]);
            }
          }
          if (canMove(x-1, y-1) && board[x-1][y-1]) {
            lst.push([x-1, y-1]);
          }
          if (canMove(x+1,y-1) && board[x+1][y-1]) {
            lst.push([x+1, y-1]);
          }
          setDestinationSquares(lst);
          break;
        case 'bw':
        case 'bb':
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i)) {
              lst.push([x-i, y+i]);
            }  
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'nw':
        case 'nb':
          if (canMove(x-1, y+2)) {
            lst.push([x-1, y+2]);
          }
          if (canMove(x+1, y+2)) {
            lst.push([x+1, y+2]);
          }
          if (canMove(x-2, y+1)) {
            lst.push([x-2, y+1]);
          }
          if (canMove(x+2, y+1)) {
            lst.push([x+2, y+1]);
          }
          if (canMove(x-2, y-1)) {
            lst.push([x-2, y-1]);
          }
          if (canMove(x+2, y-1)) {
            lst.push([x+2, y-1]);
          }
          if (canMove(x-1, y-2)) {
            lst.push([x-1, y-2]);
          }
          if (canMove(x+1,y-2)) {
            lst.push([x+1, y-2]);
          }
          setDestinationSquares(lst)
          break;
        case 'rw':
        case 'rb':
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'qw':
        case 'qb':
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i)) {
              lst.push([x-i,y+i]);
            }
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'kw':
        case 'kb':
          if (canMove(x, y+1)) {
            lst.push([x, y+1]);
          }
          if (canMove(x, y-1)) {
            lst.push([x, y-1]);
          }
          if (canMove(x-1, y)) {
            lst.push([x-1, y]);
          }
          if (canMove(x+1, y)) {
            lst.push([x+1, y]);
          }
          if (canMove(x-1, y+1)) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x+1, y+1)) {
            lst.push([x+1, y+1]);
          }
          if (canMove(x-1, y-1)) {
            lst.push([x-1, y-1]);
          }
          if (canMove(x+1, y-1)) {
            lst.push([x+1, y-1]);
          }
          if (turn) {
            if ((castleStateBlack === 0 || castleStateBlack === -1) && x === 4 && y === 7 && !board[3][7] && !board[2][7] && !board[1][7] && board[0][7] === 'rb') {
              lst.push([x-2,y]);
            }
            if ((castleStateBlack === 0 || castleStateBlack === 1) && x === 4 && y === 7 && !board[5][7] && !board[6][7] && board[7][7] === 'rb') {
              lst.push([x+2,y]);
            }
          } else {
            if ((castleStateWhite === 0 || castleStateWhite === -1) && x === 4 && y === 0 && !board[3][0] && !board[2][0] && !board[1][0] && board[0][0] === 'rw') {
              lst.push([x-2,y]);
            }
            if ((castleStateWhite === 0 || castleStateWhite === 1) && x === 4 && y === 0 && !board[5][0] && !board[6][0] && board[7][0] === 'rw') {
              lst.push([x+2,y]);
            }
          }
          setDestinationSquares(lst);
          break;
        default:
          throw new Error("Invalid piece!");
      }
    } else if (destinated) {
      if (color === 'w') { // ask if this is more efficient!
        if (castleStateWhite === 0) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 0) {
            setCastleStateWhite(1);
          } else if (selectedSquare[0] === 7 && selectedSquare[1] === 0) {
            setCastleStateWhite(-1);
          }
        } else if (castleStateWhite === -1) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 0) {
            setCastleStateWhite(2);
          }
        } else if (castleStateWhite === 1) {
          if (selectedSquare[0] === 7 && selectedSquare[1] === 0) {
            setCastleStateWhite(2);
          }
        }
        if (selectedSquare[0] === 4 && selectedSquare[1] === 0) {
          setCastleStateWhite(2);
        }
      } else if (color === 'b') {
        if (castleStateBlack === 0) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 7) {
            setCastleStateBlack(1);
          } else if (selectedSquare[0] === 7 && selectedSquare[1] === 7) {
            setCastleStateBlack(-1);
          }
        } else if (castleStateBlack === -1) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 7) {
            setCastleStateBlack(2);
          }
        } else if (castleStateBlack === 1) {
          if (selectedSquare[0] === 7 && selectedSquare[1] === 7) {
            setCastleStateBlack(2);
          }
        }
        if (selectedSquare[0] === 4 && selectedSquare[1] === 7) {
          setCastleStateBlack(2);
        }
      }
      const updatedBoard = [...board];
      if (board[selectedSquare[0]][selectedSquare[1]][0] === 'k' && x === selectedSquare[0] - 2) {
        updatedBoard[x+1][y] = updatedBoard[0][y];
        updatedBoard[0][y] = null;
        castleSoundEffect.play();
      } else if (board[selectedSquare[0]][selectedSquare[1]][0] === 'k' && x === selectedSquare[0] + 2) {
        updatedBoard[x-1][y] = updatedBoard[0][y];
        updatedBoard[7][y] = null;
        castleSoundEffect.play();
      } else { // ask if this is efficient too!
        if (board[x][y]) {
          captureSoundEffect.play();
        } else {
          moveSoundEffect.play();
        }
      }
      updatedBoard[x][y] = updatedBoard[selectedSquare[0]][selectedSquare[1]];
      updatedBoard[selectedSquare[0]][selectedSquare[1]] = null;
      setBoard(updatedBoard);
      setSelectedSquare(null);
      setDestinationSquares(null);
      if (turn === 0) {
        setTurn(1);
      } else {
        setTurn(0);
      }
    } else {
      setSelectedSquare(null);
      setDestinationSquares(null);
    }
  }
  let destinationColumns = [[],[],[],[],[],[],[],[]];
  for (let x = 0; x < 8; x++) {
    for (let coordinate in destinationSquares) {
      if (destinationSquares[coordinate][0] === x) {
        destinationColumns[x].push(destinationSquares[coordinate][1]);
      }
    }
  }
  return (
    <Stack direction="row" boxShadow={10}>
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} pieces={board[x]} selectedY={selectedSquare && x === selectedSquare[0] ? selectedSquare[1] : null} destinationY={destinationColumns[x]} clickSquare={clickSquare} />)}
    </Stack>
  )
}