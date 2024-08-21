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

    const initialRender = useRef(true);

    const [hasCameraAccess, setHasCameraAccess] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const checkCameraAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraAccess(true);
        } catch (error) {
            setCameraError("Camera access denied. Please enable camera permissions.");
        }
    };
    const codeReader = new BrowserQRCodeReader();

    console.log("ZXing code reader initialized");

    useEffect(() => {
        if (initialRender.current) {
            // Skip the first render
            initialRender.current = false;
        } else {
            // Run this on subsequent renders
        }
    }, [scanning]);

    const setupDevices = (videoInputDevices) => {
        // Try to find a device with 'back' or 'rear' in its label
        const backCamera = videoInputDevices.find(
            (device) =>
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")
        );

        // Set the back camera as the default if available, otherwise use the first device
        setSelectedDeviceId(backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId);
        // Setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices);
        }
        setScanning(true);
    };
    const decodeContinuously = (selectedDeviceId) => {
        codeReader.decodeFromInputVideoDeviceContinuously(
            selectedDeviceId,
            "video",
            (result, err) => {
                if (result) {
                    // properly decoded QR code
                    console.log("Found QR code!", result);
                    setCode(result.text);
                    setScanning(false);
                }

                if (err) {
                    setCode("");

                    if (err instanceof NotFoundException) {
                        console.log("No QR code found.");
                    }

                    if (err instanceof ChecksumException) {
                        console.log("A code was found, but its read value was not valid.");
                    }

                    if (err instanceof FormatException) {
                        console.log("A code was found, but it was in an invalid format.");
                    }
                }
            }
        );
    };

    useEffect(() => {
        if (selectedDeviceId && scanning) {
            decodeContinuously(selectedDeviceId);
            console.log(`Started decoding from camera with id ${selectedDeviceId}`);
        }
    }, [selectedDeviceId]);

    const openBarcodeScanner = () => {
        if (hasCameraAccess) {
            codeReader
                .getVideoInputDevices()
                .then((videoInputDevices) => {
                    setupDevices(videoInputDevices);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            checkCameraAccess();
        }
    };
    const closeDialog = () => {
        setScanning(false);
    };
    return (
        <>
            <IconButton onClick={openBarcodeScanner}>
                <QrCodeScannerIcon fontSize="large" />
            </IconButton>
            <Dialog
                sx={{ minWidth: "unset", width: "unset" }}
                open={scanning}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent sx={{ width: "fit-content", padding: "10px" }}>
                    <Box>Code:{code}</Box>
                    <Box>
                        <video id="video" width="300" height="200" />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
