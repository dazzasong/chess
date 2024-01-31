import { Stack } from "@mui/material";

export default function MoveList() {
  let moves = [];

  return (
    <Stack direction="row" bgcolor="black">
      {Array.from(moves.keys()).map(moves => )}
    </Stack>
  )
}