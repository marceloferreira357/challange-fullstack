import Dialog from '@mui/material/Dialog';
import React from 'react';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ open, setOpen, children }) => {
    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {children}
        </Dialog>
    );
}


export default Modal;