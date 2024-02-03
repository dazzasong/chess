import { Box, Stack, Typography } from "@mui/material";
import whitePawn from "./assets/images/chesspieces/pl.png";
import blackPawn from "./assets/images/chesspieces/pd.png";
import whiteKnight from "./assets/images/chesspieces/nl.png";
import blackKnight from "./assets/images/chesspieces/nd.png";
import whiteBishop from "./assets/images/chesspieces/bl.png";
import blackBishop from "./assets/images/chesspieces/bd.png";
import whiteRook from "./assets/images/chesspieces/rl.png";
import blackRook from "./assets/images/chesspieces/rd.png";
import whiteQueen from "./assets/images/chesspieces/ql.png";
import blackQueen from "./assets/images/chesspieces/qd.png";
import whiteKing from "./assets/images/chesspieces/kl.png";
import blackKing from "./assets/images/chesspieces/kd.png";
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

function ChessSquare({ x, y, piece, selected, setSelectedSquare }) {
  const shaded = (x + y) % 2 === 0
  let src
  let bgcolor
  switch(piece) {
    case "pl":
      src = whitePawn;
      break;
    case "pd":
      src = blackPawn;
      break;
    case "nl":
      src = whiteKnight;
      break;
    case "nd":
      src = blackKnight;
      break;
    case "bl":
      src = whiteBishop;
      break;
    case "bd":
      src = blackBishop;
      break;
    case "rl":
      src = whiteRook;
      break;
    case "rd":
      src = blackRook;
      break;
    case "ql":
      src = whiteQueen;
      break;
    case "qd":
      src = blackQueen;
      break;
    case "kl":
      src = whiteKing;
      break;
    case "kd":
      src = blackKing;
      break;
    default:
      src = null;
  }
  if (shaded) {
    bgcolor = "darkgoldenrod"
  } else {
    bgcolor = "burlywood"
  }
  if (selected) {
    bgcolor = "#ffff66"
  }

  return (
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
        <Box sx={{position: "absolute"}}>
          <img src={src} alt="Chess piece" onClick={() => {
            if (selected) {
              setSelectedSquare(null)
            } else {
              setSelectedSquare([x,y])
              console.log(`Selected square coordinates: ${x} ${y}`)
            }
          }} />
        </Box>
      }
      <Typography fontWeight="bold" alignSelf="end"
        sx={{
          userSelect: "none"
        }}
      >
        {y === 0 ? String.fromCharCode(x + 97) : null}
      </Typography>
    </Stack>
  )
}

function ChessColumn({ xAxis, pieces, selectedY, setSelectedSquare }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} piece={pieces[y]} selected={selectedY === y} setSelectedSquare={setSelectedSquare} />)}
    </Stack>
  )
}

export default function ChessBoard() {
  const initialBoard = [
    ['rl', 'pl', null, null, null, null, 'pd', 'rd'],
    ['nl', 'pl', null, null, null, null, 'pd', 'nd'],
    ['bl', 'pl', null, null, null, null, 'pd', 'bd'],
    ['ql', 'pl', null, null, null, null, 'pd', 'qd'],
    ['kl', 'pl', null, null, null, null, 'pd', 'kd'],
    ['bl', 'pl', null, null, null, null, 'pd', 'bd'],
    ['nl', 'pl', null, null, null, null, 'pd', 'nd'],
    ['rl', 'pl', null, null, null, null, 'pd', 'rd']
  ]
  const [board, setBoard] = React.useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = React.useState(null)
  
  return (
    <Stack direction="row" boxShadow={10}>
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} pieces={board[x]} selectedY={selectedSquare && x === selectedSquare[0] ? selectedSquare[1] : null} setSelectedSquare={setSelectedSquare} />)}
    </Stack>
  )
}