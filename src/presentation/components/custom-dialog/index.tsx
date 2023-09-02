import React, { ReactNode } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    content: ReactNode;
    actions: ReactNode;
}

const CustomDialog: React.FC<Props> = ({ open, onClose, title, content, actions }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {content && <DialogContent>{content}</DialogContent>}
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};

export default CustomDialog;
