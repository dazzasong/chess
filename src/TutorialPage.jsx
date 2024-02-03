import { Card, CardContent, Stack, Typography } from "@mui/material"
import background from "./assets/images/backgrounds/tutorialpage_background.jpg"

function TutorialCard({ title, text1, text2, text3 }) {
  return (
    <Card sx={{width: 300}}>
      <CardContent>
        <Typography fontSize={24} fontWeight="bold" mb={1}>
          {title}
        </Typography>
        <Typography mb={1}>
          {text1}
        </Typography>
        <Typography mb={1}>
          {text2}
        </Typography>
        <Typography>
          {text3}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function TutorialPage() {
  return (
    <Stack direction="row" justifyContent="space-evenly" gap={8} flexWrap="wrap" p={8}
      sx={{
        backgroundImage: `url(${background})`
      }}
    >
      <TutorialCard
        title="How to move"
        text1="Use your mouse to drag the pieces to the square you want to move to."
        text2="You can also select a piece by clicking on it and clicking on the square you want to go to."
      />
      <TutorialCard
        title="Moving pieces"
        text1="Pawns move forward one square, and attack diagonally one square. However, they can move forward 2 squares ONLY at the start."
        text2="Knights move/attack in an L-shaped move, and can pass through other pieces. Bishops move/attack diagonally. Rooks move/attack in a straight line."
        text3="The queen moves/attacks in straight lines and diagonally. The king moves/attacks by one square around him."
      />
      <TutorialCard
        title="Checkmate"
        text1="To win, you need to checkmate the enemy by putting their king in check and unable to move anywhere."
        text2="A stalemate can occur if the king is unable to move but is NOT in check."
        text3="You can forfeit the match at anytime if you think you cannot win or want to stop."
      />
      <TutorialCard
        title="Rules"
        text1="White always moves first."
        text2="The king cannot move to any square that is in check."
        text3="If a pawn reaches the other side of the board, it can be promoted to any higher piece."
      />
      <TutorialCard
        title="Special moves"
        text1='A king and a rook can perform a move known as "castling." The king moves two squares toward a rook on the same row with the rook moving to the square the king passed over. This can only be done if the king and rook have not been moved.'
        text2='Pawns can perform a move called "En Passant." If an enemy pawn moves 2 squares forward and passes a square that a pawn is diagonal to, the pawn can capture the enemy pawn as if it had only moved one square.'
      />
      <TutorialCard
        title="Other info"
        text1="Each piece is worth a number of points."
        text2="Pawns: 1 point | Knight: 3 points | Bishop: 3 points | Rook: 5 points | Queen: 9 points"
      />
    </Stack>
  )
}