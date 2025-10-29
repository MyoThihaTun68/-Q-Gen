import React from 'react';

// SVG Icon for the "Scan" button
const CameraIcon = ({ isActive }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    viewBox="0 0 20 20" 
    fill={isActive ? 'white' : 'currentColor'}
  >
    <path 
      fillRule="evenodd" 
      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 009.121 3H6.879a2 2 0 00-1.414.586L4.293 4.707A1 1 0 013.586 5H4zm12 10H4a1 1 0 110-2h12a1 1 0 110 2zM9 10a2 2 0 114 0 2 2 0 01-4 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

// SVG Icon for the "Generate" button
const QrCodeIcon = ({ isActive }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    viewBox="0 0 20 20" 
    fill={isActive ? 'white' : 'currentColor'}
  >
    <path d="M5 5h3v3H5V5zm5 0h3v3h-3V5zM5 10h3v3H5v-3zm5 0h3v3h-3v-3zm5-5h-1V4h1a1 1 0 011 1v1h-1V5zM4 5a1 1 0 011-1h1v1H4v1H3V5a1 1 0 011-1zm12 5h1v-1h-1v1zm0-4h1V5h-1v1zM4 14h1v-1H4v1zm1-4h1v-1H5v1zm11 3h1v1h-1v-1z" />
    <path d="M6 14v1h1v-1H6zm8 0v1h1v-1h-1z" />
  </svg>
);

const Header = ({ activeView, setActiveView }) => {
  const isGenerateActive = activeView === 'generate';
  const isScanActive = activeView === 'scan';

  return (
    <header className="p-4 sticky top-0 z-10 bg-slate-50/80 backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between p-2 bg-white rounded-full shadow-md">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3 ml-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
          <h1 className="text-xl font-bold text-slate-800">Q-Gen</h1>
        </div>

        {/* Right Side: Toggle Button Group */}
        <div className="flex items-center space-x-2 bg-slate-100 rounded-full p-1">
          {/* Scan Button */}
          <button 
            onClick={() => setActiveView('scan')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-full transition-colors ${
              isScanActive 
                ? 'text-white bg-gradient-to-r from-sky-400 to-purple-500' 
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CameraIcon isActive={isScanActive} />
            Scan
          </button>
          {/* Generate Button */}
          <button 
            onClick={() => setActiveView('generate')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-full transition-colors ${
              isGenerateActive 
                ? 'text-white bg-gradient-to-r from-sky-400 to-purple-500' 
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <QrCodeIcon isActive={isGenerateActive} />
            Generate
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;