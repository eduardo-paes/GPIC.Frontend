import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { colors } from "./colors";

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.secondary_blue[20],
      },
      text: {
        primary: colors.secondary_blue[80],
      },
    },
  },
  ptBR
);
