import { Button, Card, CardHeader, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputMask from "react-input-mask";

const Form = styled('form')({
    display: "flex",
    flexDirection: "column",
    margin: '2rem'
})

const CardTitle = styled(CardHeader)({
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontSize: '2rem',
    marginTop: "1rem"
})

const StyledButton = styled(Button)({
    marginBottom: '1rem',
    borderRadius: "0.5rem",
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)',
    '& > *': {
        borderRadius: "0.5rem"
    }
})

const StyledCard = styled(Card)({
    width: "500px",
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)'
})

const StyledContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
})

const StyledInputMaskField = styled(InputMask)({
    marginBottom: '1rem',
    height: '3rem',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: "0.25rem",
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)',
    '& > *': {
        borderRadius: "0.25rem"
    }
})

const StyledTextField = styled(TextField)({
    marginBottom: '1rem',
    borderRadius: "0.5rem",
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.1)',
    '& > *': {
        borderRadius: "0.5rem"
    }
})

export {
    Form,
    CardTitle,
    StyledButton,
    StyledCard,
    StyledContainer,
    StyledInputMaskField,
    StyledTextField
};

