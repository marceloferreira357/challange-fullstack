interface Responsive {
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleOnClick: () => void;
    latitude: string;
    longitude: string;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    CNPJ: string;
    setCNPJ: React.Dispatch<React.SetStateAction<string>>;
    handleOnSave: () => void;
    setSearchMapCenter: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchMapCenter: string | undefined;
    handleOnClickSearchMapCenter: () => Promise<void>;
    SetViewOnClick({ coords }: any): null;
    clinics: {}[];
    center: any;
}

export default Responsive;