import { Link, Stack, Typography } from "@mui/material";
import React from 'react';

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
      <Typography fontSize={40} margin="0 10px" component="h1"
        sx={{
          userSelect: "none"
        }}
      >
        Chess
      </Typography>
      <Link href="#" underline="none" color="inherit">
        How to play
      </Link>
    </Stack>
  )
}