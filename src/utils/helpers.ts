import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material";

export const getSxProps = (theme: any, sx: SxProps<Theme> | undefined) => {
  const result = typeof sx === "function" ? sx(theme) : sx;
  return result as any;
};
