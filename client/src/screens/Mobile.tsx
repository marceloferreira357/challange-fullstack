import { Create, LocalHospital, Menu } from "@mui/icons-material";
import { Box, Card, Grid, SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Clinic, HudContainer, InsertCard, Modal, SearchInput } from "../components";
import Responsive from "../interfaces/responsive";

const Mobile: React.FC<Responsive> = ({
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
    const [showInsertModal, setShowInsertModal] = useState<boolean>(false);
    const [showListModal, setShowListModal] = useState<boolean>(false);

    return (
        <>
            <HudContainer sx={{
                width: "92%",
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
                mb: 2,
                right: 0,
                bottom: 0
            }}>
                <SpeedDial
                    ariaLabel="SpeedDial"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<Menu />}
                >
                    <SpeedDialAction
                        icon={<Create />}
                        tooltipTitle={"Cadastro"}
                        tooltipOpen
                        onClick={() => setShowInsertModal(true)}
                    />
                    <SpeedDialAction
                        icon={<LocalHospital />}
                        tooltipTitle={"Clínicas"}
                        tooltipOpen
                        onClick={() => setShowListModal(true)}
                    />
                </SpeedDial>
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
            <Modal open={showInsertModal} setOpen={setShowInsertModal}>
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
            </Modal>
            <Modal open={showListModal} setOpen={setShowListModal}>
                <Card sx={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                }}>
                    <Box sx={{ maxHeight: 500, overflow: "auto" }}>
                        <Grid container spacing={2}>
                            {clinics.map((result: any) => (
                                <Grid key={result.id} item xs={12}>
                                    <Clinic
                                        name={result.name}
                                        address={result.line1}
                                        latitude={Number(Number(result.latitude).toFixed(3))}
                                        longitude={Number(Number(result.longitude).toFixed(3))}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Card>
            </Modal>
        </>
    );
}

export default Mobile;