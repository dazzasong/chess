import { Box, Button, IconButton, Stack, darken } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import SettingsIcon from '@mui/icons-material/Settings';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';
import background from "./assets/images/backgrounds/background.jpg";
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
    buttonText = "Start new game";
    buttonColor = green[600];
    startButtonIcon = <LocalFireDepartmentIcon />;
  } else if (mode === 1) {
    buttonText = "End game";
    buttonColor = red[600];
    endButtonIcon = <CancelIcon />;
  } else {
    buttonText = "Rematch";
    buttonColor = orange[600];
    endButtonIcon = <RefreshIcon />;
  }
  function clickGameButton() {
    if (mode === 0) {
      setMode(1);
      gameStartSoundEffect.play();
    } else if (mode === 1) {
      setMode(2);
      gameEndSoundEffect.play();
    } else {
      setMode(1);
      gameStartSoundEffect.play();
    }
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <Stack direction="row" justifyContent="space-between" margin="0 20px">
        <Button disableRipple disableElevation
          onClick={clickGameButton}
          variant="contained"
          startIcon={startButtonIcon}
          endIcon={endButtonIcon}
          sx={{
            width: 220,
            height: 75,
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: buttonColor,
            textTransform: "none",
            ":hover": {
              backgroundColor: darken(buttonColor, 0.1)
            }
          }}
        >
          {buttonText}
        </Button>
        <ChessBoard mode={mode} />
      </Stack>
      <IconButton>
        <SettingsIcon />
      </IconButton>
    </Box>
  )
}