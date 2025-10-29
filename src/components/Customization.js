import React, { useState, useEffect } from 'react';

const Customization = ({ onIconChange }) => {
    const [iconFile, setIconFile] = useState(null);
    const [iconPreview, setIconPreview] = useState('');

    useEffect(() => {
        return () => {
            if (iconPreview) URL.revokeObjectURL(iconPreview);
        };
    }, [iconPreview]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (iconPreview) URL.revokeObjectURL(iconPreview);
            setIconFile(file);
            setIconPreview(URL.createObjectURL(file));
            onIconChange(file);
        }
    };

    const handleRemoveIcon = () => {
        setIconFile(null);
        setIconPreview('');
        onIconChange(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <h3 className="mb-2 text-lg font-semibold text-slate-800">QR Code Colors</h3>
            <p className="text-slate-500">
                The QR code uses a black foreground and a white background.
            </p>
            <hr className="my-6 border-slate-200" />
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Add a Logo / Icon</h3>
            {iconPreview ? (
                <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4 min-w-0">
                        {/* --- MODIFIED: Added 'rounded-full' class for circular preview --- */}
                        <img 
                            src={iconPreview} 
                            alt="Icon Preview" 
                            className="w-14 h-14 object-cover rounded-full flex-shrink-0" 
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{iconFile?.name}</p>
                            <p className="text-xs text-slate-500">{Math.round(iconFile?.size / 1024)} KB</p>
                        </div>
                    </div>
                    <button onClick={handleRemoveIcon} className="px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
                        Remove
                    </button>
                </div>
            ) : (
                <label htmlFor="icon-upload" className="flex items-center justify-center w-full p-4 font-semibold text-center text-slate-500 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100">
                    Click to upload an Icon
                    <input type="file" id="icon-upload" accept="image/*" onChange={handleIconChange} className="hidden" />
                </label>
            )}
        </div>
    );
};

export default Customization;