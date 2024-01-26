import { Box, Stack, Typography } from "@mui/material"

function ChessSquare({ isBlack, xCoordinates, yCoordinates }) {
  return (
    <Stack
      bgcolor={isBlack ? "darkgoldenrod" : "burlywood"}
      justifyContent="space-between"
      width={80}
      height={80}
    >
      <Typography fontWeight="bold">{yCoordinates}</Typography>
      <Typography fontWeight="bold" alignSelf="end">{xCoordinates}</Typography>
    </Stack>
  )
}

function ChessColumn({ alternate, hasYCoordinates, xAxis }) {
  if (alternate) {
    return (
      <Box>
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 8 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 7 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 6 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 5 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 4 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 3 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 2 : null} />
        <ChessSquare xCoordinates={xAxis} yCoordinates={hasYCoordinates ? 1 : null} />
      </Box>
    )
  } else {
    return (
      <Box>
        <ChessSquare yCoordinates={hasYCoordinates ? 8 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 7 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 6 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 5 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 4 : null} />
        <ChessSquare isBlack yCoordinates={hasYCoordinates ? 3 : null} />
        <ChessSquare yCoordinates={hasYCoordinates ? 2 : null} />
        <ChessSquare isBlack xCoordinates={xAxis} yCoordinates={hasYCoordinates ? 1 : null} />
      </Box>
    )
  }
}

export default function ChessBoard() {
  return (
    <Stack direction="row">
      <ChessColumn hasYCoordinates xAxis="a" />
      <ChessColumn alternate xAxis="b" />
      <ChessColumn xAxis="c" />
      <ChessColumn alternate xAxis="d" />
      <ChessColumn xAxis="e" />
      <ChessColumn alternate xAxis="f" />
      <ChessColumn xAxis="g" />
      <ChessColumn alternate xAxis="h" />
    </Stack>
  )
}