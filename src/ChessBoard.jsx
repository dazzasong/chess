import { Box, Stack, Typography } from "@mui/material";
import whitePawn from "./images/chesspieces/pl.png";
import blackPawn from "./images/chesspieces/pd.png";
import whiteKnight from "./images/chesspieces/nl.png";
import blackKnight from "./images/chesspieces/nd.png";
import whiteBishop from "./images/chesspieces/bl.png";
import blackBishop from "./images/chesspieces/bd.png";
import whiteRook from "./images/chesspieces/rl.png";
import blackRook from "./images/chesspieces/rd.png";
import whiteQueen from "./images/chesspieces/ql.png";
import blackQueen from "./images/chesspieces/qd.png";
import whiteKing from "./images/chesspieces/kl.png";
import blackKing from "./images/chesspieces/kd.png";
import React from "react";

function ChessSquare({ x, y, piece }) {
  const shaded = (x + y) % 2 === 0
  let src
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

  return (
    <Stack
      width={64}
      height={64}
      bgcolor={shaded ? "darkgoldenrod" : "burlywood"}
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
        <img src={src} alt="Chess piece" />
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

function ChessColumn({ xAxis, pieces }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} piece={pieces[y]} />)}
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

  return (
    <Stack direction="row" boxShadow={10}>
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} pieces={board[x]} />)}
    </Stack>
  )
}