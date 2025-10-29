import React from 'react';
import { BsQrCodeScan } from "react-icons/bs";


const QRCodeDisplay = ({ qrCodeUrl, isLoading, error, onGenerate }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-center w-full max-w-xs h-auto aspect-square mb-6 bg-white p-4 border rounded-lg">
        {isLoading ? (
          <p className="text-slate-500 font-semibold animate-pulse">Generating...</p>
        ) : error ? (
           <p className="px-6 text-center text-red-500 font-medium">{error}</p>
        ) : qrCodeUrl ? (
          <img src={qrCodeUrl} alt="Generated QR Code" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-slate-200 rounded-lg"></div>
        )}
      </div>
      <div className="w-full space-y-3">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-center text-white rounded-lg bg-gradient-to-r from-sky-400 to-purple-500 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* --- MODIFICATION START: Conditional icon for loading state --- */}
          {isLoading ? (
             <BsQrCodeScan />
          ) : (
            <BsQrCodeScan />
          )}
          
          {isLoading ? 'Generating...' : 'Generate'}
          {/* --- MODIFICATION END --- */}
        </button>

        <a
          href={qrCodeUrl}
          download="qr-code.png"
          className={`flex items-center justify-center gap-2 w-full py-3 font-semibold text-center rounded-lg transition ${
            !qrCodeUrl || isLoading || error
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-slate-700 hover:bg-slate-800 text-white'
          }`}
        >
          {/* --- MODIFICATION START: Download icon added --- */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          Download
          {/* --- MODIFICATION END --- */}
        </a>
      </div>
    </div>
  );
};

export default QRCodeDisplay;