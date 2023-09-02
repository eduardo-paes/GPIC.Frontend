import { Feedback } from "@/presentation/models/feedback";
import { StyledSnackbar } from "@/presentation/styles/styled-components";
import { Alert, AlertColor } from "@mui/material";
import React from "react";

type Props = {
    handleClose: () => void;
    feedback: Feedback;
    open: boolean;
}

const FeedbackMessage: React.FC<Props> = ({ handleClose, feedback, open }) => {
    return (
        <StyledSnackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={2000}
        >
            <Alert
                variant="filled"
                severity={feedback.type || "success"}
            >
                {feedback.message}
            </Alert>
        </StyledSnackbar>
    );
}

export default FeedbackMessage;