import { Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import React from 'react';
import Props from '../interfaces/props';

const SearchInput: React.FC<Props> = ({ search, setSearch, handleOnClick }) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment">Endereço</InputLabel>
            <Input
                id="standard-adornment"
                endAdornment={
                    <InputAdornment position="end">
                        <Button variant="text" onClick={handleOnClick}>
                            Buscar
                        </Button>
                    </InputAdornment>
                }
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(event)}
            />
        </FormControl>
    );
}

export default SearchInput;