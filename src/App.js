import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ContentInput from './components/ContentInput';
import Customization from './components/Customization';
import QRCodeDisplay from './components/QRCodeDisplay';
import QRScanner from './components/QRScanner';

// This URL will intelligently switch between your local server and your deployed server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  // State to control which view is active: 'generate' or 'scan'
  const [activeView, setActiveView] = useState('generate');

  // State for QR Code Generator
  const [content, setContent] = useState('https://example.com');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(512); // Optimized default size
  const [icon, setIcon] = useState(null); // State for the uploaded icon
  
  // State for API interaction
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Handles the API request to generate a QR code.
   * It now uses FormData to support optional icon file uploads.
   */
  const handleGenerateQRCode = async () => {
    setIsLoading(true);
    setError(null);

    // Use FormData to handle both regular data and file uploads
    const formData = new FormData();
    formData.append('content', content);
    formData.append('qrColor', qrColor);
    formData.append('bgColor', bgColor);
    formData.append('size', Number(size));
    formData.append('errorCorrection', 'H'); // 'H' for high correction, best for logos

    // Append the icon file if one has been selected
    if (icon) {
      formData.append('icon', icon);
    }

    try {
      // Axios automatically sets the correct 'multipart/form-data' header for FormData
      const response = await axios.post(`${API_BASE_URL}/generate`, formData);
      setQrCodeUrl(response.data.qrCodeUrl);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
      setQrCodeUrl(null); // Clear previous QR code on error
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a QR code when the component first loads
  useEffect(() => {
    handleGenerateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header activeView={activeView} setActiveView={setActiveView} />

      {/* Conditionally render the Generator or Scanner view */}
      {activeView === 'generate' ? (
        <main className="container p-4 mx-auto md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left side: Inputs and Customization */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <ContentInput content={content} setContent={setContent} />
              <Customization onIconChange={setIcon} />
            </div>
            
            {/* Right side: QR Code Preview and Actions */}
            <div className="lg:col-span-1">
              <QRCodeDisplay
                qrCodeUrl={qrCodeUrl}
                isLoading={isLoading}
                error={error}
                onGenerate={handleGenerateQRCode}
              />
            </div>
          </div>
        </main>
      ) : (
        <section className="container p-4 mx-auto md:p-8">
          <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl">
            Scan a QR Code
          </h2>
          <QRScanner />
        </section>
      )}
    </div>
  );
}

export default App;