import { Box, Stack, Typography } from "@mui/material"

function ChessSquare({ x, y }) {
  const shaded = (x + y) % 2 === 0
  return (
    <Stack
      bgcolor={shaded ? "darkgoldenrod" : "burlywood"}
      justifyContent="space-between"
      width={80}
      height={80}
    >
      <Typography fontWeight="bold">{x === 0 ? y + 1 : null}</Typography>
      <Typography fontWeight="bold" alignSelf="end">{y === 0 ? String.fromCharCode(x + 97) : null}</Typography>
    </Stack>
  )
}

function ChessColumn({ xAxis }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} />)}
    </Stack>
  )
}

export default function ChessBoard() {
  return (
    <Stack direction="row">
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} />)}
    </Stack>
  )
}