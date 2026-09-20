'use client';

import React, { useState, useEffect, useRef } from 'react';


export default function BatchImageConverter() {
  const [rawFiles, setRawFiles] = useState([]);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [format, setFormat] = useState('image/webp');
  const [quality, setQuality] = useState(80);
  const [scale, setScale] = useState(100); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const convertSingleFile = (file, targetFormat, targetQuality, targetScale) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        const newWidth = Math.max(1, Math.floor(img.width * (targetScale / 100)));
        const newHeight = Math.max(1, Math.floor(img.height * (targetScale / 100)));
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                originalName: file.name,
                originalSize: file.size,
                convertedUrl: URL.createObjectURL(blob),
                convertedSize: blob.size,
                downloadName: file.name.split('.')[0] + '.' + targetFormat.split('/')[1],
                dimensions: `${newWidth} x ${newHeight} px` 
              });
            }
          },
          targetFormat,
          targetQuality / 100
        );
      };
    });
  };

  useEffect(() => {
    if (rawFiles.length === 0) {
      return;
    }

    const processBatch = async () => {
      setIsProcessing(true);
      
      const results = await Promise.all(
        rawFiles.map((file) => convertSingleFile(file, format, quality, scale))
      );
      
      setProcessedFiles(results);
      setIsProcessing(false);
    };

    processBatch();
  }, [rawFiles, format, quality, scale]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const handleFilesSelect = (fileList) => {
    const newFiles = Array.from(fileList).filter(file => file.type.startsWith('image/'));
    if (newFiles.length > 0) {
      setRawFiles((prev) => [...prev, ...newFiles]);
    } else {
      alert('Please select valid image files.');
    }
  };

  const clearAll = () => {
    setRawFiles([]);
    setProcessedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadAll = () => {
    processedFiles.forEach((file) => {
      const link = document.createElement('a');
      link.href = file.convertedUrl;
      link.download = file.downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    
    <div className={`min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10 text-gray-800 transition-all duration-300 ${rawFiles.length === 0 ? 'justify-center' : 'justify-start'}`}>
      
      <div className="w-full max-w-6xl bg-white shadow-md border-t-4 border-[#4F73F6] p-6 md:p-8">
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#4F73F6]">
          Image Converter & Compressor
        </h1>

        {/* 1. Drag and Drop Area */}
        <div
          className={`border-2 border-dashed p-6 md:p-10 flex flex-col items-center justify-center transition-colors cursor-pointer bg-gray-50
            ${isDragging ? 'border-[#ECBE13] bg-yellow-50' : 'border-[#4F73F6] hover:bg-blue-50'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFilesSelect(e.target.files)}
          />
          {/* Added text-center and mobile-responsive text size here */}
          <p className="text-base md:text-lg font-medium text-gray-600 mb-4 text-center">
            Drag & Drop multiple images here
          </p>
          <button className="bg-[#4F73F6] text-white px-6 py-2 rounded-none hover:bg-blue-700 transition-colors w-full sm:w-auto">
            Browse Files
          </button>
        </div>

        {/* 2. Controls */}
        {rawFiles.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col lg:flex-row gap-6 bg-gray-100 p-4 border-l-4 border-[#ECBE13] justify-between items-center">
              
              <div className="flex flex-col md:flex-row gap-6 w-full lg:w-3/4">
                {/* Format Control */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="font-bold mb-2">Format:</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="p-2 border border-gray-300 rounded-none focus:outline-none focus:border-[#4F73F6] w-full"
                  >
                    <option value="image/webp">WebP</option>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                  </select>
                </div>

                {/* Resize Control */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="font-bold mb-2 flex justify-between">
                    <span>Resize:</span>
                    <span className="text-[#4F73F6]">{scale}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-none appearance-none cursor-pointer accent-[#ECBE13]"
                  />
                </div>

                {/* Quality Control */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="font-bold mb-2 flex justify-between">
                    <span>Quality:</span>
                    <span className="text-[#4F73F6]">{quality}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-none appearance-none cursor-pointer accent-[#ECBE13]"
                    disabled={format === 'image/png'} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0 justify-end">
                <button 
                  onClick={clearAll}
                  className="bg-red-500 text-white font-bold px-4 py-2 rounded-none hover:bg-red-600 transition-colors shrink-0 w-full sm:w-auto"
                >
                  Clear All
                </button>
                <button 
                  onClick={downloadAll}
                  className="bg-[#ECBE13] text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-500 transition-colors shrink-0 w-full sm:w-auto"
                >
                  Download All
                </button>
              </div>

            </div>

            {/* 3. Image Grid and Loading Spinner */}
            {isProcessing ? (
              <div className="mt-12 flex flex-col items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-[#4F73F6] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg font-bold text-gray-600">Processing your images...</p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedFiles.map((file, index) => {
                  const isSmaller = file.convertedSize < file.originalSize;
                  const percentChange = Math.abs(100 - (file.convertedSize / file.originalSize) * 100).toFixed(1);

                  return (
                    <div key={index} className="border border-gray-200 bg-white p-4 shadow-sm flex flex-col">
                      <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 mb-4">
                        <img src={file.convertedUrl} alt="converted" className="object-contain w-full h-full" />
                      </div>
                      
                      <p className="font-bold truncate" title={file.downloadName}>
                        {file.downloadName}
                      </p>
                      
                      <p className="text-xs text-[#4F73F6] mb-2 font-medium">
                        {file.dimensions}
                      </p>
                      
                      <div className="mt-2 text-sm text-gray-600 flex justify-between">
                        <span>Old: {formatBytes(file.originalSize)}</span>
                      </div>
                      
                      <div className={`text-sm font-bold mt-1 ${isSmaller ? 'text-green-600' : 'text-red-600'}`}>
                        New: {formatBytes(file.convertedSize)} 
                        <span> ({isSmaller ? '-' : '+'}{percentChange}%)</span>
                      </div>

                      <a
                        href={file.convertedUrl}
                        download={file.downloadName}
                        className="mt-4 bg-[#4F73F6] text-white text-center font-bold px-4 py-2 rounded-none hover:bg-blue-700 transition-colors w-full"
                      >
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}