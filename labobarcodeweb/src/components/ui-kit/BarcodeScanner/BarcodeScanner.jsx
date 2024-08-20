import React from 'react';
import QrScanner from 'react-qr-scanner';

const QrCodeScanner = () => {
    const handleScan = (data) => {
        console.log("Scanning");
        if (data) {
            console.log('Scanned QR code:', data);
            alert(`Scanned QR code: ${data}`);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <h1>QR Code Scanner</h1>
            <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                constraints={{
                    facingMode: 'environment',  // Use rear camera for better scanning on mobile
                    width: { ideal: 1280 },      // Increase width resolution
                    height: { ideal: 720 },      // Increase height resolution
                }}
            />
        </div>
    );
};

export default QrCodeScanner;
