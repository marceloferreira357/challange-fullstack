import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { toast, ToastContainer } from 'react-toastify';
import { Desktop, Mobile } from './screens';
import { findGeoLocation, insert, selectAll } from './services';

const App: React.FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [result, setResult] = useState<{} | undefined>(undefined);
    const [latitude, setLatitude] = useState<string>("LAT");
    const [longitude, setLongitude] = useState<string>("LONG");
    const [name, setName] = useState<string>("");
    const [CNPJ, setCNPJ] = useState<string>("");
    const [clinics, setClinics] = useState<{}[]>([]);
    const [center, setCenter] = useState<any>([-23.5557714, -46.6395571]);
    const [searchMapCenter, setSearchMapCenter] = useState<string | undefined>(undefined);

    function SetViewOnClick({ coords }: any) {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }

    const selectAllClinics = async (): Promise<void> => {
        let clinics_ = await selectAll();
        setClinics(clinics_);
    };

    useEffect(() => {
        selectAllClinics();
    }, []);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: "#292929"
            }
        },
    });

    const handleOnClick = async () => {
        let results: any[] | undefined = await findGeoLocation(search);
        if (results) {
            setLatitude(results[0].latitude);
            setLongitude(results[0].longitude);
            setResult(results[0]);
        } else {
            const notify = () => toast.error("Nao foi possivel localizar todas as informacoes! Melhore sua busca.");
            notify();
        }
    }

    const handleOnClickSearchMapCenter = async () => {
        let results: any[] | undefined = await findGeoLocation(searchMapCenter);
        if (results) {
            setCenter([results[0].latitude, results[0].longitude]);
        } else {
            const notify = () => toast.error("Nao foi possivel localizar todas as informacoes! Melhore sua busca.");
            notify();
        }
    }

    const handleOnSave = async () => {
        let error: string | undefined = await insert(name, CNPJ, result);
        if (error) {
            const notify = () => toast.error("Nao foi possivel localizar todas as informacoes! Melhore sua busca.");
            notify();
        } else {
            const notify = () => toast.success("Clinica inserida!");
            notify();
            setLatitude("LAT");
            setLongitude("LONG");
            setResult(undefined);
            setName("");
            setCNPJ("");
            selectAllClinics();
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ToastContainer />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Desktop
                    search={search}
                    setSearch={setSearch}
                    handleOnClick={handleOnClick}
                    latitude={latitude}
                    longitude={longitude}
                    name={name}
                    setName={setName}
                    CNPJ={CNPJ}
                    setCNPJ={setCNPJ}
                    handleOnSave={handleOnSave}
                    setSearchMapCenter={setSearchMapCenter}
                    searchMapCenter={searchMapCenter}
                    handleOnClickSearchMapCenter={handleOnClickSearchMapCenter}
                    SetViewOnClick={SetViewOnClick}
                    clinics={clinics}
                    center={center}
                />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Mobile
                    search={search}
                    setSearch={setSearch}
                    handleOnClick={handleOnClick}
                    latitude={latitude}
                    longitude={longitude}
                    name={name}
                    setName={setName}
                    CNPJ={CNPJ}
                    setCNPJ={setCNPJ}
                    handleOnSave={handleOnSave}
                    setSearchMapCenter={setSearchMapCenter}
                    searchMapCenter={searchMapCenter}
                    handleOnClickSearchMapCenter={handleOnClickSearchMapCenter}
                    SetViewOnClick={SetViewOnClick}
                    clinics={clinics}
                    center={center}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;
