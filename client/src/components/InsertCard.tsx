import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import Props from '../interfaces/props';
import SearchInput from './SearchInput';

const InsertCard: React.FC<Props> = ({ search, setSearch, handleOnClick, latitude, longitude, name, setName, CNPJ, setCNPJ, onSave }) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, set: React.Dispatch<React.SetStateAction<string>> | undefined) => {
        if (set) {
            set(event.target.value);
        }
    }

    return (
        <Card>
            <Typography variant="body1" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", mt: 2 }}>
                CADASTRO DE CLÍNICA
            </Typography>
            <Box sx={{ mx: 2 }}>
                <Box sx={{ my: 0.5 }}>
                    <TextField
                        label="Nome da Clínica"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(event, setName)}
                    />
                </Box>
                <Box sx={{ my: 0.5 }}>
                    <TextField
                        label="CNPJ"
                        variant="standard"
                        fullWidth
                        value={CNPJ}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(event, setCNPJ)}
                    />
                </Box>
                <Box sx={{ my: 0.5 }}>
                    <SearchInput search={search} setSearch={setSearch} handleOnClick={handleOnClick} />
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <TextField variant="standard" fullWidth disabled value={latitude} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField variant="standard" fullWidth disabled value={longitude} />
                    </Grid>
                </Grid>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Button variant="text" sx={{ m: 2 }} onClick={onSave}>Cadastrar</Button>
                </Stack>
            </Box>
        </Card>
    );
};

export default InsertCard;