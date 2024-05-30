import React from "react";
import { Button, Stack, darken } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FlagIcon from '@mui/icons-material/Flag';
import RefreshIcon from '@mui/icons-material/Refresh';
import gameStartAudio from "./assets/sounds/game-start.mp3";
import gameEndAudio from "./assets/sounds/game-end.mp3";
import ChessBoard from "./ChessBoard";

const gameStartSoundEffect = new Audio(gameStartAudio);
const gameEndSoundEffect = new Audio(gameEndAudio);

export default function MainContent() {
  const [mode, setMode] = React.useState(0); // 0 = Initial, 1 = InGame, 2 = EndGame
  let buttonText;
  let buttonColor;
  let startButtonIcon;
  let endButtonIcon;
  if (mode === 0) {
    buttonText = 'Start new game';
    buttonColor = green[600];
    startButtonIcon = <LocalFireDepartmentIcon />;
  } else if (mode === 1) {
    buttonText = 'Forfeit';
    buttonColor = red[600];
    endButtonIcon = <FlagIcon />;
    gameStartSoundEffect.play();
  } else {
    buttonText = 'Rematch';
    buttonColor = orange[600];
    endButtonIcon = <RefreshIcon />;
    gameEndSoundEffect.play();
  }
  function clickGameButton() {
    if (mode === 0) setMode(1);
    else if (mode === 1) setMode(2);
    else setMode(1);
  }

  return (
    <Stack
      alignItems='center'
      bgcolor='bisque'
      width='100vw'
      height='100vh'
      position='fixed'
    >
      <Button disableRipple disableElevation
        onClick={clickGameButton}
        variant='contained'
        startIcon={startButtonIcon}
        endIcon={endButtonIcon}
        sx={{
          minWidth: 220,
          height: 100,
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