import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { colors } from "./colors";

export const theme = createTheme(
	{
		palette: {
			primary: {
				main: colors.primary[100],
			},
			text: {
				primary: colors.black[80],
			},
		},
	},
	ptBR
);
