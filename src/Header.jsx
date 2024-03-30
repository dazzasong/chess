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
      <Typography fontSize={40} ml={2}
        sx={{
          userSelect: "none"
        }}
      >
        Chess
      </Typography>
    </Stack>
  )
}