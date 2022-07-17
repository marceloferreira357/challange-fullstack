import { Box, Card, CssBaseline, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { toast, ToastContainer } from 'react-toastify';
import { Clinic, HudContainer, InsertCard, SearchInput } from './components';
import { findGeoLocation, insert, selectAll } from './services';

const App: React.FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [result, setResult] = useState<{} | undefined>(undefined);
    const [latitude, setLatitude] = useState<string>("LAT");
    const [longitude, setLongitude] = useState<string>("LONG");
    const [name, setName] = useState<string | undefined>("");
    const [CNPJ, setCNPJ] = useState<string | undefined>("");
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
            <HudContainer sx={{
                width: "25%",
                mt: 2,
                ml: 2,
                top: 0,
                left: 0
            }}>
                <InsertCard
                    search={search}
                    setSearch={setSearch}
                    handleOnClick={handleOnClick}
                    latitude={latitude}
                    longitude={longitude}
                    name={name}
                    setName={setName}
                    CNPJ={CNPJ}
                    setCNPJ={setCNPJ}
                    onSave={handleOnSave}
                />
            </HudContainer>
            <HudContainer sx={{
                width: "70%",
                mr: 2,
                mt: 2,
                top: 0,
                right: 0
            }}>
                <Card sx={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                }}>
                    <Box sx={{ mx: 2, mb: 2, mt: 0.5 }}>
                        <SearchInput
                            search={searchMapCenter}
                            setSearch={setSearchMapCenter}
                            handleOnClick={handleOnClickSearchMapCenter}
                        />
                    </Box>
                </Card>
            </HudContainer>
            <HudContainer sx={{
                maxWidth: "98%",
                ml: 2,
                mb: 2,
                bottom: 0
            }}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    {clinics.map((result: any) => (
                        <Clinic
                            key={result.id}
                            name={result.name}
                            address={result.line1}
                            latitude={Number(Number(result.latitude).toFixed(3))}
                            longitude={Number(Number(result.longitude).toFixed(3))}
                        />
                    ))}
                </Stack>
            </HudContainer>
            <MapContainer center={center} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {clinics.map((clinic: any) => (
                    <Marker key={clinic.id} position={[Number(clinic.latitude), Number(clinic.longitude)]}>
                        <Popup>
                            <strong>{clinic.name}</strong><br />{clinic.line1}, {clinic.number}, {clinic.district}, {clinic.state}, {clinic.city}, {clinic.country}
                        </Popup>
                    </Marker>
                ))}
                <SetViewOnClick coords={center} />
            </MapContainer>

        </ThemeProvider>
    );
}

export default App;
