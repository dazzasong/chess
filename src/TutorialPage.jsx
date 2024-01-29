import { Card, CardContent, Stack, Typography } from "@mui/material"

function TutorialCard({ title, text }) {
  return (
    <Card sx={{width: 240, height: 300}}>
      <CardContent>
        <Typography fontSize={24} fontWeight="bold">
          {title}
        </Typography>
        <Typography>
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function TutorialPage() {
  return (
    <Stack direction="row" justifyContent="space-around">
      <TutorialCard title="How to move?" text="Use your mouse to drag the pieces to the square you want to move to." />
      <TutorialCard title="Info on pieces..." text="Pawns" />
    </Stack>
  )
}