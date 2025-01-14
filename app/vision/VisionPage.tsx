'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat, Result } from '@zxing/library';

interface ProductInfo {
  name: string;
  imageUrl: string;
  carbonFootprint: string;
  recycleInfo: string;
}

const VisionPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [detectedCode, setDetectedCode] = useState<string>('');
  const [cameraStatus, setCameraStatus] = useState<string>('Not initialized');
  const [productInfo, setProductInfo] = useState<ProductInfo>({ name: '', imageUrl: '', carbonFootprint: '', recycleInfo: '' });
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const hints = new Map();
    const formats = Object.values(BarcodeFormat).filter(f => typeof f === 'number');
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    readerRef.current = new BrowserMultiFormatReader(hints);

    return () => {
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, []);

  useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }
  }, [isScanning]);

  useEffect(() => {
    if (detectedCode) {
      fetchProductInfo(detectedCode);
    }
  }, [detectedCode]);

  const processCode = (code: string): string => {
    if (code.length <= 2) return '';
    return code;
  };

  const fetchProductInfo = async (code: string) => {
    try {
      setError('');
      const response = await fetch('/api/itemScrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ProductInfo = await response.json();
      console.log('API response:', data);
      
      if (data.name || data.imageUrl || data.carbonFootprint || data.recycleInfo) {
        setProductInfo(data);
      } else {
        setError('No product information found');
      }
    } catch (error) {
      console.error('Error fetching product info:', error);
      setError('Failed to fetch product information');
    }
  };

  const startScanning = async () => {
    if (readerRef.current && videoRef.current) {
      try {
        setCameraStatus('Initializing camera...');
        await readerRef.current.decodeFromConstraints(
          { video: { facingMode: 'environment' } },
          videoRef.current,
          (result: Result | null, error: Error | undefined) => {
            if (result) {
              const rawCode = result.getText();
              const processedCode = processCode(rawCode);
              setDetectedCode(processedCode);
              setCameraStatus('Code detected');
            }
            if (error && !(error.message && error.message.includes("NotFoundException"))) {
              console.error('Scanning error:', error);
            }
          }
        );
        setCameraStatus('Camera active and scanning');
      } catch (error) {
        console.error('Error starting the scanner:', error);
        setCameraStatus('Error initializing camera');
      }
    }
  };

  const stopScanning = () => {
    if (readerRef.current) {
      readerRef.current.reset();
      setCameraStatus('Camera stopped');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedCode = processCode(manualBarcode);
    setDetectedCode(processedCode);
    setManualBarcode('');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-bg-green-200 to-bg-green-200 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Barcode Scanner</h1>
      
      {/* Manual Barcode Input */}
      <form onSubmit={handleManualSubmit} className="w-full max-w-md mb-6">
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-green-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-green-500"
            type="text"
            placeholder="Enter barcode manually"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            <Search size={24} />
          </button>
        </div>
      </form>

      {/* Camera Scanner */}
      <div className="w-full max-w-md mb-4">
        <video ref={videoRef} className="w-full h-72 bg-black rounded-lg shadow-inner" />
        <button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          onClick={() => setIsScanning(!isScanning)}
        >
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
        <p className="mt-2 text-center text-sm text-green-700">{cameraStatus}</p>
      </div>
      
      {/* Detected Code */}
      {detectedCode && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
          <p className="text-xl font-bold text-center text-green-600">
            The code is: <span className="text-green-800">{detectedCode}</span>
          </p>
        </div>
      )}

      {/* Product Info Display */}
      {productInfo.name && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
          <p className="text-xl font-bold text-center text-green-600">{productInfo.name}</p>
          {productInfo.imageUrl && <img src={productInfo.imageUrl} alt={productInfo.name} className="w-full h-auto rounded-lg mb-4" />}
          {productInfo.carbonFootprint && (
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-lg font-semibold text-green-800">Carbon Footprint:</p>
              <p className="text-green-700">{productInfo.carbonFootprint}</p>
            </div>
          )}
          {productInfo.recycleInfo && (
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">Recycling Information:</p>
              <p className="text-blue-700">{productInfo.recycleInfo}</p>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full max-w-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default VisionPage;