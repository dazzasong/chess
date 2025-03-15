import React from "react";
import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      bgcolor='black'
      width='100vw'
      height={70}
    >
      <Typography color='white' fontSize={40} fontFamily='Tilt Neon' ml={2}
        sx={{
          userSelect: 'none'
        }}
      >
        Dazza's Chess♙
      </Typography>
    </Stack>
  );
}