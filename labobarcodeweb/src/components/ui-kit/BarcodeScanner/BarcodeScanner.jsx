import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException
} from '@zxing/library';

const QRCodeScanner = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [code, setCode] = useState('');
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const videoRef = useRef(null);

  const codeReader = new BrowserQRCodeReader();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await codeReader.getVideoInputDevices();
        setVideoInputDevices(devices);
        if (devices.length > 0) {
          setSelectedDeviceId(devices[0].deviceId);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();

    return () => {
      codeReader.reset();
    };
  }, [codeReader]);

  useEffect(() => {
    if (!selectedDeviceId || !videoRef.current) return;

    const decodeContinuously = async () => {
      try {
        await codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) {
            setCode(result.text);
            console.log('Found QR code!', result);
          }

          if (err) {
            setCode('');
            if (err instanceof NotFoundException) {
              console.log('No QR code found.');
            } else if (err instanceof ChecksumException) {
              console.log('A code was found, but its value was not valid.');
            } else if (err instanceof FormatException) {
              console.log('A code was found, but it was in an invalid format.');
            }
          }
        });
      } catch (error) {
        console.error('Error starting continuous decoding:', error);
      }
    };

    decodeContinuously();

    return () => {
      codeReader.reset();
    };
  }, [selectedDeviceId, codeReader]);

  const resetClick = () => {
    codeReader.reset();
    setCode('');
    console.log('Reset.');
  };

  return (
    <main className="wrapper">
      <section className="container" id="demo-content">
        <div id="sourceSelectPanel">
          <label htmlFor="sourceSelect">Change video source:</label>
          <select
            id="sourceSelect"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
          >
            {videoInputDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Device ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <video ref={videoRef} width="300" height="200" />
        </div>

        <label>Result:</label>
        <pre>
          <code>{code}</code>
        </pre>

        <button onClick={resetClick}>Reset</button>
      </section>
    </main>
  );
};

export default QRCodeScanner;
