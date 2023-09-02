import { Button, Card, Select, Snackbar, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import InputMask from "react-input-mask";

const Form = styled("form")({
	display: "flex",
	flexDirection: "column",
	margin: "2rem",
});

// Typography

const Title = styled("p")({
	fontSize: "1.75rem",
	marginTop: "1rem",
	fontWeight: "bold",
});

const Subtitle = styled("p")({
	fontSize: "1.2rem",
	marginTop: "1rem",
});

const Paragraph = styled("p")({
	fontSize: "0.9rem",
	marginTop: "1rem",
});

const StyledButton = styled(Button)({
	marginTop: "1rem",
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	"& > *": {
		borderRadius: "0.5rem",
	},
});

const StyledCard = styled(Card)({
	flexDirection: "column",
	maxHeight: "90%",
	maxWidth: "30rem",
	overflowY: "auto",
	width: "75%",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	padding: "1.5rem",
});

const StyledContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
});

const StyledInputMaskField = styled(InputMask)({
	marginBottom: "1rem",
	height: "3rem",
	border: "1px solid rgba(0, 0, 0, 0.3)",
	borderRadius: "0.25rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	"& > *": {
		borderRadius: "0.25rem",
	},
});

const StyledTextField = styled(TextField)({
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	"& > *": {
		borderRadius: "0.5rem",
	},
});

const StyledDateField = styled(DateField)({
	marginTop: "1rem",
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	"& > *": {
		borderRadius: "0.5rem",
	},
});

const StyledSelectField = styled(Select)({
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	"& > *": {
		borderRadius: "0.5rem",
	},
});

const StyledSnackbar = styled(Snackbar)({
	position: "absolute",
	zIndex: 1400,
	left: "50%",
	top: "20%",
	transform: "translate(-50%, -50%)",
});

export {
	Form,
	Paragraph,
	StyledButton,
	StyledCard,
	StyledContainer,
	StyledInputMaskField,
	StyledDateField,
	StyledSelectField,
	StyledSnackbar,
	StyledTextField,
	Subtitle,
	Title,
};
