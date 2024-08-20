import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";

const BarcodeScannerComponent = () => {
    const [scanning, setScanning] = useState(false);
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
    useEffect(() => {
        // Check for camera access permission
        checkCameraAccess();
    }, []);
    const handleScan = (data) => {
        alert(data);
        console.log("Barcode data:", data);
        setScanning(false); // Stop scanning after a successful read
    };

    const handleError = (err) => {
        alert(err);
        console.error("Barcode error:", err);
        setScanning(false); // Stop scanning on error
    };
    const openBarcodeScanner = () => {
        if (hasCameraAccess) {
            setScanning(true);
        } else {
            checkCameraAccess();
        }
    };
    return (
        <>
            <IconButton onClick={openBarcodeScanner}>
                <QrCodeScannerIcon fontSize="large" />
            </IconButton>
            {scanning && (
                <BarcodeReader
                    onScan={handleScan}
                    onError={handleError}
                    onKeyPress={() => {}} // Optional: to avoid default keypress behavior
                />
            )}
        </>
    );
};

export default BarcodeScannerComponent;
