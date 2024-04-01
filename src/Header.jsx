import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" bgcolor="black"
      sx={{
        height: 70,
        marginBottom: 2
      }}
    >
      <Typography color="white" fontSize={40} ml={2}
        sx={{
          userSelect: "none"
        }}
      >
        Chess
      </Typography>
    </Stack>
  )
}