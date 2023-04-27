import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import empty_date from "./../images/empty_data.png";

export default function EmptyResult() {
  return (
    <Stack alignItems="center" sx={{ height: "100%", mt: 10 }}>
      <img src={empty_date} alt="empty data" width={100} height={100} />
      <Typography color={grey[400]}>There is no result.</Typography>
    </Stack>
  );
}
