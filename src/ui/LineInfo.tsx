import { Stack, Typography } from "@mui/material";

export default function LineInfo(props: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography sx={{ fontSize: "16px" }}>{props.label}</Typography>
      <Typography sx={{ fontSize: "16px" }}>{props.value}</Typography>
    </Stack>
  );
}
