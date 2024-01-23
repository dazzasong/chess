import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center"
      sx={{
        color: "white",
        backgroundColor: "black",
        height: 70,
        marginBottom: 2
      }}
    >
      <Typography fontSize={40} margin="0 10px">
        Ultimate Chess RPG
      </Typography>
      <Stack direction="row" spacing={4}
        sx={{
          margin: "0 20px"
        }}
      >
      </Stack>
    </Stack>
  )
}