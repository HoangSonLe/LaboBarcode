import { useEffect, useRef, useState } from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import {
    BrowserQRCodeReader,
    ChecksumException,
    FormatException,
    NotFoundException,
} from "@zxing/library";

export default function BarcodeScanner({ hanldeScanQRSuccess }) {
    const [scanning, setScanning] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);
    const [hasCameraAccess, setHasCameraAccess] = useState(false);
    const [cameraError, setCameraError] = useState(null);

    const videoRef = useRef(null);
    const codeReaderRef = useRef(null); // Use ref for codeReader instance

    // Check camera access
    const checkCameraAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraAccess(true);
        } catch (error) {
            setCameraError("Camera access denied. Please enable camera permissions.");
            setHasCameraAccess(false);
        }
    };

    // Initialize camera access on dialog open
    useEffect(() => {
        if (scanning) {
            checkCameraAccess();
        } else {
            // Stop camera immediately when scanning is set to false
            if (codeReaderRef.current) {
                codeReaderRef.current.reset();
                console.log("Camera stopped.");
            }
        }
    }, [scanning]);

    // Handle starting the camera when scanning state changes
    useEffect(() => {
        if (scanning && hasCameraAccess) {
            // Initialize the QR code reader
            codeReaderRef.current = new BrowserQRCodeReader();

            codeReaderRef.current
                .getVideoInputDevices()
                .then((devices) => {
                    setupDevices(devices);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        return () => {
            if (codeReaderRef.current) {
                codeReaderRef.current.reset(); // Stop the camera when scanning stops
            }
        };
    }, [scanning, hasCameraAccess]);

    // Setup the available devices
    const setupDevices = (devices) => {
        const backCamera = devices.find(
            (device) =>
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")
        );

        setSelectedDeviceId(backCamera ? backCamera.deviceId : devices[0].deviceId);
        setVideoInputDevices(devices);

        if (backCamera || devices.length > 0) {
            decodeContinuously(backCamera ? backCamera.deviceId : devices[0].deviceId);
        }
    };

    // Start decoding QR code continuously
    const decodeContinuously = (deviceId) => {
        if (codeReaderRef.current) {
            codeReaderRef.current.decodeFromInputVideoDeviceContinuously(
                deviceId,
                videoRef.current,
                (result, err) => {
                    if (result) {
                        setCode(result.text);
                        typeof hanldeScanQRSuccess == "function" &&
                            hanldeScanQRSuccess(result.text);
                        setScanning(false); // Stop scanning after a successful decode
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
    };

    // Handle opening the barcode scanner dialog
    const openBarcodeScanner = () => {
        setScanning(true);
    };

    // Handle closing the barcode scanner dialog
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
