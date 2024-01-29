import { FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material";

export default function Settings() {
  return (
    <Stack width={250} height={300} alignItems="center" bgcolor="gray">
      <Typography fontSize={25} fontWeight="bold">
        Settings
      </Typography>
      <FormGroup sx={{alignSelf: "start"}}>
        <FormControlLabel control={<Switch />} label="Flip board" labelPlacement="start" />
        <FormControlLabel control={<Switch defaultChecked />} label="Show legal moves" labelPlacement="start" />
        <FormControlLabel control={<Switch defaultChecked />} label="Enable sounds" labelPlacement="start" />
      </FormGroup>
    </Stack>
  )
}