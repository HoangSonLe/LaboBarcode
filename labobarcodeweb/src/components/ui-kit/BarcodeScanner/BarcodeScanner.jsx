import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const ZxingScanner = () => {
    const videoRef = useRef(null);
    const [result, setResult] = useState('');

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
            if (result) {
                setResult(result.text);
                alert(`Scanned QR code: ${result.text}`);
            }
            if (err) {
                console.error(err);
            }
        });

        return () => {
            codeReader.reset();
        };
    }, []);

    return (
        <div>
            <h1>ZXing QR Code Scanner</h1>
            <video ref={videoRef} style={{ width: '100%' }} />
            <p>Scanned result: {result}</p>
        </div>
    );
};

export default ZxingScanner;
