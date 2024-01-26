import { Button, Stack, darken } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';
import { green, orange, red } from "@mui/material/colors";
import ChessBoard from "./ChessBoard";

export default function MainContent() {
  const [mode, setMode] = React.useState(0); // 0 = Initial, 1 = InGame, 2 = EndGame
  let buttonText
  let buttonColor
  let startButtonIcon
  let endButtonIcon
  if (mode === 0) {
    buttonText = "Start new game"
    buttonColor = green[600]
    startButtonIcon = <LocalFireDepartmentIcon />
  } else if (mode === 1) {
    buttonText = "End game"
    buttonColor = red[600]
    endButtonIcon = <CancelIcon />
  } else {
    buttonText = "Rematch"
    buttonColor = orange[600]
    endButtonIcon = <RefreshIcon />
  }
  function clickGameButton() {
    if (mode === 0) setMode(1)
    else if (mode === 1) setMode(2)
    else setMode(1)
  }
  return (
    <div>
      <Stack spacing={10} direction="row" sx={{margin: "0 10px"}}>
        <Button disableRipple disableElevation
          onClick={clickGameButton}
          variant="contained"
          startIcon={startButtonIcon}
          endIcon={endButtonIcon}
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            width: 220,
            height: 75,
            backgroundColor: buttonColor,
            textTransform: "none",
            ":hover": {
              backgroundColor: darken(buttonColor, 0.1)
            }
          }}
        >
          {buttonText}
        </Button>
        <ChessBoard />
      </Stack>
    </div>
  )
}