import { Stack } from "@mui/material";

function MoveColumn({ team }) {
  return (
    <Stack bgcolor="black">

    </Stack>
  )
}
export default function MoveList() {
  let moves = []; // Even = white, odd = black

  return (
    <Stack>
      {Array.from(Array(moves).keys()).map(move => <MoveBox />)}
    </Stack>
  )
}