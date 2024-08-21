import { useEffect, useRef, useState } from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import {
    BrowserQRCodeReader,
    ChecksumException,
    FormatException,
    NotFoundException,
} from "@zxing/library";

export default function BarcodeScanner() {
    const [scanning, setScanning] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const [hasCameraAccess, setHasCameraAccess] = useState(false);
    const [cameraError, setCameraError] = useState(null);

    const videoRef = useRef(null);
    const codeReader = new BrowserQRCodeReader();

    const checkCameraAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraAccess(true);
        } catch (error) {
            setCameraError("Camera access denied. Please enable camera permissions.");
            setHasCameraAccess(false);
        }
    };

    useEffect(() => {
        if (scanning) {
            checkCameraAccess();
        }
    }, [scanning]);

    useEffect(() => {
        if (scanning && hasCameraAccess) {
            codeReader
                .getVideoInputDevices()
                .then((devices) => {
                    setupDevices(devices);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [scanning, hasCameraAccess]);

    const setupDevices = (devices) => {
        const backCamera = devices.find(
            (device) =>
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")
        );

        setSelectedDeviceId(backCamera ? backCamera.deviceId : devices[0].deviceId);
        setVideoInputDevices(devices);
    };

    useEffect(() => {
        if (selectedDeviceId && scanning) {
            codeReader.decodeFromInputVideoDeviceContinuously(
                selectedDeviceId,
                videoRef.current,
                (result, err) => {
                    if (result) {
                        setCode(result.text);
                        setScanning(false);
                    }

                    if (err) {
                        setCode("");

                        if (err instanceof NotFoundException) {
                            console.log("No QR code found.");
                        } else if (err instanceof ChecksumException) {
                            console.log("Invalid QR code.");
                        } else if (err instanceof FormatException) {
                            console.log("Invalid QR code format.");
                        }
                    }
                }
            );
        }

        return () => {
            codeReader.reset();
        };
    }, [selectedDeviceId, scanning]);

    const openBarcodeScanner = () => {
        setScanning(true);
    };

    const closeDialog = () => {
        setScanning(false);
        setCode(""); // Clear the code after closing
    };

    return (
        <>
            <IconButton onClick={openBarcodeScanner}>
                <QrCodeScannerIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={scanning}
                onClose={closeDialog}
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                <DialogContent
                    sx={{
                        width: "fit-content",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box>Code: {code}</Box>
                    <Box>
                        <video ref={videoRef} id="video" width="300" height="200" />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
