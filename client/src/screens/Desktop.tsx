import { Box, Card, Stack } from '@mui/material';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Clinic, HudContainer, InsertCard, SearchInput } from '../components';
import Responsive from '../interfaces/responsive';

const Desktop: React.FC<Responsive> = ({
    search,
    setSearch,
    handleOnClick,
    latitude,
    longitude,
    name,
    setName,
    CNPJ,
    setCNPJ,
    handleOnSave,
    setSearchMapCenter,
    searchMapCenter,
    handleOnClickSearchMapCenter,
    SetViewOnClick,
    clinics,
    center
}) => {
    return (
        <>
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
            <MapContainer center={center} zoom={11} scrollWheelZoom={true} zoomControl={false}>
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
                <Marker position={center}>
                    <Popup>
                        <strong>Busca</strong><br />{searchMapCenter}
                    </Popup>
                </Marker>
                <SetViewOnClick coords={center} />
            </MapContainer>
        </>
    );
}

export default Desktop;