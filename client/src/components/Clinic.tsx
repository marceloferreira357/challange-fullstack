import { Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

const Clinic: React.FC<Props> = ({ name, address, latitude, longitude }) => {
    return (
        <Card>
            <Box sx={{ m: 2 }}>
                <Stack spacing={0}>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0}
                    >
                        <Typography variant="h5" gutterBottom component="div">
                            {name}
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div">
                            {address}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={0}
                    >
                        <Typography variant="body1" gutterBottom component="div">
                            {latitude}, {longitude}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Card>
    );
}

export default Clinic;