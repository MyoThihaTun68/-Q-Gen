import React from 'react';
import { GoPaste } from "react-icons/go";


const ContentInput = ({ content, setContent }) => {

  /**
   * Reads text from the user's clipboard and sets it as the content.
   * Handles potential errors, such as the user denying clipboard permissions.
   */
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContent(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      // You could optionally show an alert to the user here
    }
  };

  return (
    // Updated background to a clean, light card style
    <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
      {/* Tab-like navigation for content type */}
      <div className="flex mb-4 text-sm font-medium text-slate-500">
        <button className="px-4 py-2 text-sky-500 border-b-2 border-sky-500 font-semibold">
          URL
        </button>
        {/* You can add other buttons for 'Text', 'File', etc. here */}
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-slate-600">
            Enter URL
          </label>
          
          {/* --- MODIFICATION START: Icon added to the button --- */}
          <button 
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 rounded-md hover:bg-sky-200 transition-colors"
            title="Paste from clipboard"
          ><GoPaste />
            Paste
          </button>
          {/* --- MODIFICATION END --- */}

        </div>

        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g., https://example.com"
          className="w-full p-3 text-slate-800 border rounded-lg bg-slate-50 border-slate-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
          rows="4"
        ></textarea>
      </div>
    </div>
  );
};

export default ContentInput;