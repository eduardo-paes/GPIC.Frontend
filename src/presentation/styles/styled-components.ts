import {
	Button,
	Card,
	LinearProgress,
	Select,
	Snackbar,
	Stack,
	TextField,
	linearProgressClasses,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import InputMask from "react-input-mask";
import { colors } from "./colors";

const progressBarAnimation = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%; /* Change to the desired end width */
    }

`;

const Form = styled("form")({
	display: "flex",
	flexDirection: "column",
	margin: "2rem",
});

const InputStack = styled(Stack)({
	width: "100%",
	padding: "0.5rem",
	border: `1px solid ${colors.primary[100]}`,
	color: colors.primary[100],
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
	marginTop: "1rem",
	"& > *": {
		borderRadius: "0.5rem",
	},
	":hover": {
		backgroundColor: colors.primary[10],
	},
});

// Typography

const Title = styled("p")({
	fontSize: "1.75rem",
	fontWeight: "bold",
	color: colors.primary[100],
});

const Subtitle = styled("p")({
	fontSize: "1.2rem",
});

const Paragraph = styled("p")({
	fontSize: "0.9rem",
});

const StyledButton = styled(Button)({
	borderRadius: "0.5rem",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)",
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
	position: "fixed",
	zIndex: 1400,
	left: "50%",
	top: "20%",
	transform: "translate(-50%, -50%)",
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: colors.primary[100],
	},
}));

export {
	Form,
	InputStack,
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
	BorderLinearProgress,
};
