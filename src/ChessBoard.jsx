import { Box, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
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
import moveSound from "./assets/sounds/move.mp3";
import captureSound from "./assets/sounds/capture.mp3";
import checkSound from "./assets/sounds/capture.mp3";
import castleSound from "./assets/sounds/capture.mp3";
import promoteSound from "./assets/sounds/capture.mp3";
import illegalSound from "./assets/sounds/capture.mp3";
import tenSecondsSound from "./assets/sounds/capture.mp3";
import knightShout from "./assets/sounds/shouts/knight.mp3";
import bishopShout from "./assets/sounds/shouts/bishop.mp3";
import rookShout from "./assets/sounds/shouts/rook.mp3";
import queenShout from "./assets/sounds/shouts/queen.mp3";
import React from "react";

function ChessSquare({ x, y, piece, selected, destinated, clickSquare }) {
  const shaded = (x + y) % 2 === 0;
  let src;
  let bgcolor;
  switch(piece) {
    case "pw":
      src = whitePawn;
      break;
    case "nw":
      src = whiteKnight;
      break;
    case "bw":
      src = whiteBishop;
      break;
    case "rw":
      src = whiteRook;
      break;
    case "qw":
      src = whiteQueen;
      break;
    case "kw":
      src = whiteKing;
      break;
    case "pb":
      src = blackPawn;
      break;
    case "nb":
      src = blackKnight;
      break;
    case "bb":
      src = blackBishop;
      break;
    case "rb":
      src = blackRook;
      break;
    case "qb":
      src = blackQueen;
      break;
    case "kb":
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
        {destinated ? <CircleIcon sx={{opacity: 0.2, alignSelf: "center"}} /> : null}
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
  function clickSquare(x, y, selected, destinated) {
    if (board[x][y] != null && !selected && !destinated) {
      setSelectedSquare([x,y]);
      let spacesUp = 7 - y;
      let spacesDown = y;
      let spacesLeft = x;
      let spacesRight = 7 - x;
      let spacesUpLeft = Math.min(spacesUp, spacesLeft);
      let spacesUpRight = Math.min(spacesUp, spacesRight);
      let spacesDownLeft = Math.min(spacesDown, spacesLeft);
      let spacesDownRight = Math.min(spacesDown, spacesRight);
      switch(board[x][y]) {
        case 'pw': // Enpassant and promotion to be added!
          if (y === 1) {
            setDestinationSquares([[x,y+1],[x,y+2]]);
          } else {
            setDestinationSquares([[x,y+1]]);
          }
          break;
        case 'pb':
          if (y === 6) {
            setDestinationSquares([[x,y-1],[x,y-2]]);
          } else {
            setDestinationSquares([[x,y-1]]);
          }
          break;
        case 'nw':
        case 'nb':
          setDestinationSquares([[x-1,y+2],[x+1,y+2],[x-2,y+1],[x+2,y+1],[x-2,y-1],[x+2,y-1],[x-1,y-2],[x+1,y-2]]);
          break;
        case 'bw':
        case 'bb':
          setDestinationSquares([[x-1,y+1],[x-2,y+2],[x-3,y+3],[x-4,y+4],[x-5,y+5],[x-6,y+6],[x-7,y+7],[x+1,y+1],[x+2,y+2],[x+3,y+3],[x+4,y+4],[x+5,y+5],[x+6,y+6],[x+7,y+7],[x-1,y-1],[x-2,y-2],[x-3,y-3],[x-4,y-4],[x-5,y-5],[x-6,y-6],[x-7,y-7],[x+1,y-1],[x+2,y-2],[x+3,y-3],[x+4,y-4],[x+5,y-5],[x+6,y-6],[x+7,y-7]]);
          break;
        case 'rw':
        case 'rb':
          setDestinationSquares([[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5],[x,y+6],[x,y+7],[x,y-1],[x,y-2],[x,y-3],[x,y-4],[x,y-5],[x,y-6],[x,y-7],[x-1,y],[x-2,y],[x-3,y],[x-4,y],[x-5,y],[x-6,y],[x-7,y],[x+1,y],[x+2,y],[x+3,y],[x+4,y],[x+5,y],[x+6,y],[x+7,y]]);
          break;
        case 'qw':
        case 'qb':
          setDestinationSquares([[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5],[x,y+6],[x,y+7],[x,y-1],[x,y-2],[x,y-3],[x,y-4],[x,y-5],[x,y-6],[x,y-7],[x-1,y],[x-2,y],[x-3,y],[x-4,y],[x-5,y],[x-6,y],[x-7,y],[x+1,y],[x+2,y],[x+3,y],[x+4,y],[x+5,y],[x+6,y],[x+7,y],[x-1,y+1],[x-2,y+2],[x-3,y+3],[x-4,y+4],[x-5,y+5],[x-6,y+6],[x-7,y+7],[x+1,y+1],[x+2,y+2],[x+3,y+3],[x+4,y+4],[x+5,y+5],[x+6,y+6],[x+7,y+7],[x-1,y-1],[x-2,y-2],[x-3,y-3],[x-4,y-4],[x-5,y-5],[x-6,y-6],[x-7,y-7],[x+1,y-1],[x+2,y-2],[x+3,y-3],[x+4,y-4],[x+5,y-5],[x+6,y-6],[x+7,y-7]]);
          break;
        case 'kw':
        case 'kb':
          setDestinationSquares([[x,y+1],[x,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x+1,y+1],[x-1,y-1],[x+1,y-1]]);
          break;
        default:
          setDestinationSquares(null);
      }
    } else if (destinated) {
      const updatedBoard = [...board];
      updatedBoard[x][y] = board[selectedSquare[0]][selectedSquare[1]];
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
        destinationColumns[x].push(destinationSquares[coordinate][1])
      }
    }
  }

  return (
    <Stack direction="row" boxShadow={10}>
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} pieces={board[x]} selectedY={selectedSquare && x === selectedSquare[0] ? selectedSquare[1] : null} destinationY={destinationColumns[x]} clickSquare={clickSquare} />)}
    </Stack>
  )
}