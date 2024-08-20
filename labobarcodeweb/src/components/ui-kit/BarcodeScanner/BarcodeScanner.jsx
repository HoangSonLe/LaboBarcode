import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { IconButton } from "@mui/material";
import { useState } from "react";
import BarcodeReader from "react-barcode-reader";

const BarcodeScannerComponent = () => {
    const [scanning, setScanning] = useState(false);

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

    return (
        <>
            <IconButton onClick={() => setScanning(true)}>
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
