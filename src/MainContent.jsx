import React from "react";
import { Button, Stack, darken } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import { Flag, LocalFireDepartment, Refresh } from "@mui/icons-material";
import ChessBoard from "./ChessBoard";

const gameStartSoundEffect = new Audio("sounds/game-start.mp3");
const gameEndSoundEffect = new Audio("sounds/game-end.mp3");

export default function MainContent() {
  const [mode, setMode] = React.useState(0); // 0 = Initial, 1 = InGame, 2 = EndGame
  let buttonText;
  let buttonColor;
  let startButtonIcon;
  let endButtonIcon;
  if (mode === 0) {
    buttonText = 'Start new game';
    buttonColor = green[600];
    startButtonIcon = <LocalFireDepartment />;
  } else if (mode === 1) {
    buttonText = 'Forfeit';
    buttonColor = red[600];
    endButtonIcon = <Flag />;
    gameStartSoundEffect.play();
  } else {
    buttonText = 'Rematch';
    buttonColor = orange[600];
    endButtonIcon = <Refresh />;
    gameEndSoundEffect.play();
  }
  function clickGameButton() {
    if (mode === 0) setMode(1);
    else if (mode === 1) setMode(2);
    else setMode(1);
  }
  return (
    <Stack bgcolor='bisque' alignItems='center'>
      <Button disableRipple disableElevation
        onClick={clickGameButton}
        variant='contained'
        startIcon={startButtonIcon}
        endIcon={endButtonIcon}
        sx={{
          minWidth: 220,
          height: 75,
          m: 4,
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Tilt Neon',
          backgroundColor: buttonColor,
          textTransform: 'none',
          ':hover': {
            backgroundColor: darken(buttonColor, 0.1)
          }
        }}
      >
        {buttonText}
      </Button>
      <ChessBoard mode={mode} setMode={setMode} />
    </Stack>
  );
}