import { Box, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import whitePawn from "./assets/images/chesspieces/pw.png";
import whiteKnight from "./assets/images/chesspieces/nw.png"
import whiteBishop from "./assets/images/chesspieces/bw.png";
import whiteRook from "./assets/images/chesspieces/rw.png";
import whiteQueen from "./assets/images/chesspieces/qw.png";
import whiteKing from "./assets/images/chesspieces/kw.png";
import blackPawn from "./assets/images/chesspieces/pb.png";
import blackKnight from "./assets/images/chesspieces/nb.png";
import blackBishop from "./assets/images/chesspieces/bb.png";
import blackRook from "./assets/images/chesspieces/rb.png";
import blackQueen from "./assets/images/chesspieces/qb.png";
import blackKing from "./assets/images/chesspieces/kb.png";
import moveAudio from "./assets/sounds/move.mp3";
import captureAudio from "./assets/sounds/capture.mp3";
import checkAudio from "./assets/sounds/capture.mp3";
import castleAudio from "./assets/sounds/capture.mp3";
import promoteAudio from "./assets/sounds/capture.mp3";
import illegalAudio from "./assets/sounds/capture.mp3";
import tenSecondsAudio from "./assets/sounds/capture.mp3";
import React from "react";

const moveSoundEffect = new Audio(moveAudio); // make sounds overlap...
const captureSoundEffect = new Audio(captureAudio);

function ChessSquare({ x, y, piece, selected, destinated, clickSquare }) {
  const shaded = (x + y) % 2 === 0;
  let src;
  let bgcolor;
  switch(piece) {
    case 'pw':
      src = whitePawn;
      break;
    case 'nw':
      src = whiteKnight;
      break;
    case 'bw':
      src = whiteBishop;
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
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const [destinationSquares, setDestinationSquares] = React.useState(null);
  const [castleStateWhite, setCastleStateWhite] = React.useState(0);
  const [castleStateBlack, setCastleStateBlack] = React.useState(0);
  function canMove(x, y, toX, toY) {
    if (toX < 0 || toX > 7 || toY < 0 || toY > 7) {
      return false;
    } else if (board[toX][toY] && board[toX][toY][1] === board[x][y][1]) {
      return false;
    } else {
      return true;
    }
  }
  function clickSquare(x, y, selected, destinated) {
    if (board[x][y] !== null && !selected && !destinated) {
      setSelectedSquare([x, y]);
      let lst = [];
      let spacesUp = 7 - y;
      let spacesDown = y;
      let spacesLeft = x;
      let spacesRight = 7 - x;
      let spacesUpLeft = Math.min(spacesUp, spacesLeft);
      let spacesUpRight = Math.min(spacesUp, spacesRight);
      let spacesDownLeft = Math.min(spacesDown, spacesLeft);
      let spacesDownRight = Math.min(spacesDown, spacesRight);
      switch(board[x][y]) {
        case 'pw':
          if (!board[x][y+1]) {
            lst.push([x, y+1]);
            if (y === 1 && !board[x][y+2]) {
              lst.push([x, y+2]);
            }
          }
          if (canMove(x, y, x-1, y+1) && board[x-1][y+1]) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x, y, x+1, y+1) && board[x+1][y+1]) {
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
          if (canMove(x, y, x-1, y-1) && board[x-1][y-1]) {
            lst.push([x-1, y-1]);
          }
          if (canMove(x, y, x+1,y-1) && board[x+1][y-1]) {
            lst.push([x+1, y-1]);
          }
          setDestinationSquares(lst);
          break;
        case 'nw':
        case 'nb':
          if (canMove(x, y, x-1, y+2)) {
            lst.push([x-1, y+2]);
          }
          if (canMove(x, y, x+1, y+2)) {
            lst.push([x+1, y+2]);
          }
          if (canMove(x, y, x-2, y+1)) {
            lst.push([x-2, y+1]);
          }
          if (canMove(x, y, x+2, y+1)) {
            lst.push([x+2, y+1]);
          }
          if (canMove(x, y, x-2, y-1)) {
            lst.push([x-2, y-1]);
          }
          if (canMove(x, y, x+2, y-1)) {
            lst.push([x+2, y-1]);
          }
          if (canMove(x, y, x-1, y-2)) {
            lst.push([x-1, y-2]);
          }
          if (canMove(x, y, x+1,y-2)) {
            lst.push([x+1, y-2]);
          }
          setDestinationSquares(lst)
          break;
        case 'bw':
        case 'bb':
          for (let i = 1; i <= spacesUpLeft; i++) {
            if (canMove(x, y, x-i, y+i)) {
              lst.push([x-i, y+i]);
            }  
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesUpRight; i++) {
            if (canMove(x, y, x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDownLeft; i++) {
            if (canMove(x, y, x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDownRight; i++) {
            if (canMove(x, y, x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'rw':
        case 'rb':
          for (let i = 1; i <= spacesUp; i++) {
            if (canMove(x, y, x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDown; i++) {
            if (canMove(x, y, x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLeft; i++) {
            if (canMove(x, y, x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesRight; i++) {
            if (canMove(x, y, x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'qw':
        case 'qb':
          for (let i = 1; i <= spacesUp; i++) {
            if (canMove(x, y, x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDown; i++) {
            if (canMove(x, y, x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLeft; i++) {
            if (canMove(x, y, x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesRight; i++) {
            if (canMove(x, y, x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesUpLeft; i++) {
            if (canMove(x, y, x-i, y+i)) {
              lst.push([x-i,y+i]);
            }
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesUpRight; i++) {
            if (canMove(x, y, x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDownLeft; i++) {
            if (canMove(x, y, x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesDownRight; i++) {
            if (canMove(x, y, x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case 'kw':
          if (canMove(x, y, x, y+1)) {
            lst.push([x, y+1]);
          }
          if (canMove(x, y, x, y-1)) {
            lst.push([x, y-1]);
          }
          if (canMove(x, y, x-1, y)) {
            lst.push([x-1, y]);
          }
          if (canMove(x, y, x+1, y)) {
            lst.push([x+1, y]);
          }
          if (canMove(x, y, x-1, y+1)) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x, y, x+1, y+1)) {
            lst.push([x+1, y+1]);
          }
          if (canMove(x, y, x-1, y-1)) {
            lst.push([x-1, y-1]);
          }
          if (canMove(x, y, x+1, y-1)) {
            lst.push([x+1, y-1]);
          }
          if ((castleStateWhite === 0 || castleStateWhite === -1) && x === 4 && y === 0 && !board[3][0] && !board[2][0] && !board[1][0] && board[0][0] === 'rw') {
            lst.push([x-2,y]);
          }
          if ((castleStateWhite === 0 || castleStateWhite === 1) && x === 4 && y === 0 && !board[5][0] && !board[6][0] && board[7][0] === 'rw') {
            lst.push([x+2,y]);
          }
          setDestinationSquares(lst);
          break;
        case 'kb':
          if (canMove(x, y, x, y+1)) {
            lst.push([x, y+1]);
          }
          if (canMove(x, y, x, y-1)) {
            lst.push([x, y-1]);
          }
          if (canMove(x, y, x-1, y)) {
            lst.push([x-1, y]);
          }
          if (canMove(x, y, x+1, y)) {
            lst.push([x+1, y]);
          }
          if (canMove(x, y, x-1, y+1)) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x, y, x+1, y+1)) {
            lst.push([x+1, y+1]);
          }
          if (canMove(x, y, x-1, y-1)) {
            lst.push([x-1, y-1]);
          }
          if (canMove(x, y, x+1, y-1)) {
            lst.push([x+1, y-1]);
          }
          if ((castleStateBlack === 0 || castleStateBlack === -1) && x === 4 && y === 7 && !board[3][7] && !board[2][7] && !board[1][7] && board[0][7] === 'rb') {
            lst.push([x-2, y]);
          }
          if ((castleStateBlack === 0 || castleStateBlack === 1) && x === 4 && y === 7 && !board[5][7] && !board[6][7] && board[7][7] === 'rb') {
            lst.push([x+2, y]);
          }
          setDestinationSquares(lst);
          break;
        default:
          throw new Error("Invalid piece!");
      }
    } else if (destinated) {
      if (board[x][y]) {
        captureSoundEffect.play();
      } else {
        moveSoundEffect.play();
      }
      if (board[selectedSquare[0]][selectedSquare[1]][1] === 'w') { // ask if this is more efficient!
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
      } else if (board[selectedSquare[0]][selectedSquare[1]][1] === 'b') {
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
      updatedBoard[x][y] = updatedBoard[selectedSquare[0]][selectedSquare[1]];
      updatedBoard[selectedSquare[0]][selectedSquare[1]] = null;
      setBoard(updatedBoard);
      setSelectedSquare(null);
      setDestinationSquares(null);
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