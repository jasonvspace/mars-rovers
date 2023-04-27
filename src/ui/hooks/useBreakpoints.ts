import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function useBreakpoints() {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  return { xs: !sm && !md && !lg && !xl, sm, md, lg, xl };
}
