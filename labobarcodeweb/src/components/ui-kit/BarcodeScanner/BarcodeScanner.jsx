import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga'; // Import QuaggaJS

const BarcodeScannerComponent = () => {
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    useEffect(() => {
        if (scanning && scannerRef.current) {
            // Start the scanner after the element is rendered and available
            Quagga.init({
                inputStream: {
                    type: 'LiveStream',
                    target: scannerRef.current, // The container element for the camera feed
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: 'environment', // Use the rear camera
                    },
                },
                decoder: {
                    readers: ['code_128_reader', 'ean_reader'], // Add barcode formats you want to scan
                },
            }, (err) => {
                if (err) {
                    console.error('QuaggaJS initialization failed:', err);
                    return;
                }
                Quagga.start(); // Start the camera and scanner
            });

            Quagga.onDetected(handleBarcodeDetected);

            return () => {
                // Stop and clean up when component unmounts or scanning stops
                Quagga.stop();
                Quagga.offDetected(handleBarcodeDetected);
            };
        }
    }, [scanning]);

    const handleBarcodeDetected = (result) => {
        if (result && result.codeResult && result.codeResult.code) {
            alert(`Barcode detected: ${result.codeResult.code}`);
            console.log('Barcode detected:', result.codeResult.code);
            setScanning(false); // Stop scanning after a successful detection
        }
    };

    const startScanner = () => {
        setScanning(true);
    };

    const stopScanner = () => {
        setScanning(false);
    };

    return (
        <>
            <button onClick={startScanner}>Start Scanning</button>
            {scanning && (
                <div
                    ref={scannerRef}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {/* Camera feed will be displayed here */}
                </div>
            )}
        </>
    );
};

export default BarcodeScannerComponent;
