import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { getSxProps } from "../utils/helpers";

export const StyledButton = styled(Button)({
  backgroundColor: "red",
});

export const Root = styled(Box)(({ theme, sx }: { theme?: any; sx?: any }) => ({
  backgroundColor: "blue",
  ...getSxProps(theme, sx),
}));
