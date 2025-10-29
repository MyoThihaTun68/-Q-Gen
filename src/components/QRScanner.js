import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { FaCopy } from "react-icons/fa6";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdOutlineAddLink } from "react-icons/md";



const QRScanner = () => {
  const [scannedData, setScannedData] = useState('No QR code found');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!selectedFile) return;

    // The library needs a DOM element to mount its hidden canvas for processing
    const qrCodeScanner = new Html5Qrcode('qr-reader-container');
    
    qrCodeScanner.scanFile(selectedFile, true)
      .then(decodedText => {
        setScannedData(decodedText);
        setError(null);
      })
      .catch(err => {
        setError('QR Code could not be scanned. Please try a clearer image.');
        setScannedData('');
        console.error("QR Scan Error:", err);
      });

  }, [selectedFile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleCopy = () => {
    if (scannedData && !error) {
        navigator.clipboard.writeText(scannedData);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Side: Image Uploader */}
        <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <h2 className="mb-4 text-xl flex items-center font-semibold text-slate-800">
            <span className="mr-2"><BiSolidSelectMultiple />
</span>Select QR Image
          </h2>
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-300 min-h-[250px] bg-slate-50">
            <input
              type="file"
              id="qr-image-file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="qr-image-file" className="text-center cursor-pointer">
              {selectedFile ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="max-w-xs mx-auto mb-2 max-h-40 rounded-md" />
              ) : (
                <div className="mb-2 text-5xl">📷</div>
              )}
              <span className="font-semibold text-purple-600 hover:text-purple-700">
                {selectedFile ? selectedFile.name : 'Click to upload image'}
              </span>
              <p className="text-sm text-slate-500">All image types allowed.</p>
            </label>
          </div>
          <p className="mt-4 text-xs text-center text-slate-400">
            Built with html5-qrcode
          </p>
        </div>

        {/* Right Side: Scanned Data */}
        <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
          <h2 className="mb-4 text-xl font-semibold flex items-center text-slate-800">
            <span className="mr-2"><MdOutlineAddLink />
            </span>Scanned Data
          </h2>
          <textarea
            readOnly
            value={error || scannedData}
            className={`w-full p-3 border rounded-lg h-48 resize-none bg-slate-50 ${error ? 'border-red-400 text-red-700 focus:ring-red-500' : 'border-slate-300 text-slate-800 focus:ring-purple-500'}`}
          ></textarea>
          <button 
            onClick={handleCopy}
            disabled={!scannedData || !!error}
            className="w-full flex items-center justify-center px-6 py-3 mt-4 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            <span className="mr-2">< FaCopy /></span>{isCopied ? 'Copied!' : 'Copy Results'}
          </button>
        </div>
      </div>
       {/* This div is hidden but necessary for the library to mount its canvas */}
       <div id="qr-reader-container" style={{ display: 'none' }}></div>
    </div>
  );
};

export default QRScanner;