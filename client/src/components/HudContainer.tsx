import { Box, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import React from "react";

interface Props {
    sx: SxProps<Theme>,
    children: React.ReactNode;
};

const HudContainer: React.FC<Props> = ({ sx, children }) => {
    return (
        <Box sx={{
            zIndex: 1,
            position: "absolute",
            ...sx
        }}>
            {children}
        </Box>
    );
}

export default HudContainer;