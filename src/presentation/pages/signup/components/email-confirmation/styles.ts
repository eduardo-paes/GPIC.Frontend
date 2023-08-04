import { styled } from "@mui/material/styles";

const TokenInputContainer = styled("div")({
	padding: "1rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	marginBottom: "1.25rem",
});

const TokenInput = styled("div")({
	display: "flex",
	alignItems: "center",
	border: "1px solid #ccc",
	borderRadius: "0.25rem",
	padding: "0.5rem",
});

const InputStyled = styled("input")({
	border: "none",
	backgroundColor: "transparent",
	outline: "none",
	fontSize: "1rem",
	width: "100%",
	padding: "0 0.5rem",

	"&::placeholder": {
		color: "#ccc",
	},

	"&:focus": {
		border: "none",
		outline: "none",
		backgroundColor: "#f1f1f1",
	},
});

export { TokenInputContainer, TokenInput, InputStyled };
