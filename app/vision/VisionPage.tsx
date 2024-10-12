'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Search } from 'lucide-react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat, Result } from '@zxing/library';

const VisionPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [detectedCode, setDetectedCode] = useState<string>('');
  const [cameraStatus, setCameraStatus] = useState<string>('Not initialized');
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

  const processCode = (code: string): string => {
    if (code.length <= 2) return '';
    return code.slice(1, -1);
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
              setIsScanning(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Barcode Scanner</h1>
      
      {/* Manual Barcode Input */}
      <form onSubmit={handleManualSubmit} className="w-full max-w-md mb-6">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter barcode manually"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            <Search size={24} />
          </button>
        </div>
      </form>

      {/* Camera Scanner */}
      <div className="w-full max-w-md mb-4">
        <video ref={videoRef} className="w-full h-72 bg-black" />
        <button
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          onClick={() => setIsScanning(!isScanning)}
        >
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
        <p className="mt-2 text-center text-sm">{cameraStatus}</p>
      </div>
      
      {/* Detected Code */}
      {detectedCode && (
        <p className="mt-4 text-xl font-bold text-center">
          The code is: {detectedCode}
        </p>
      )}
    </div>
  );
};

export default VisionPage;

// 'use client'
// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, Search } from 'lucide-react';
// import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat, Result } from '@zxing/library';

// const VisionPage: React.FC = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [manualBarcode, setManualBarcode] = useState('');
//   const [detectedCode, setDetectedCode] = useState<string>('');
//   const [cameraStatus, setCameraStatus] = useState<string>('Not initialized');
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const readerRef = useRef<BrowserMultiFormatReader | null>(null);

//   useEffect(() => {
//     const hints = new Map();
//     const formats = Object.values(BarcodeFormat).filter(f => typeof f === 'number');
//     hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
//     readerRef.current = new BrowserMultiFormatReader(hints);

//     return () => {
//       if (readerRef.current) {
//         readerRef.current.reset();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isScanning) {
//       startScanning();
//     } else {
//       stopScanning();
//     }
//   }, [isScanning]);

//   const startScanning = async () => {
//     if (readerRef.current && videoRef.current) {
//       try {
//         setCameraStatus('Initializing camera...');
//         await readerRef.current.decodeFromConstraints(
//           { video: { facingMode: 'environment' } },
//           videoRef.current,
//           (result: Result | null, error: Error | undefined) => {
//             if (result) {
//               const rawCode = result.getText();
//               console.log('Detected code:', rawCode);
//               // Remove first and last character
//               const processedCode = rawCode.slice(1, -1);
//               setDetectedCode(processedCode);
//               setIsScanning(false);
//               setCameraStatus('Code detected');
//             }
//             if (error && !(error.message && error.message.includes("NotFoundException"))) {
//               console.error('Scanning error:', error);
//             }
//           }
//         );
//         setCameraStatus('Camera active and scanning');
//       } catch (error) {
//         console.error('Error starting the scanner:', error);
//         setCameraStatus('Error initializing camera');
//       }
//     }
//   };

//   const stopScanning = () => {
//     if (readerRef.current) {
//       readerRef.current.reset();
//       setCameraStatus('Camera stopped');
//     }
//   };

//   const handleManualSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (manualBarcode.length > 2) {
//       setDetectedCode(manualBarcode.slice(1, -1));
//       setManualBarcode('');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-6">Barcode Scanner</h1>
      
//       {/* Manual Barcode Input */}
//       <form onSubmit={handleManualSubmit} className="w-full max-w-md mb-6">
//         <div className="flex items-center border-b border-blue-500 py-2">
//           <input
//             className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//             type="text"
//             placeholder="Enter barcode manually"
//             value={manualBarcode}
//             onChange={(e) => setManualBarcode(e.target.value)}
//           />
//           <button
//             className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
//             type="submit"
//           >
//             <Search size={24} />
//           </button>
//         </div>
//       </form>

//       {/* Camera Scanner */}
//       <div className="w-full max-w-md mb-4">
//         <video ref={videoRef} className="w-full h-72 bg-black" />
//         <button
//           className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
//           onClick={() => setIsScanning(!isScanning)}
//         >
//           {isScanning ? 'Stop Scanning' : 'Start Scanning'}
//         </button>
//         <p className="mt-2 text-center text-sm">{cameraStatus}</p>
//       </div>
      
//       {/* Detected Code */}
//       {detectedCode && (
//         <p className="mt-4 text-xl font-bold text-center">
//           The code is: {detectedCode}
//         </p>
//       )}
//     </div>
//   );
// };

// export default VisionPage;