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

const moveSoundEffect = new Audio(moveAudio);
const captureSoundEffect = new Audio(captureAudio);
const castleSoundEffect = new Audio(castleAudio);
const checkSoundEffect = new Audio(checkAudio);

function PromotionCard({ color }) { // promotion sends piece, board sends coords
  return (
    <Stack
      bgcolor={"gray"}
      border={"solid"}
    >
      <IconButton onClick={() => 'q'}>
        <img src={color ? blackQueen : whiteQueen} alt={color ? "Black Queen" : "White Queen"} />
      </IconButton>
      <IconButton onClick={() => 'r'}>
        <img src={color ? blackRook : whiteRook} alt={color ? "Black Rook" : "White Rook"} />
      </IconButton>
      <IconButton onClick={() => 'n'}>
        <img src={color ? blackKnight : whiteKnight} alt={color ? "Black Knight" : "White Knight"} />
      </IconButton>
      <IconButton onClick={() => 'b'}>
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
        {destinated && !piece && <CircleIcon sx={{opacity: 0.2, alignSelf: "center"}} />}
        {destinated && piece && <CircleOutlinedIcon sx={{fontSize: 72, opacity: 0.2, alignSelf: "center"}} />}
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
  const [pointsWhite, setPointsWhite] = React.useState(0);
  const [pointsBlack, setPointsBlack] = React.useState(0);
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const [destinationSquares, setDestinationSquares] = React.useState(null);
  const [castleStateWhite, setCastleStateWhite] = React.useState(0);
  const [castleStateBlack, setCastleStateBlack] = React.useState(0);
  const [promotion, setPromotion] = React.useState(false);
  const color = turn ? 'b' : 'w';
  const opposingColor = !turn ? 'b' : 'w';
  function addPoint(pieceTaken) {
    switch (pieceTaken[0]) {
      case 'p':
        if (turn) {
          setPointsBlack(pointsBlack + 1);
        } else {
          setPointsWhite(pointsWhite + 1);
        }
        break;
      case 'b':
      case 'n':
        if (turn) {
          setPointsBlack(pointsBlack + 3);
        } else {
          setPointsWhite(pointsWhite + 3);
        }
        break;
      case 'r':
        if (turn) {
          setPointsBlack(pointsBlack + 5);
        } else {
          setPointsWhite(pointsWhite + 5);
        }
        break;
      case 'q':
        if (turn) {
          setPointsBlack(pointsBlack + 9);
        } else {
          setPointsWhite(pointsWhite + 9);
        }
        break;
      default:
        throw new Error("Invalid pieceTaken!");
    }
  }
  function spacesLen(x, y, direction) {
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
  function canMove(x, y, toX, toY, preventLoop = false) {
    if (toX < 0 || toX > 7 || toY < 0 || toY > 7) {
      return false;
    } else if (board[toX][toY] && board[toX][toY][1] === color) {
      return false;
    }
    if (preventLoop) {
      return true;
    }
    let tempBoard = board.map(row => [...row]);
    tempBoard[toX][toY] = tempBoard[x][y];
    tempBoard[x][y] = null;
    if (kingInCheck(tempBoard)) {
      return false;
    } else {
      return true;
    }
  }
  function kingInCheck(board, opposing = false) {
    let kingX, kingY;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === `k${opposing ? opposingColor : color}`) {
          kingX = i;
          kingY = j;
        }
      }
    }
    if (turn) {
      if (canMove(kingX, kingY, kingX-1, kingY-1, true) && board[kingX-1][kingY-1] === `p${opposing ? color : opposingColor}`) {
        return true;
      }
      if (canMove(kingX, kingY, kingX+1, kingY-1, true) && board[kingX+1][kingY-1] === `p${opposing ? color : opposingColor}`) {
        return true;
      }
    } else {
      if (canMove(kingX, kingY, kingX-1, kingY+1, true) && board[kingX-1][kingY+1] === `p${opposing ? color : opposingColor}`) {
        return true;
      }
      if (canMove(kingX, kingY, kingX+1, kingY+1, true) && board[kingX+1][kingY+1] === `p${opposing ? color : opposingColor}`) {
        return true;
      }
    }
    if (canMove(kingX, kingY, kingX-1, kingY+2, true) && board[kingX-1][kingY+2] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+1, kingY+2, true) && board[kingX+1][kingY+2] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+2, kingY+1, true) && board[kingX+2][kingY+1] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+2, kingY-1, true) && board[kingX+2][kingY-1] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+1, kingY-2, true) && board[kingX+1][kingY-2] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-1, kingY-2, true) && board[kingX-1][kingY-2] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-2, kingY-1, true) && board[kingX-2][kingY-1] === `n${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-2, kingY+1, true) && board[kingX-2][kingY+1] === `n${opposing ? color : opposingColor}`) {
      return true;
    } // below
    if (canMove(kingX, kingY, kingX, kingY+1, true) && board[kingX][kingY+1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+1, kingY, true) && board[kingX+1][kingY] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX, kingY-1, true) && board[kingX][kingY-1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-1, kingY, true) && board[kingX-1][kingY] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-1, kingY+1, true) && board[kingX-1][kingY+1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+1, kingY+1, true) && board[kingX+1][kingY+1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX+1, kingY-1, true) && board[kingX+1][kingY-1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    if (canMove(kingX, kingY, kingX-1, kingY-1, true) && board[kingX-1][kingY-1] === `k${opposing ? color : opposingColor}`) {
      return true;
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 0); i++) {
      if (board[kingX][kingY+i] === `r${opposing ? color : opposingColor}` || board[kingX][kingY+i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX][kingY+i]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 1); i++) {
      if (board[kingX+i][kingY] === `r${opposing ? color : opposingColor}` || board[kingX+i][kingY] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX+i][kingY]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 2); i++) {
      if (board[kingX][kingY-i] === `r${opposing ? color : opposingColor}` || board[kingX][kingY-i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX][kingY-i]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 3); i++) {
      if (board[kingX-i][kingY] === `r${opposing ? color : opposingColor}` || board[kingX-i][kingY] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX-i][kingY]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 4); i++) {
      if (board[kingX-i][kingY+i] === `b${opposing ? color : opposingColor}` || board[kingX-i][kingY+i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX-i][kingY+i]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 5); i++) {
      if (board[kingX+i][kingY+i] === `b${opposing ? color : opposingColor}` || board[kingX+i][kingY+i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX+i][kingY+i]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 6); i++) {
      if (board[kingX+i][kingY-i] === `b${opposing ? color : opposingColor}` || board[kingX+i][kingY-i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX+i][kingY-i]) {
        break;
      }
    }
    for (let i = 1; i <= spacesLen(kingX, kingY, 7); i++) {
      if (board[kingX-i][kingY-i] === `b${opposing ? color : opposingColor}` || board[kingX-i][kingY-i] === `q${opposing ? color : opposingColor}`) {
        return true;
      }
      if (board[kingX-i][kingY-i]) {
        break;
      }
    }
    return false;
  }
  function clickSquare(x, y, selected, destinated) {
    if (board[x][y] !== null && board[x][y][1] === color && !selected && !destinated) {
      setSelectedSquare([x, y]);
      let lst = [];
      switch (board[x][y]) {
        case `p${color}`:
          let mod = turn ? -1 : 1;
          let startPoint = turn ? 6 : 1;
          if (!board[x][y+1*mod] && canMove(x, y, x, y+1*mod)) {
            lst.push([x, y+1*mod]);
            if (y === startPoint && !board[x][y+2*mod] && canMove(x, y, x, y+2*mod)) {
              lst.push([x, y+2*mod]);
            }
          }
          if (canMove(x, y, x-1, y+1*mod) && board[x-1][y+1*mod]) {
            lst.push([x-1, y+1*mod]);
          }
          if (canMove(x, y, x+1, y+1*mod) && board[x+1][y+1*mod]) {
            lst.push([x+1, y+1*mod]);
          }
          setDestinationSquares(lst);
          break;
        case `b${color}`:
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x, y, x-i, y+i)) {
              lst.push([x-i, y+i]);
            }  
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x, y, x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x, y, x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x, y, x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case `n${color}`:
          if (canMove(x, y, x-1, y+2)) {
            lst.push([x-1, y+2]);
          }
          if (canMove(x, y, x+1, y+2)) {
            lst.push([x+1, y+2]);
          }
          if (canMove(x, y, x+2, y+1)) {
            lst.push([x-2, y+1]);
          }
          if (canMove(x, y, x+2, y-1)) {
            lst.push([x+2, y+1]);
          }
          if (canMove(x, y, x+1, y-2)) {
            lst.push([x-2, y-1]);
          }
          if (canMove(x, y, x-1, y-2)) {
            lst.push([x+2, y-1]);
          }
          if (canMove(x, y, x-2, y-1)) {
            lst.push([x-1, y-2]);
          }
          if (canMove(x, y, x-2,y+1)) {
            lst.push([x+1, y-2]);
          }
          setDestinationSquares(lst)
          break;
        case `r${color}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y, x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x, y, x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y, x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x, y, x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case `q${color}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y, x, y+i)) {
              lst.push([x, y+i]);
            }
            if (board[x][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x, y, x+i, y)) {
              lst.push([x+i, y]);
            }
            if (board[x+i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y, x, y-i)) {
              lst.push([x, y-i]);
            }
            if (board[x][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x, y, x-i, y)) {
              lst.push([x-i, y]);
            }
            if (board[x-i][y]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x, y, x-i, y+i)) {
              lst.push([x-i,y+i]);
            }
            if (board[x-i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x, y, x+i, y+i)) {
              lst.push([x+i, y+i]);
            }
            if (board[x+i][y+i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x, y, x+i, y-i)) {
              lst.push([x+i, y-i]);
            }
            if (board[x+i][y-i]) {
              break;
            }
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x, y, x-i, y-i)) {
              lst.push([x-i, y-i]);
            }
            if (board[x-i][y-i]) {
              break;
            }
          }
          setDestinationSquares(lst);
          break;
        case `k${color}`:
          if (canMove(x, y, x, y+1)) {
            lst.push([x, y+1]);
          }
          if (canMove(x, y, x+1, y)) {
            lst.push([x+1, y]);
          }
          if (canMove(x, y, x, y-1)) {
            lst.push([x, y-1]);
          }
          if (canMove(x, y, x-1, y)) {
            lst.push([x-1, y]);
          }
          if (canMove(x, y, x-1, y+1)) {
            lst.push([x-1, y+1]);
          }
          if (canMove(x, y, x+1, y+1)) {
            lst.push([x+1, y+1]);
          }
          if (canMove(x, y, x+1, y-1)) {
            lst.push([x+1, y-1]);
          }
          if (canMove(x, y, x-1, y-1)) {
            lst.push([x-1, y-1]);
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
      let castle = false;
      if (color === 'w') {
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
      const updatedBoard = board.map(row => [...row]);
      updatedBoard[x][y] = updatedBoard[selectedSquare[0]][selectedSquare[1]];
      updatedBoard[selectedSquare[0]][selectedSquare[1]] = null;
      if (board[selectedSquare[0]][selectedSquare[1]] === `k${color}`) {
        if (x === selectedSquare[0] - 2) {
          updatedBoard[x+1][y] = updatedBoard[0][y];
          updatedBoard[0][y] = null;
          castle = true;
        } else if (x === selectedSquare[0] + 2) {
          updatedBoard[x-1][y] = updatedBoard[0][y];
          updatedBoard[7][y] = null;
          castle = true;
        }
      } else if (board[selectedSquare[0]][selectedSquare[1]] === `p${color}`) {
        let promotionPoint = turn ? 0 : 7;
        if (y === promotionPoint) {
          setPromotion(true);
        }
      }
      if (kingInCheck(updatedBoard, true)) {
        checkSoundEffect.play(); // why does pawn not play check sound?
      } else if (castle) {
        castleSoundEffect.play();
      } else if (!board[x][y]) {
        moveSoundEffect.play();
      }
      if (board[x][y]) {
        addPoint(board[x][y]);
        captureSoundEffect.play();
      }
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
    <Stack direction="row">
      {promotion && <PromotionCard color={!turn} />}
      <Stack direction="row" boxShadow={10}>
        {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} pieces={board[x]} selectedY={selectedSquare && x === selectedSquare[0] ? selectedSquare[1] : null} destinationY={destinationColumns[x]} clickSquare={clickSquare} />)}
      </Stack>
      <Stack spacing={59}>
        <Typography fontSize={20} fontWeight="bold">
          {pointsBlack}
        </Typography>
        <Typography fontSize={20} fontWeight="bold">
          {pointsWhite}
        </Typography>
      </Stack>
    </Stack>
  )
}