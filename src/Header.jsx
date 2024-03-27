import { Link, Stack, Typography } from "@mui/material";
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
      <Typography fontSize={40} component="h1" ml={2}
        sx={{
          userSelect: "none"
        }}
      >
        Chess
      </Typography>
      <Link href="#" underline="none" color="inherit" mr={2}
        sx={{
          userSelect: "none"
        }}
      >
        How to play
      </Link>
    </Stack>
  )
}