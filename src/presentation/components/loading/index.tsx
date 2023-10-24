import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
    isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
    return (
        <Backdrop open={isLoading} sx={{ zIndex: 1400 }}>
            <CircularProgress color="primary" sx={{ width: '4rem !important', height: '4rem !important' }} />
        </Backdrop>
    );
};

export default Loading;