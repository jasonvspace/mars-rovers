import { useMemo } from "react";
import useBreakpoints from "./useBreakpoints";

export default function useColumnSize() {
  const { sm, md, lg, xl } = useBreakpoints();
  return useMemo(() => {
    if (xl) return 5;
    else if (lg) return 4;
    else if (md) return 3;
    else if (sm) return 2;
    else return 1;
  }, [sm, md, lg, xl]);
}
