import { Box, Button, Stack } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React from 'react';

export default function MainContent() {
  const [mode, setMode] = React.useState(0); // 0 = Initial, 1 = InGame, 2 = EndGame
  let buttonText
  let buttonColor
  if (mode === 0) {
    buttonText = "Start new game"
    buttonColor = "green"
  } else if (mode === 1) {
    buttonText = "End game"
    buttonColor = "red"
  } else {
    buttonText = "Rematch"
    buttonColor = "orange"
  }
  function clickGameButton() {
    if (mode === 0) setMode(1)
    else if (mode === 1) setMode(2)
    else setMode(1)
  }
  return (
    <Box>
      <Stack spacing={2} sx={{margin: "0 10px"}}>
        <Button disableRipple disableElevation
          onClick={clickGameButton}
          variant="contained"
          startIcon={<LocalFireDepartmentIcon />}
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            width: 220,
            height: 75,
            backgroundColor: buttonColor,
            textTransform: "none",
            ":hover": {
              backgroundColor: buttonColor
            }
          }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Box>
  )
}