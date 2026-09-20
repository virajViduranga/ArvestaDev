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
    
    <div className={`min-h-screen bg-[var(--color-background)] flex flex-col items-center px-4 py-10 text-[var(--color-text-primary)] transition-all duration-300 ${rawFiles.length === 0 ? 'justify-center' : 'justify-start'}`}>
      
  <div className="w-full max-w-6xl bg-[var(--color-surface)] shadow-md border-t-4 border-[var(--color-primary)] p-6 md:p-8">
    
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
      Image Converter & Compressor
    </h1>

    {/* 1. Drag and Drop Area */}
    <div
      className={`border-2 border-dashed p-6 md:p-10 flex flex-col items-center justify-center transition-colors cursor-pointer
        ${isDragging ? 'border-[var(--color-warning)] bg-[var(--color-warning-bg)]' : 'border-[var(--color-primary)] bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)]'}
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
      <p className="text-base md:text-lg font-medium text-[var(--color-text-secondary)] mb-4 text-center">
        Drag & Drop multiple images here
      </p>
      <button className="bg-[var(--color-primary)] text-[var(--color-text-on-primary)] px-6 py-2 rounded-none hover:bg-[var(--color-primary-hover)] transition-colors w-full sm:w-auto cursor-pointer">
        Browse Files
      </button>
    </div>

    {/* 2. Controls */}
    {rawFiles.length > 0 && (
      <div className="mt-8">
        <div className="flex flex-col lg:flex-row gap-6 bg-[var(--color-secondary)] p-4 border-l-4 border-[var(--color-warning)] justify-between items-center">
          
          <div className="flex flex-col md:flex-row gap-6 w-full lg:w-3/4">
            {/* Format Control */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="font-bold mb-2 text-[var(--color-text-primary)]">Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-none focus:outline-none focus:border-[var(--color-primary)] w-full"
              >
                <option value="image/webp">WebP</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            {/* Resize Control */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="font-bold mb-2 flex justify-between text-[var(--color-text-primary)]">
                <span>Resize:</span>
                <span className="text-[var(--color-primary)]">{scale}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full h-2 bg-[var(--color-border)] rounded-none appearance-none cursor-pointer accent-[var(--color-warning)]"
              />
            </div>

            {/* Quality Control */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="font-bold mb-2 flex justify-between text-[var(--color-text-primary)]">
                <span>Quality:</span>
                <span className="text-[var(--color-primary)]">{quality}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full h-2 bg-[var(--color-border)] rounded-none appearance-none cursor-pointer accent-[var(--color-warning)]"
                disabled={format === 'image/png'} 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0 justify-end">
            <button 
              onClick={clearAll}
              className="bg-gray-400 text-white font-bold px-4 py-2 rounded-none hover:opacity-90 transition-opacity shrink-0 w-full sm:w-auto cursor-pointer"
            >
              Clear All
            </button>
            <button 
              onClick={downloadAll}
              className="bg-green-600 text-white font-bold px-4 py-2 rounded-none hover:opacity-90 transition-opacity shrink-0 w-full sm:w-auto cursor-pointer"
            >
              Download All
            </button>
          </div>

        </div>

        {/* 3. Image Grid and Loading Spinner */}
        {isProcessing ? (
          <div className="mt-12 flex flex-col items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-[var(--color-primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-bold text-[var(--color-text-secondary)]">Processing your images...</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedFiles.map((file, index) => {
              const isSmaller = file.convertedSize < file.originalSize;
              const percentChange = Math.abs(100 - (file.convertedSize / file.originalSize) * 100).toFixed(1);

              return (
                <div key={index} className="border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm flex flex-col transition-colors hover:border-[var(--color-border-hover)]">
                  <div className="w-full h-40 bg-[var(--color-background)] flex items-center justify-center overflow-hidden border border-[var(--color-border)] mb-4 p-2">
                    <img src={file.convertedUrl} alt="converted" className="object-contain w-full h-full" />
                  </div>
                  
                  <p className="font-bold truncate text-[var(--color-text-primary)]" title={file.downloadName}>
                    {file.downloadName}
                  </p>
                  
                  <p className="text-xs text-[var(--color-primary)] mb-2 font-medium">
                    {file.dimensions}
                  </p>
                  
                  <div className="mt-2 text-sm text-[var(--color-text-secondary)] flex justify-between">
                    <span>Old: {formatBytes(file.originalSize)}</span>
                  </div>
                  
                  <div className={`text-sm font-bold mt-1 ${isSmaller ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    New: {formatBytes(file.convertedSize)} 
                    <span> ({isSmaller ? '-' : '+'}{percentChange}%)</span>
                  </div>

                  <a
                    href={file.convertedUrl}
                    download={file.downloadName}
                    className="mt-4 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-center font-bold px-4 py-2 rounded-none hover:bg-[var(--color-primary-hover)] transition-colors w-full"
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