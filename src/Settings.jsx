import { FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material";

export default function Settings() {
  return (
    <Stack width={220} height={250} bgcolor="gray">
      <Typography>
        Settings
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Switch />} label="Flip board" labelPlacement="start" />
        <FormControlLabel control={<Switch defaultChecked />} label="Show legal moves" labelPlacement="start" />
      </FormGroup>
    </Stack>
  )
}