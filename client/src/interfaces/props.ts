interface Props {
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleOnClick: () => void;
    latitude?: string;
    longitude?: string;
    name?: string;
    setName?: React.Dispatch<React.SetStateAction<string | undefined>>;
    CNPJ?: string;
    setCNPJ?: React.Dispatch<React.SetStateAction<string | undefined>>;
    onSave?: () => void;
}

export default Props;