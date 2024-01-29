import { Stack, Typography } from "@mui/material"

function ChessSquare({ x, y }) {
  const shaded = (x + y) % 2 === 0
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

function ChessColumn({ xAxis }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} />)}
    </Stack>
  )
}

export default function ChessBoard() {
  return (
    <Stack direction="row" boxShadow={10}>
      {Array.from(Array(8).keys()).map(x => <ChessColumn xAxis={x} />)}
    </Stack>
  )
}